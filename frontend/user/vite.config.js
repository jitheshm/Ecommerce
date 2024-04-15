import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), VitePWA({
    workbox: {
      navigateFallbackDenylist: [
        /^\/user\/auth\/google/,
        /^\/adminpanel/
      ]
    },
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true
    },
    manifest: {
      name: 'Electro',
      short_name: 'Electro',
      description: 'My Awesome App description',
      theme_color: '#15161D',
      start_url: '/',
      icons: [
        {
          src: 'icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
  server: {
    host: true,
    port: 8000, // This is the port which we will use in docker

    watch: {
      usePolling: true
    }
  }
})
