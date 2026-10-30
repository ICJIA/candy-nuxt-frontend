<script setup lang="ts">
const NuxtLink = resolveComponent('NuxtLink')
const categories = await useContent<Category[]>('content/categories')

useSeoMeta({ title: 'Categories' })
</script>

<template>
  <h1>Categories</h1>
  <ul v-if="categories.length" class="category-list">
    <li v-for="category in categories" :key="category.documentId">
      <component
        :is="category.slug ? NuxtLink : 'div'"
        :to="category.slug ? `/categories/${category.slug}` : undefined"
        class="category-row"
      >
        <span>{{ category.Name }}</span>
        <span class="muted">{{ category.sciences?.length ?? 0 }} sciences</span>
      </component>
    </li>
  </ul>
  <p v-else class="muted">
    No categories published yet.
  </p>
</template>
