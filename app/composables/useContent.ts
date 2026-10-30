/**
 * Fetch from this app's server/api routes and turn failures into Nuxt's error page.
 * Must be awaited at the top of a page's <script setup>.
 */
export const useContent = async <T>(path: string) => {
  const { data, error } = await useFetch<T>(`/api/${path}`, { key: `content:${path}` })

  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode ?? 500,
      statusMessage: error.value.statusMessage,
      fatal: true,
    })
  }
  return data as Ref<T>
}
