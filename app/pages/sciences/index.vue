<script setup lang="ts">
const sciences = await useContent<Science[]>('content/sciences')

useSeoMeta({ title: 'Sciences' })
</script>

<template>
  <h1>Sciences</h1>
  <div v-if="sciences.length" class="grid">
    <ContentCard
      v-for="science in sciences"
      :key="science.documentId"
      :title="science.Name"
      :to="science.slug ? `/sciences/${science.slug}` : null"
      :cover="science.Cover"
      :excerpt="blocksExcerpt(science.Description)"
    >
      <ul v-if="science.categories?.length" class="tags">
        <li v-for="category in science.categories" :key="category.documentId">
          {{ category.Name }}
        </li>
      </ul>
    </ContentCard>
  </div>
  <p v-else class="muted">
    No sciences published yet.
  </p>
</template>
