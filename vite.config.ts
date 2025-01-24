import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'  
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Kumbulink/',
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Kumbulink',
        id: '/Kumbulink/',
        short_name: 'kumbulink',
        start_url: '/Kumbulink/',
        description: 'Kumbulink: conectamos quem precisa trocar e enviar dinheiro, de forma direta, simples e segura',
        theme_color: '#2B4420',
        display: "standalone",
        orientation: 'any',
        background_color: "#E1EFDC",
        icons: [
          {
            src: '/Kumbulink/icon/48x48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: '/Kumbulink/icon/96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/Kumbulink/icon/144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/Kumbulink/icon/192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/Kumbulink/icon/512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/Kumbulink/icon/512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/Kumbulink/icon/maskable_icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: '/Kumbulink/desktop-screenshot.png',
            sizes: '1124x702',
            type: 'image/png',
            form_factor: 'wide',
            label: "Home screen"
          },
          {
            src: '/Kumbulink/mobile-screenshot.png',
            sizes: '393x803',
            type: 'image/png',
            form_factor: 'narrow',
            label: "Home screen"
          },
        ]
      }
    })
  ],
})
