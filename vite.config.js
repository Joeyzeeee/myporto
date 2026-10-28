import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' supaya hasil build bisa ditaruh di hosting mana pun
export default defineConfig({ base: './', plugins: [react()] })
