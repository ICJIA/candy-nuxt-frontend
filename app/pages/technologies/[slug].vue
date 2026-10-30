<script setup lang="ts">
const route = useRoute('technologies-slug')
const technology = await useContent<Technology>(`content/technologies/${route.params.slug}`)

useSeoMeta({ title: () => technology.value.Name })
</script>

<template>
  <article class="article">
    <NuxtLink to="/technologies" class="back">
      ← All technologies
    </NuxtLink>
    <h1>{{ technology.Name }}</h1>
    <figure v-if="technology.Cover" class="cover">
      <StrapiMedia :media="technology.Cover" eager />
    </figure>
    <div class="prose">
      <StrapiBlocks :blocks="technology.Description" />
    </div>
  </article>
</template>
