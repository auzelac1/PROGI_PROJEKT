import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //Tonko: cijeli kod je postavljen da radi s portom 5173 
    //ako se pokrece server dok je vec upaljen, stvorio bi se novi na +1 port, 5174...
    port:5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})
