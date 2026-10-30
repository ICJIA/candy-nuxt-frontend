export default defineEventHandler((event) => ({ enabled: isPreviewEnabled(event) }))
