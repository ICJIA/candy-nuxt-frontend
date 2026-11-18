import type { H3Event } from 'h3'
import { FetchError } from 'ofetch'

// Reusable GraphQL field selections. GraphQL only returns the fields you ask for,
// so add a field here (and to shared/types/strapi.ts) before using it in the app.
export const DOCUMENT_FIELDS = 'documentId createdAt updatedAt publishedAt'
export const MEDIA_FIELDS = 'documentId name alternativeText caption width height mime url'

// Relation lists are paginated in GraphQL (REST populate was not), so lift the limit
const ALL = 'pagination: { limit: 100 }'

// Collection types the frontend may request, keyed by their plural GraphQL query
// name, with the fields each one returns.
const COLLECTIONS = {
  sciences: `
    ${DOCUMENT_FIELDS} Name slug Description
    Cover { ${MEDIA_FIELDS} }
    categories(${ALL}) { ${DOCUMENT_FIELDS} Name slug }
  `,
  technologies: `
    ${DOCUMENT_FIELDS} Name slug Description
    Cover { ${MEDIA_FIELDS} }
  `,
  categories: `
    ${DOCUMENT_FIELDS} Name slug
    sciences(${ALL}) { ${DOCUMENT_FIELDS} Name slug Description Cover { ${MEDIA_FIELDS} } }
  `,
} satisfies Record<string, string>

export type CollectionName = keyof typeof COLLECTIONS

export const getCollection = (event: H3Event) => {
  const type = getRouterParam(event, 'type')
  if (!type || !Object.hasOwn(COLLECTIONS, type)) {
    throw createError({ statusCode: 404, statusMessage: 'Unknown content type' })
  }
  return { name: type as CollectionName, fields: COLLECTIONS[type as CollectionName] }
}

interface GraphQLResponse<T> {
  data: T | null
  errors?: { message: string, extensions?: { code?: string } }[]
}

/**
 * POST a query to Strapi's GraphQL endpoint (requires @strapi/plugin-graphql).
 * Adds the API token and sets the `$status` variable to DRAFT when the request
 * carries a valid preview cookie, PUBLISHED otherwise.
 */
export const queryStrapi = async <T>(event: H3Event, query: string, variables: Record<string, unknown> = {}) => {
  const { strapiUrl, strapiGraphqlUrl, strapiToken } = useRuntimeConfig(event)

  let res: GraphQLResponse<T>
  try {
    res = await $fetch<GraphQLResponse<T>>(strapiGraphqlUrl || `${strapiUrl}/graphql`, {
      method: 'POST',
      body: { query, variables: { ...variables, status: isPreviewEnabled(event) ? 'DRAFT' : 'PUBLISHED' } },
      headers: strapiToken ? { Authorization: `Bearer ${strapiToken}` } : undefined,
    })
  } catch (error) {
    throw toStrapiError(error)
  }

  // GraphQL reports query errors in the body, often with HTTP 200
  if (res.errors?.length || !res.data) {
    const forbidden = res.errors?.some(e => e.extensions?.code === 'FORBIDDEN')
    throw createError({
      statusCode: forbidden ? 403 : 502,
      statusMessage: forbidden ? DENIED_MESSAGE : `Strapi GraphQL error: ${res.errors?.[0]?.message ?? 'no data'}`,
    })
  }
  return res.data
}

const DENIED_MESSAGE = 'Strapi denied access: grant the Public role find/findOne or set NUXT_STRAPI_TOKEN'

const toStrapiError = (error: unknown) => {
  const statusCode = error instanceof FetchError ? (error.statusCode ?? 502) : 502
  const statusMessage =
    statusCode === 404 ? 'Not Found'
      : statusCode === 401 || statusCode === 403 ? DENIED_MESSAGE
        : 'Could not reach Strapi'
  return createError({ statusCode, statusMessage })
}
