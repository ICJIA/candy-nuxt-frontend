<script setup lang="ts">
const { data: homepage } = await useHomepage()
const mediaUrl = useStrapiMedia()

const siteName = computed(() => homepage.value?.SiteName ?? 'Candy')
const seo = computed(() => homepage.value?.defaultSeo)

useHead(computed(() => ({
  titleTemplate: (title?: string) => (title ? `${title} · ${siteName.value}` : siteName.value),
  link: [{ rel: 'icon', href: mediaUrl(homepage.value?.favicon?.url) ?? '/favicon.ico' }],
})))

// Site-wide defaults; pages override description/og tags where they have their own
useSeoMeta({
  ogSiteName: siteName,
  description: () => seo.value?.metaDesciption,
  ogImage: () => mediaUrl(seo.value?.shareImage?.url),
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
