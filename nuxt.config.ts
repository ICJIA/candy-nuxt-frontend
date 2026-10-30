// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  // Every key can be overridden at runtime with NUXT_* env vars (see .env.example)
  runtimeConfig: {
    // Server-only: used by server/api/* to talk to Strapi
    strapiUrl: 'http://localhost:1337',
    strapiToken: '',
    previewSecret: '',
    public: {
      // Browser-facing Strapi URL, used to resolve relative /uploads media paths
      strapiUrl: 'http://localhost:1337',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
})
