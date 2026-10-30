import { createHmac, timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'

const COOKIE = 'strapi_preview'

const safeEqual = (a: string, b: string) => {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
}

// The cookie holds an HMAC of the secret rather than a flag, so it can't be forged
const previewToken = (secret: string) => createHmac('sha256', secret).update('strapi-preview').digest('hex')

export const isValidPreviewSecret = (event: H3Event, provided: unknown) => {
  const { previewSecret } = useRuntimeConfig(event)
  return Boolean(previewSecret) && typeof provided === 'string' && safeEqual(provided, previewSecret)
}

export const isPreviewEnabled = (event: H3Event) => {
  const { previewSecret } = useRuntimeConfig(event)
  const cookie = getCookie(event, COOKIE)
  return Boolean(previewSecret && cookie) && safeEqual(cookie!, previewToken(previewSecret))
}

export const enablePreview = (event: H3Event) => {
  const { previewSecret } = useRuntimeConfig(event)
  // The Strapi admin embeds this site in an iframe. When they live on different
  // sites (production), the cookie must be SameSite=None, which requires HTTPS.
  const secure = getRequestProtocol(event) === 'https'
  setCookie(event, COOKIE, previewToken(previewSecret), {
    httpOnly: true,
    secure,
    sameSite: secure ? 'none' : 'lax',
    path: '/',
  })
}

export const disablePreview = (event: H3Event) => {
  deleteCookie(event, COOKIE, { path: '/' })
}

// Only same-origin paths, so ?url= can't be used as an open redirect
export const safeRedirectPath = (url: unknown) =>
  typeof url === 'string' && url.startsWith('/') && !url.startsWith('//') && !url.startsWith('/\\') ? url : '/'
