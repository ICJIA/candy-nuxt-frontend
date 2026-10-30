export default defineEventHandler(async (event) => {
  const { data } = await fetchFromStrapi<Homepage>(event, 'homepage', {
    'populate[favicon]': true,
    'populate[defaultSeo][populate][0]': 'shareImage',
  })
  return data
})
