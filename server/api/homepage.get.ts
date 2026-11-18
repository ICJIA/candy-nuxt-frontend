// Fetched via GraphQL
// Only the fields listed here come back, so add any new ones the app needs.
const HOMEPAGE_QUERY = /* GraphQL */ `
  query Homepage($status: PublicationStatus) {
    homepage(status: $status) {
      ${DOCUMENT_FIELDS}
      SiteName
      siteDecription
      favicon { ${MEDIA_FIELDS} }
      defaultSeo {
        id
        metaTitle
        metaDesciption
        shareImage { ${MEDIA_FIELDS} }
      }
    }
  }
`

export default defineEventHandler(async (event) => {
  const { homepage } = await queryStrapi<{ homepage: Homepage | null }>(event, HOMEPAGE_QUERY)
  if (!homepage) throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  return homepage
})
