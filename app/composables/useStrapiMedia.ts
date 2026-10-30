// Strapi's local upload provider returns paths like /uploads/foo.png; resolve them
// against the public Strapi URL. Absolute URLs (S3, Cloudinary, ...) pass through.
export const useStrapiMedia = () => {
  const { strapiUrl } = useRuntimeConfig().public
  return (url: string | null | undefined) => {
    if (!url) return undefined
    return /^https?:\/\//i.test(url) ? url : `${strapiUrl.replace(/\/$/, '')}${url}`
  }
}
