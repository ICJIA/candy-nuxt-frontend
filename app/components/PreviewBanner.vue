<script setup lang="ts">
const route = useRoute()
const { strapiUrl } = useRuntimeConfig().public
const { data: preview } = await useFetch('/api/preview-status', { key: 'preview-status' })

// The Strapi admin Preview panel posts "strapiUpdate" to this iframe after each save
const onMessage = (event: MessageEvent) => {
  if (event.origin !== new URL(strapiUrl).origin) return
  if (event.data?.type === 'strapiUpdate') refreshNuxtData()
}
onMounted(() => window.addEventListener('message', onMessage))
onBeforeUnmount(() => window.removeEventListener('message', onMessage))
</script>

<template>
  <div v-if="preview?.enabled" class="preview-banner" role="status">
    Viewing draft content
    <a :href="`/api/exit-preview?url=${encodeURIComponent(route.fullPath)}`">Exit preview</a>
  </div>
</template>
