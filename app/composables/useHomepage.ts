/**
 * The Strapi Homepage single type: site name, favicon, intro and default SEO.
 * Shared by key, so app.vue, the layout and the home page make one request.
 * Not fatal: if it's unpublished or Strapi is down, callers fall back to defaults.
 */
export const useHomepage = () => useFetch<Homepage>('/api/homepage', { key: 'homepage' })
