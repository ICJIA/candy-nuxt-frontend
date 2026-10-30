/**
 * Entry point for the Strapi admin Preview panel (see candy-strapi-linux/config/admin.ts).
 * GET /api/preview?url=/sciences/foo&secret=...&status=draft|published
 */
export default defineEventHandler((event) => {
  const { url, secret, status } = getQuery(event)

  if (!isValidPreviewSecret(event, secret)) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid preview secret' })
  }

  if (status === 'published') {
    disablePreview(event)
  } else {
    enablePreview(event)
  }

  return sendRedirect(event, safeRedirectPath(url))
})
