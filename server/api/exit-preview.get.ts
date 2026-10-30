// GET /api/exit-preview?url=/current/path
export default defineEventHandler((event) => {
  disablePreview(event)
  return sendRedirect(event, safeRedirectPath(getQuery(event).url))
})
