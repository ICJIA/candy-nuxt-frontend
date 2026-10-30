import type { H3Event } from 'h3'
import { FetchError } from 'ofetch'

// Collection types the frontend may request, keyed by their REST plural API ID,
// with the populate params each one needs.
const COLLECTIONS = {
  sciences: { 'populate[Cover]': true, 'populate[categories]': true },
  technologies: { 'populate[Cover]': true },
  categories: { 'populate[sciences][populate][0]': 'Cover' },
} satisfies Record<string, Record<string, unknown>>

export type CollectionName = keyof typeof COLLECTIONS

export const getCollection = (event: H3Event) => {
  const type = getRouterParam(event, 'type')
  if (!type || !Object.hasOwn(COLLECTIONS, type)) {
    throw createError({ statusCode: 404, statusMessage: 'Unknown content type' })
  }
  return { name: type as CollectionName, populate: COLLECTIONS[type as CollectionName] }
}

/**
 * GET /api/{path} on Strapi. Adds the API token and, when the request carries a
 * valid preview cookie, asks for draft content instead of published.
 */
export const fetchFromStrapi = async <T>(event: H3Event, path: string, query: Record<string, unknown> = {}) => {
  const { strapiUrl, strapiToken } = useRuntimeConfig(event)

  try {
    return await $fetch<StrapiResponse<T>>(`/api/${path}`, {
      baseURL: strapiUrl,
      query: { ...query, status: isPreviewEnabled(event) ? 'draft' : 'published' },
      headers: strapiToken ? { Authorization: `Bearer ${strapiToken}` } : undefined,
    })
  } catch (error) {
    const statusCode = error instanceof FetchError ? (error.statusCode ?? 502) : 502
    const statusMessage =
      statusCode === 404 ? 'Not Found'
        : statusCode === 401 || statusCode === 403 ? 'Strapi denied access: grant the Public role find/findOne or set NUXT_STRAPI_TOKEN'
          : 'Could not reach Strapi'
    throw createError({ statusCode, statusMessage })
  }
}
