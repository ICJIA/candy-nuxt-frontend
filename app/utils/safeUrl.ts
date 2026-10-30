// Only allow http(s), relative and mailto links so CMS content can't inject javascript: URLs
export const safeUrl = (url: string | null | undefined) =>
  url && /^(https?:|\/|#|mailto:)/i.test(url) ? url : '#'
