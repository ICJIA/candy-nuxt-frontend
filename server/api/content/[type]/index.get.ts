// GET /api/content/sciences | technologies | categories
export default defineEventHandler(async (event) => {
  const { name, populate } = getCollection(event)
  const { data } = await fetchFromStrapi<unknown[]>(event, name, {
    ...populate,
    'sort[0]': 'Name:asc',
    'pagination[pageSize]': 100,
  })
  return data
})
