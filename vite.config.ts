import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    allowedHosts: [
      '.lindy.site',
      '.e2b.app',
      'localhost',
      '127.0.0.1',
      '5173-i83lf3zh3pn7jc82av36f.e2b.app'
    ],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
  },
});
