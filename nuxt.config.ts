// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  target: 'static', // 정적 사이트 생성
  ssr: true,       // SSR 렌더링 방식 사용 (Hydration 위해 필요)
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/abstracts/variables.scss" as *;
            @use "@/assets/scss/abstracts/mixins.scss" as *;
          `
        }
      }
    }
  },
  css: [
    '@/assets/scss/main.scss'
  ],
   runtimeConfig: {
    public: {
      apiKey: process.env.NUXT_PUBLIC_API_KEY
    }
  }
})
