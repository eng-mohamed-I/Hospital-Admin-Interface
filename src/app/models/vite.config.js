// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    watch: {
      usePolling: true
    },
    hmr: true,
    timeout: 60000 
  }
});
