import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          radix: [
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs'
          ],
          lucide: ['lucide-react'],
          tanstack: [
            '@tanstack/react-query',
            '@tanstack/react-query-devtools',
            '@tanstack/react-table'
          ],
          motion: ['motion'],
          embla: ['embla-carousel-react'],
          zod: ['zod'],
          tailwind: ['tailwind-merge', 'tailwindcss'],
          sonner: ['sonner'],
          utils: ['clsx', 'class-variance-authority'],
        }
      }
    }
  }
})