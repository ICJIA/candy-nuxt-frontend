<script setup lang="ts">
const props = defineProps<{
  title: string
  to: string | null
  cover?: StrapiMedia | null
  excerpt?: string
}>()

// Resolved here, not in the template: Nuxt only auto-imports it from <script setup>
const NuxtLink = resolveComponent('NuxtLink')
const mediaUrl = useStrapiMedia()
// Cards only show image covers; other media types get the placeholder
const image = computed(() => (props.cover?.mime.startsWith('image/') ? props.cover : null))
</script>

<template>
  <component :is="to ? NuxtLink : 'div'" :to="to ?? undefined" class="card">
    <div class="card-cover">
      <img v-if="image" :src="mediaUrl(image.url)" :alt="image.alternativeText ?? ''" loading="lazy">
      <span v-else aria-hidden="true">{{ title.charAt(0) }}</span>
    </div>
    <h3 class="card-title">
      {{ title }}
    </h3>
    <p v-if="excerpt" class="card-excerpt">
      {{ excerpt }}
    </p>
    <slot />
  </component>
</template>
