import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on localhost (127.0.0.1) explicitly
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    // Custom middleware to prevent ad blocker issues
    middlewareMode: false,
    // Disable HMR to prevent issues
    hmr: {
      host: '127.0.0.1',
      port: 5173,
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
  },
});
