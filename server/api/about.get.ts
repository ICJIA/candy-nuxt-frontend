// Fetched via GraphQL
// Only the fields listed here come back, so add any new ones the app needs.
const ABOUT_QUERY = /* GraphQL */ `
  query About($status: PublicationStatus) {
    about(status: $status) {
      ${DOCUMENT_FIELDS}
      Name
      Decription
    }
  }
`

export default defineEventHandler(async (event) => {
  const { about } = await queryStrapi<{ about: About | null }>(event, ABOUT_QUERY)
  if (!about) throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  return about
})
