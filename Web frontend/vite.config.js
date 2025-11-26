import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // ⬇⬇⬇ ESTA ES LA PARTE QUE FALTABA PARA QUE "describe", "test" Y "expect" EXISTAN
  test: {
    globals: true,      // describe(), test(), expect() SIN IMPORTAR
    environment: 'jsdom',  // Simula DOM para pruebas de React
    setupFiles: './setupTests.js', // Archivo opcional para mocks o configs extra
  }
})
