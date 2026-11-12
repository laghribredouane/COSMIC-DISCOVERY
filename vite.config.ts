import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
      dedupe: ['react', 'react-dom'],
    },
    server: {
      // Binds to all network interfaces, required for container/Cloud Run environments
      host: '0.0.0.0',
      port: 3000,
      // In AI Studio / Cloud Run preview iframe, HMR WebSocket is disabled
      hmr: false,
      // Disable file watching to save CPU during agent edits
      watch: null,
    },
  };
});
