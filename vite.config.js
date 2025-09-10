import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/v1': {
        target: `http://localhost:${process.env.PORT || 8000}`,
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), tailwindcss(), flowbiteReact()],
  
});