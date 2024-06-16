import { defineConfig } from "vitest/config"
import dns from 'dns'
import react from "@vitejs/plugin-react"

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 5003,
    host: 'localhost'
  },
  build: {
    manifest: true,
    outDir: "build",
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
