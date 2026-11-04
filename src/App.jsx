import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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

function ProjectDetailPage({ project, onBack, isReduced }) {
  const pageRef = useRef(null)
  const detail = project?.detail
  if (!detail) return null

  // Scroll ke paling atas saat halaman studi kasus terbuka
  useEffect(() => {
    window.scrollTo(0, 0)
    if (pageRef.current) {
      pageRef.current.scrollTop = 0
    }
  }, [project])

  // Animasi masuk halus untuk elemen-elemen halaman
  useEffect(() => {
    if (isReduced) return
    const el = pageRef.current
    if (!el) return

    gsap.fromTo(
      el.querySelectorAll('.pdetail-anim'),
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
    )
  }, [isReduced, project])

  // Daftarkan link & tombol di halaman detail ke efek kursor .cur
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const cur = document.querySelector('.cur')
    if (!cur) return

    const interactive = pageRef.current?.querySelectorAll('a, button, .pdetail-github-link')
    if (!interactive) return

    const onEnter = () => cur.classList.add('big')
    const onLeave = () => cur.classList.remove('big')

    interactive.forEach((item) => {
      item.addEventListener('pointerenter', onEnter)
      item.addEventListener('pointerleave', onLeave)
    })

    return () => {
      cur.classList.remove('big')
      interactive.forEach((item) => {
        item.removeEventListener('pointerenter', onEnter)
        item.removeEventListener('pointerleave', onLeave)
      })
    }
  }, [project])

  // Tombol Escape untuk kembali
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onBack()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onBack])

  return (
    <div className="pdetail-page" ref={pageRef} tabIndex={-1} data-lenis-prevent="true">
      {/* Top Bar Navigation */}
      <nav className="pdetail-nav">
        <div className="pdetail-wrap pdetail-nav-inner">
          <button type="button" className="pdetail-back-btn" onClick={onBack} aria-label="Kembali ke Portofolio">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Kembali ke Portofolio</span>
          </button>
          <a
            className="pdetail-nav-github"
            href={detail.links?.github || project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </nav>

      <article className="pdetail-wrap pdetail-content">
        {/* Header / Judul & Statement Editorial */}
        <header className="pdetail-header pdetail-anim">
          <span className="pdetail-kicker">{project.tag} · {project.year}</span>
          <h1 className="pdetail-title">{project.title}</h1>
          <p className="pdetail-statement">
            {detail.isComingSoon ? (
              <>Coming Soon <em>(In Progress)</em></>
            ) : (
              detail.statement || 'Aplikasi mobile untuk mendigitalkan proses kompensasi mahasiswa di Politeknik Negeri Malang.'
            )}
          </p>
        </header>

        {detail.isComingSoon ? (
          <section className="pdetail-section pdetail-anim">
            <span className="pdetail-col-label">STATUS DOKUMENTASI</span>
            <p className="pdetail-about-lead">
              Studi kasus dan dokumentasi teknis mendalam untuk proyek <strong>{project.title}</strong> sedang dalam tahap penyusunan.
            </p>
            <p className="pdetail-about-sub">
              {project.desc}
            </p>
            <div className="pdetail-columns" style={{ marginTop: '40px' }}>
              <div className="pdetail-col">
                <span className="pdetail-col-label">PERAN</span>
                <p className="pdetail-stack-text">{project.tag}</p>
              </div>
              <div className="pdetail-col">
                <span className="pdetail-col-label">TECH STACK</span>
                <p className="pdetail-stack-text">{project.stack?.join(', ')}</p>
              </div>
              <div className="pdetail-col">
                <span className="pdetail-col-label">REPOSITORI</span>
                <a
                  className="pdetail-github-link"
                  href={detail.links?.github || project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/Joeyzeeee ↗
                </a>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* 1. Aplikasi Ini Tentang Apa */}
            <section className="pdetail-section pdetail-anim">
              <span className="pdetail-col-label">TENTANG APLIKASI</span>
              <p className="pdetail-about-lead">
                {detail.about}
              </p>
              <p className="pdetail-about-sub">
                {detail.problem}
              </p>
            </section>

            {/* 2, 3, 4. Bagian yang Saya Kerjakan, Tech Stack, GitHub (Editorial Columns Tanpa Kotak) */}
            <div className="pdetail-columns pdetail-anim">
              {/* Kolom 1: Saya Mengerjakan Bagian Apa */}
              <div className="pdetail-col pdetail-col-role">
                <span className="pdetail-col-label">BAGIAN YANG SAYA KERJAKAN</span>
                <p className="pdetail-role-title">{detail.role?.badge}</p>
                <ul className="pdetail-role-list">
                  {detail.role?.items?.map((item, idx) => (
                    <li key={idx}>
                      <span className="pdetail-role-dash" aria-hidden="true">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Kolom 2: Tech Stack */}
              <div className="pdetail-col pdetail-col-stack">
                <span className="pdetail-col-label">TECH STACK</span>
                <p className="pdetail-stack-text">
                  {detail.stack?.join(', ')}
                </p>
              </div>

              {/* Kolom 3: GitHub */}
              <div className="pdetail-col pdetail-col-github">
                <span className="pdetail-col-label">REPOSITORI</span>
                <a
                  className="pdetail-github-link"
                  href={detail.links?.github || project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/Joeyzeeee ↗
                </a>
              </div>
            </div>
          </>
        )}

        {/* Bottom Return Button */}
        <div className="pdetail-bottom pdetail-anim">
          <button type="button" className="pdetail-back-bottom-btn" onClick={onBack}>
            ← Kembali ke Portofolio
          </button>
        </div>
      </article>
    </div>
  )
}

export default function App() {
  const root = useRef(null)
  const photoRef = useRef(null)
  const openerRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [force, setForce] = useState(false)
  const [imgError, setImgError] = useState(false)
  const reduced = false

  const handleOpenDetail = (p, openerEl) => {
    openerRef.current = openerEl || document.activeElement
    setSelectedProject(p)
    if (window.__lenis) {
      window.__lenis.stop()
    }
    const slug = p.title.toLowerCase().replace(/\s+/g, '-')
    if (window.location.hash !== `#/proyek/${slug}`) {
      window.history.pushState({ project: slug }, '', `#/proyek/${slug}`)
    }
  }

  const handleBack = () => {
    setSelectedProject(null)
    if (window.__lenis) {
      window.__lenis.start()
    }
    if (window.location.hash.startsWith('#/proyek/')) {
      window.history.pushState(null, '', '#proyek')
    }
    setTimeout(() => {
      try {
        openerRef.current?.focus?.({ preventScroll: true })
      } catch {
        openerRef.current?.focus?.()
      }
      const hz = document.querySelector('.hz')
      if (hz && hz.scrollLeft !== 0) hz.scrollLeft = 0
    }, 60)
  }

  // Sinkronisasi navigasi URL hash (tombol back/forward browser & direct link)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      if (hash.startsWith('#/proyek/')) {
        const slug = hash.replace('#/proyek/', '').toLowerCase()
        const found = projects.find(
          (p) => p.detail && p.title.toLowerCase().replace(/\s+/g, '-') === slug
        )
        if (found) {
          setSelectedProject(found)
          window.__lenis?.stop()
        }
      } else {
        setSelectedProject(null)
        window.__lenis?.start()
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    window.addEventListener('popstate', handleHash)
    return () => {
      window.removeEventListener('hashchange', handleHash)
      window.removeEventListener('popstate', handleHash)
    }
  }, [])
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
        .from('.hello, .hero .btns, .top', { opacity: 0, y: 24, duration: 0.9, stagger: 0.08 }, '-=0.7')
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

      // Mendukung scroll horizontal natural dengan trackpad (swipe 2 jari kiri/kanan) atau Shift+Wheel
      const hzEl = document.querySelector('.hz')
      const handleHzWheel = (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault()
          if (lenis) {
            lenis.scrollTo(lenis.scroll + e.deltaX * 1.4, { immediate: true })
          } else {
            window.scrollBy({ top: e.deltaX * 1.4 })
          }
        }
      }
      hzEl?.addEventListener('wheel', handleHzWheel, { passive: false })

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

    return () => {
      hzEl?.removeEventListener('wheel', handleHzWheel)
      if (raf) gsap.ticker.remove(raf)
      if (lenis) lenis.destroy()
      window.__lenis = null
      ctx.revert()
    }
  }, [force])


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
          <p><strong>Project Leader &amp; Developer</strong>Software Engineering Student, Politeknik Negeri Malang.</p>
          <div className="btns">
            <a className="btn fill" href="#proyek" onClick={go}>
              Lihat Proyek
            </a>
            <a
              className="btn btn-glass"
              href="https://drive.google.com/file/d/1vwRKkF9bYfS5kUDMYrhVttWz7kuKJwS8/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lihat CV
              <svg className="btn-ext" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <div className="btns-social">
              <a
                className="btn-icon"
                href={me.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                className="btn-icon"
                href={me.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>


      <main>
        <div className="wrap">
          <section id="tentang">
            <p className="sec rv">Tentang Saya</p>
            <Big
              parts={[
                { t: 'Halo... saya Krisna', em: true, breakAfter: true },
                { t: 'Software Engineering Student' },
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
                  Saya mahasiswa Sistem Informasi di Polinema dengan latar belakang di bidang software development dan system analysis.
                </p>
                <p>
                  Perjalanan saya di dunia teknologi dimulai dari jurusan TKJ di SMKN 1 Blitar dan berlanjut ke berbagai proyek nyata, mulai dari memimpin pengembangan sistem peminjaman fasilitas kampus (<a href="#proyek" onClick={go} className="about-link">SIFORA</a>) hingga membangun aplikasi mobile pengelolaan kompensasi mahasiswa (<a href="#proyek" onClick={go} className="about-link">Kompenify</a>). Saya terbiasa menangani siklus pengembangan perangkat lunak secara menyeluruh, mulai dari perancangan arsitektur, penyusunan dokumen SKPL, implementasi code, hingga pengujian usability.
                </p>
                <p>
                  Selain rekayasa perangkat lunak, pengalaman freelance sebagai fotografer dan editor foto sejak 2022 mengasah kepekaan visual dan ketelitian saya terhadap detail.
                </p>
                <p>
                  Currently open for internship and Junior Developer opportunities. <a href="#kontak" onClick={go} className="about-link">Let’s connect</a> and explore how we can collaborate.
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="hz" id="proyek">
          <div className="hz-track">
            <div className="hz-panel intro">
              <p className="sec">Proyek</p>
              <h2 className="big">Beberapa <em>proyek</em> yang saya kerjakan.</h2>
              <p className="hint">Scroll untuk melihat →</p>
            </div>
            {projects.map((p) => (
              <article className="hz-panel" key={p.no}>
                <span className="hz-no">{p.no}</span>
                <h3>{p.title}</h3>
                <p className="tag">{p.tag} · {p.year}</p>
                <p className="desc">{p.desc}</p>
                <ul className="pills">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                <div className="hz-actions">
                  <a className="btn fill" href={p.link} target="_blank" rel="noopener noreferrer">
                    Lihat di GitHub ↗
                  </a>
                  {p.detail && (
                    <button
                      type="button"
                      className="btn"
                      onClick={(e) => handleOpenDetail(p, e.currentTarget)}
                    >
                      Click for detail
                    </button>
                  )}
                </div>
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

      {selectedProject &&
        createPortal(
          <ProjectDetailPage
            project={selectedProject}
            onBack={handleBack}
            isReduced={reduced && !force}
          />,
          document.body
        )}
    </div>
  )
}
