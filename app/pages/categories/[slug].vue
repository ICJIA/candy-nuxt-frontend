<script setup lang="ts">
const route = useRoute('categories-slug')
const category = await useContent<Category>(`content/categories/${route.params.slug}`)

useSeoMeta({ title: () => category.value.Name })
</script>

<template>
  <NuxtLink to="/categories" class="back">
    ← All categories
  </NuxtLink>
  <h1>{{ category.Name }}</h1>
  <div v-if="category.sciences?.length" class="grid">
    <ContentCard
      v-for="science in category.sciences"
      :key="science.documentId"
      :title="science.Name"
      :to="science.slug ? `/sciences/${science.slug}` : null"
      :cover="science.Cover"
    />
  </div>
  <p v-else class="muted">
    No sciences in this category yet.
  </p>
</template>
