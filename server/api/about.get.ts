export default defineEventHandler(async (event) => {
  const { data } = await fetchFromStrapi<About>(event, 'about')
  return data
})
