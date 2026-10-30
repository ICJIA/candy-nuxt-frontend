// GET /api/content/sciences/some-slug
export default defineEventHandler(async (event) => {
  const { name, populate } = getCollection(event)
  const slug = getRouterParam(event, 'slug')!
  const { data } = await fetchFromStrapi<unknown[]>(event, name, {
    ...populate,
    'filters[slug][$eq]': slug,
    'pagination[pageSize]': 1,
  })

  if (!data[0]) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }
  return data[0]
})
