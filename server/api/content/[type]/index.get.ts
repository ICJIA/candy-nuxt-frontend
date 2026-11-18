// GET /api/content/sciences | technologies | categories
export default defineEventHandler(async (event) => {
  const { name, fields } = getCollection(event)
  const data = await queryStrapi<Record<string, unknown[]>>(event, /* GraphQL */ `
    query ($status: PublicationStatus) {
      ${name}(status: $status, sort: "Name:asc", pagination: { pageSize: 100 }) { ${fields} }
    }
  `)
  return data[name]
})
