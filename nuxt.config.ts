// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  app: {
    head: {
      title: '배경화면 만들기', // 기본 타이틀
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
      ],
      meta: [
        {name:'description', content:"pc와 모바일 폰의 배경화면을 만드는 사이트 입니다"},
        
        {name:'author', content:"최하혜"},
        {property:'og:title', content:"배경화면 만들기"},
        {property:'og:description', content:"pc와 모바일 폰의 배경화면을 만드는 사이트입니다"},
        {property:'og:type', content:"website"},
        {property:'og:url', content:"https://wallpaper-edit.pages.dev/"},
        {property:'og:image', content:"https://wallpaper-edit.pages.dev/images/img_main.png"},
        {property:'og:site_name', content:"배경화면 만들기"},
      ],
    },
  },
  nitro: {
    preset: 'cloudflare-pages'
  },
  ssr: true,       // SSR 렌더링 방식 사용 (Hydration 위해 필요)
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/ui', '@nuxt/image'],
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
    privatePixabayKey: process.env.PIXABAY_API_KEY
  }
})