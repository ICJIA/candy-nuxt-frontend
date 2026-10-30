<script setup lang="ts">
const technologies = await useContent<Technology[]>('content/technologies')

useSeoMeta({ title: 'Technologies' })
</script>

<template>
  <h1>Technologies</h1>
  <div v-if="technologies.length" class="grid">
    <ContentCard
      v-for="technology in technologies"
      :key="technology.documentId"
      :title="technology.Name"
      :to="technology.slug ? `/technologies/${technology.slug}` : null"
      :cover="technology.Cover"
      :excerpt="blocksExcerpt(technology.Description)"
    />
  </div>
  <p v-else class="muted">
    No technologies published yet.
  </p>
</template>
