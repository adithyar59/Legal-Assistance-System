import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
    proxy: {
      // StepFun direct API proxy (fixes CORS)
      '/proxy/stepfun': {
        target: 'https://api.stepfun.ai',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/proxy\/stepfun/, ''),
        secure: true,
      },
      // Groq proxy
      '/proxy/groq': {
        target: 'https://api.groq.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/proxy\/groq/, ''),
        secure: true,
      },
      // Together AI proxy
      '/proxy/together': {
        target: 'https://api.together.xyz',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/proxy\/together/, ''),
        secure: true,
      },
      // Anthropic proxy
      '/proxy/anthropic': {
        target: 'https://api.anthropic.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/proxy\/anthropic/, ''),
        secure: true,
      },
    },
  },
});