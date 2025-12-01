import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    coverage: {
      provider: 'c8',                // o 'v8'
      reporter: ['text', 'lcov', 'html'],
      all: true,
      include: ['src/**/*.{js,jsx,ts,tsx}'],
    },
  },
})
