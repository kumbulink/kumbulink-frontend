import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@icons': path.resolve(__dirname, 'public/icons'),
        '@shared': path.resolve(__dirname, 'src/shared')
      }
    },
    server: isDev
      ? {
          https: {
            key: fs.readFileSync(
              path.resolve(__dirname, 'local.kumbulink.com-key.pem')
            ),
            cert: fs.readFileSync(
              path.resolve(__dirname, 'local.kumbulink.com.pem')
            )
          },
          host: 'local.kumbulink.com' // importante usar o mesmo host do certificado
        }
      : {},
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
          id: '/',
          short_name: 'kumbulink',
          start_url: '/',
          description:
            'Kumbulink: conectamos quem precisa trocar e enviar dinheiro, de forma direta, simples e segura',
          theme_color: '#2B4420',
          display: 'standalone',
          orientation: 'any',
          background_color: '#E1EFDC',
          icons: [
            {
              src: '/icons/48x48.png',
              sizes: '48x48',
              type: 'image/png'
            },
            {
              src: '/icons/96x96.png',
              sizes: '96x96',
              type: 'image/png'
            },
            {
              src: '/icons/144x144.png',
              sizes: '144x144',
              type: 'image/png'
            },
            {
              src: '/icons/192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/icons/512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: '/icons/512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/icons/maskable_icon.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ],
          screenshots: [
            {
              src: '/desktop-screenshot.png',
              sizes: '1124x702',
              type: 'image/png',
              form_factor: 'wide',
              label: 'Home screen'
            },
            {
              src: '/mobile-screenshot.png',
              sizes: '393x803',
              type: 'image/png',
              form_factor: 'narrow',
              label: 'Home screen'
            }
          ]
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 4 * 1024 * 1024 // 4MB
        }
      })
    ]
  }
})
