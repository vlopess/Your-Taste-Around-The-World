import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Your-Taste-Around-The-World/",
  build: {
    outDir: "dist",
  },
})
