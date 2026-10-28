import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { me, projects, experience, skills } from './data'

gsap.registerPlugin(ScrollTrigger)

// judul besar: katanya menyala satu per satu saat discroll
const Big = ({ parts }) => (
  <h2 className="big scrub">
    {parts.flatMap((p, i) => [
      ...p.t.split(' ').filter(Boolean).map((w, j) => (
        <span className={'w' + (p.em ? ' em' : '')} key={i + '-' + j}>
          {w}{' '}
        </span>
      )),
      ...(p.breakAfter ? [<br key={'br-' + i} />] : []),
    ])}
  </h2>
)


// nama di hero: tiap huruf dibungkus supaya bisa dianimasikan
const Split = ({ text }) => (
  <span className="ln" aria-hidden="true">
    {text.split('').map((c, i) => <span className="ch" key={i}>{c}</span>)}
  </span>
)

const go = (e) => {
  e.preventDefault()
  const href = e.currentTarget.getAttribute('href')
  if (!href) return

  const l = window.__lenis
  let target = href
  let offset = 0

  if (href === '#atas' || href === '#') {
    target = 0
  } else if (href === '#proyek') {
    const st = ScrollTrigger.getById('proyek-pin')
    if (st) {
      target = st.start
    } else {
      target = '#proyek'
      offset = 90
    }
  }

  if (l) {
    l.scrollTo(target, {
      offset,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      force: true,
    })
  } else {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' })
    } else {
      const el = document.querySelector(target)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  if (window.history && window.history.pushState) {
    window.history.pushState(null, '', href)
  }
}

export default function App() {
  const root = useRef(null)
  const photoRef = useRef(null)
  const [force, setForce] = useState(false)
  const [imgError, setImgError] = useState(false)
  const reduced = false
  const photoSrc = import.meta.env.BASE_URL + 'foto.jpg'
  const turnOn = () => { document.documentElement.classList.add('force'); window.scrollTo(0, 0); setForce(true) }

  const handlePhotoMove = (e) => {
    if (reduced && !force) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = photoRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const rotX = -y * 12
    const rotY = x * 12
    el.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`
  }

  const handlePhotoLeave = () => {
    const el = photoRef.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
  }

  useLayoutEffect(() => {
    let lenis, raf
    const ctx = gsap.context(() => {
      if (reduced && !force) return

      // scroll halus
      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        respectReducedMotion: false,
      })
      lenis.on('scroll', ScrollTrigger.update)
      raf = (t) => lenis.raf(t * 1000)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
      lenis.stop()
      window.__lenis = lenis

      // 1. layar pembuka: hitung 0-100, tirai naik, nama muncul
      const cnt = document.querySelector('.cnt'), o = { v: 0 }
      gsap.timeline()
        .to(o, { v: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: () => { cnt.textContent = Math.round(o.v) } })
        .to('.pre', { yPercent: -100, duration: 0.9, ease: 'power4.inOut' })
        .from('.hero .ch', { yPercent: 115, duration: 1.1, stagger: 0.07, ease: 'power4.out' }, '-=0.35')
        .from('.hello, .hero .btn, .top', { opacity: 0, y: 24, duration: 0.9, stagger: 0.08 }, '-=0.7')
        .add(() => lenis.start())

      // 2. hero: nama terbelah ke kiri dan kanan saat discroll
      gsap.utils.toArray('.hero h1 .ln').forEach((el, i) =>
        gsap.to(el, {
          xPercent: i ? 28 : -28, opacity: 0, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
        }))
      gsap.to('.role', {
        opacity: 0, y: 60, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: '30% top', end: 'bottom top', scrub: true }
      })

      // 3. teks berjalan miring mengikuti kecepatan scroll
      ScrollTrigger.create({
        onUpdate: (s) => {
          const v = gsap.utils.clamp(-12, 12, -s.getVelocity() / 250)
          gsap.fromTo('.marq', { skewX: v }, { skewX: 0, duration: 0.6, ease: 'power3.out', overwrite: true })
        }
      })

      // 4. judul besar menyala kata per kata
      gsap.utils.toArray('.scrub').forEach((h) => {
        const ws = h.querySelectorAll('.w')
        ScrollTrigger.create({
          trigger: h, start: 'top 88%', end: 'bottom 55%', onUpdate: (s) => {
            const n = Math.round(s.progress * ws.length)
            ws.forEach((w, i) => w.classList.toggle('on', i < n))
          }
        })
      })

      // 4b. tentang: foto muncul clip-path & zoom, teks KRISNA parallax, lencana berputar
      gsap.fromTo(
        '.about-photo-reveal',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.about-photo-wrap', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.about-photo-inner',
        { scale: 1.25 },
        {
          scale: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.about-photo-wrap', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.about-photo-frame',
        { opacity: 0, x: 0, y: 0 },
        {
          opacity: 1,
          x: 14,
          y: 14,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.about-photo-wrap', start: 'top 85%' },
        }
      )

      gsap.to('.about-bg-text', {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: '#tentang',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })


      // 5. proyek: layar terkunci, panel bergeser ke samping
      const track = document.querySelector('.hz-track')
      const dist = () => track.scrollWidth - window.innerWidth
      const st = { trigger: '.hz', start: 'top top', end: () => '+=' + dist(), invalidateOnRefresh: true }
      gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          id: 'proyek-pin',
          ...st,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      })
      gsap.to('.hz-bar i', { scaleX: 1, ease: 'none', scrollTrigger: { ...st, scrub: true } })

      // 6. elemen lain muncul dari bawah
      gsap.utils.toArray('.rv').forEach((el) =>
        gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }))

      // 7. garis progres di atas layar
      gsap.to('.bar', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })

      // 8. kursor lingkaran (laptop saja)
      if (window.matchMedia('(pointer: fine)').matches) {
        const cur = document.querySelector('.cur')
        const xTo = gsap.quickTo(cur, 'x', { duration: 0.4, ease: 'power3' })
        const yTo = gsap.quickTo(cur, 'y', { duration: 0.4, ease: 'power3' })
        window.addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); cur.classList.add('on') })
        document.querySelectorAll('a, .btn').forEach((a) => {
          a.addEventListener('pointerenter', () => cur.classList.add('big'))
          a.addEventListener('pointerleave', () => cur.classList.remove('big'))
        })
      }

      document.fonts.ready.then(() => ScrollTrigger.refresh())
    }, root)

    return () => { if (raf) gsap.ticker.remove(raf); if (lenis) lenis.destroy(); window.__lenis = null; ctx.revert() }
  }, [force])

  const words = ['Kepemimpinan', 'Pengembangan', 'Jaringan', 'Fotografi']

  return (
    <div ref={root}>
      <div className="pre" aria-hidden="true"><span className="plogo">K<b>./</b></span><span className="cnt">0</span></div>
      <div className="bg" aria-hidden="true"><i /><i /></div>
      <div className="cur" aria-hidden="true" />
      <div className="bar" aria-hidden="true" />
      {reduced && !force && <button className="anim-btn" onClick={turnOn}>Animasi dimatikan oleh pengaturan perangkat. Nyalakan</button>}

      <div className="top">
        <a className="logo" href="#atas" onClick={go} aria-label="Ke atas">K<b>./</b></a>
        <nav aria-label="Menu">
          <a href="#tentang" onClick={go}>Tentang</a>
          <a href="#proyek" onClick={go}>Proyek</a>
          <a href="#pengalaman" onClick={go}>Pengalaman</a>
          <a href="#kontak" onClick={go}>Kontak</a>
        </nav>
      </div>

      <header className="hero wrap" id="atas">
        <p className="hello">Malang, Indonesia</p>
        <h1 aria-label="Krisna Aditya"><Split text="Krisna" /><Split text="Aditya" /></h1>
        <div className="role">
          <p><strong>Project Leader &amp; Developer</strong>Mahasiswa Sistem Informasi Bisnis, Politeknik Negeri Malang. Memimpin tim proyek dan membangun aplikasi web dan mobile.</p>
          <div className="btns">
            <a className="btn fill" href="#proyek" onClick={go}>Lihat proyek</a>
            <a className="btn" href="#kontak" onClick={go}>Hubungi saya</a>
          </div>
        </div>
      </header>

      <div className="marq" aria-hidden="true">
        <div>{[...words, ...words, ...words, ...words].map((w, i) => <span key={i}>{w}</span>)}</div>
      </div>

      <main>
        <div className="wrap">
          <section id="tentang">
            <p className="sec rv">Tentang</p>
            <Big
              parts={[
                { t: 'Halo... saya Krisna', em: true, breakAfter: true },
                { t: 'Mahasiswa Sistem Informasi Polinema.' },
              ]}
            />
            <div className="about-grid">
              <div className="about-photo-col">
                <div className="about-bg-text" aria-hidden="true">KRISNA</div>
                <div className="about-photo-wrap">
                  <div className="about-photo-frame" aria-hidden="true" />
                  <div
                    className="about-photo-card"
                    ref={photoRef}
                    onPointerMove={handlePhotoMove}
                    onPointerLeave={handlePhotoLeave}
                  >
                    <div className="about-photo-reveal">
                      <div className="about-photo-inner">
                        {!imgError ? (
                          <img
                            src={photoSrc}
                            alt="Foto Krisna Aditya Satria Anugerah"
                            onError={() => setImgError(true)}
                            className="about-photo-img"
                            loading="lazy"
                          />
                        ) : (
                          <div className="about-photo-fallback" aria-label="Foto Krisna Aditya Satria Anugerah">
                            <span>K</span>
                          </div>
                        )}
                        <div className="about-photo-overlay" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  <div className="about-chip about-chip-top" aria-hidden="true">
                    <span>Malang, ID</span>
                  </div>


                </div>
              </div>

              <div className="about-narrative rv">
                <p>
                  Beberapa proyek yang pernah saya kerjakan antara lain{' '}
                  <a href="#proyek" onClick={go} className="about-link">SIFORA</a>
                  , sistem peminjaman fasilitas kampus, di mana saya memimpin tim, membagi tugas, mengatur jadwal, dan memantau progres. Saya juga mengembangkan sisi mobile{' '}
                  <a href="#proyek" onClick={go} className="about-link">Kompenify</a>
                  , aplikasi untuk mengelola kompen mahasiswa, serta ikut menyusun dokumen SKPL dan melakukan pengujian usability menggunakan SUS.
                </p>
                <p>
                  Saya memulai perjalanan di bidang teknologi dari SMK Negeri 1 Blitar jurusan Teknik Komputer dan Jaringan, lalu mendapat pengalaman PKL di Diskominfo Kota Blitar. Di luar teknologi, saya juga bekerja freelance sebagai fotografer dan editor foto sejak 2022.
                </p>
                <p>
                  Kalau Anda sedang mencari mahasiswa magang atau developer junior yang siap belajar, berkontribusi, dan bekerja sama dalam tim, silakan{' '}
                  <a href="#kontak" onClick={go} className="about-link">hubungi saya</a>
                  .
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="hz" id="proyek">
          <div className="hz-track">
            <div className="hz-panel intro">
              <p className="sec">Proyek</p>
              <h2 className="big">Dua proyek yang saya <em>pimpin</em> dan kerjakan.</h2>
              <p className="hint">Scroll untuk melihat →</p>
            </div>
            {projects.map((p) => (
              <article className="hz-panel" key={p.no}>
                <span className="hz-no">{p.no}</span>
                <h3>{p.title}</h3>
                <p className="tag">{p.tag} · {p.year}</p>
                <p className="desc">{p.desc}</p>
                <ul className="pills">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                <a className="btn fill" href={p.link}>Lihat di GitHub ↗</a>
              </article>
            ))}
            <div className="hz-panel intro">
              <h3>Lebih banyak di <em>GitHub</em></h3>
              <a className="btn" href={me.github}>github.com/Joeyzeeee ↗</a>
            </div>
          </div>
          <div className="hz-bar"><i /></div>
        </section>

        <div className="wrap">
          <section id="pengalaman">
            <p className="sec rv">Pengalaman</p>
            <Big parts={[{ t: 'Dari ' }, { t: 'kabel jaringan', em: true }, { t: ' sampai kamera.' }]} />
            <div className="rows rv">
              {experience.map((e) => (
                <div className="row" key={e.t}>
                  <span className="y">{e.y}</span>
                  <div><h3>{e.t}</h3><p>{e.d}</p></div>
                </div>
              ))}
            </div>
            {skills.map((s) => (
              <div className="grp rv" key={s.g}>
                <h3>{s.g}</h3>
                <ul className="pills">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </section>

          <section id="kontak">
            <p className="sec rv">Kontak</p>
            <Big parts={[{ t: 'Ada peluang magang atau proyek? ' }, { t: 'Ayo ngobrol.', em: true }]} />
            <a className="mail rv" href={'mailto:' + me.email}>{me.email}</a>
            <div className="links rv"><a href={me.github}>GitHub</a></div>
          </section>
        </div>
      </main>

      <footer className="wrap">
        <span>© 2026 {me.name}</span>
        <span>Malang, Indonesia</span>
      </footer>
    </div>
  )
}
