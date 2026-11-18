// GET /api/content/sciences/some-slug
export default defineEventHandler(async (event) => {
  const { name, fields } = getCollection(event)
  const slug = getRouterParam(event, 'slug')!
  const data = await queryStrapi<Record<string, unknown[]>>(event, /* GraphQL */ `
    query ($status: PublicationStatus, $slug: String!) {
      ${name}(status: $status, filters: { slug: { eq: $slug } }, pagination: { pageSize: 1 }) { ${fields} }
    }
  `, { slug })

  const [doc] = data[name] ?? []
  if (!doc) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }
  return doc
})
