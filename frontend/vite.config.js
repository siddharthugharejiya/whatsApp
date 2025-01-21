import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,  // Ensures the server will not start if port 3000 is in use
  },
  plugins: [react()],
});
