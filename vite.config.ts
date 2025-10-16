import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/sitemap.xml': {
        target: 'http://localhost:9080',
        changeOrigin: true,
        // rewrite 없음: 경로 그대로 전달
      },
      '/sitemap': {
        target: 'http://localhost:9080',
        changeOrigin: true,
      },
    },
  },
});
