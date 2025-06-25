import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8000',  // Para desarrollo local
    },
    
  },
  build: {
    outDir: 'dist',  // Carpeta de salida para Django
    emptyOutDir: true,                 // Borra archivos viejos antes de construir
    manifest: true,                    // Genera un manifest para Django
  },
});
