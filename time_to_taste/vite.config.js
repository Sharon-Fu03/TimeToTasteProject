import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendUrl = env.VITE_BACKEND_URL || 'http://localhost:8080'

  return {
    plugins: [ tailwindcss(),react()],
    server: {
      port: 3000,
      strictPort: true,
      proxy: {
        // proxy API requests to Spring Boot backend
        '/getIngredient': {
          target: backendUrl,
          changeOrigin: true
        },
        '/api': {
          target: backendUrl,
          changeOrigin: true
        }
      }
    }
  }
})
