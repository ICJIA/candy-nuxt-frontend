<script setup lang="ts">
// The Cover fields accept images, video, audio and files, so pick the element by mime type
const props = defineProps<{ media: StrapiMedia, eager?: boolean }>()

const mediaUrl = useStrapiMedia()
const src = computed(() => mediaUrl(props.media.url))
const kind = computed(() => props.media.mime.split('/')[0])
</script>

<template>
  <img
    v-if="kind === 'image'"
    :src="src"
    :alt="media.alternativeText ?? ''"
    :width="media.width ?? undefined"
    :height="media.height ?? undefined"
    :loading="eager ? 'eager' : 'lazy'"
  >
  <video v-else-if="kind === 'video'" :src="src" controls preload="metadata" />
  <audio v-else-if="kind === 'audio'" :src="src" controls preload="metadata" />
  <a v-else :href="src" class="file-link">{{ media.name }}</a>
</template>
