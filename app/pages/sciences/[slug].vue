<script setup lang="ts">
const route = useRoute('sciences-slug')
const science = await useContent<Science>(`content/sciences/${route.params.slug}`)

useSeoMeta({ title: () => science.value.Name })
</script>

<template>
  <article class="article">
    <NuxtLink to="/sciences" class="back">
      ← All sciences
    </NuxtLink>
    <h1>{{ science.Name }}</h1>
    <ul v-if="science.categories?.length" class="tags">
      <li v-for="category in science.categories" :key="category.documentId">
        <NuxtLink v-if="category.slug" :to="`/categories/${category.slug}`">
          {{ category.Name }}
        </NuxtLink>
        <template v-else>
          {{ category.Name }}
        </template>
      </li>
    </ul>
    <figure v-if="science.Cover" class="cover">
      <StrapiMedia :media="science.Cover" eager />
    </figure>
    <div class="prose">
      <StrapiBlocks :blocks="science.Description" />
    </div>
  </article>
</template>
