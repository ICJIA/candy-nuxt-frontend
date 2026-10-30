<script setup lang="ts">
const about = await useContent<About>('about')

useSeoMeta({ title: () => about.value.Name })
</script>

<template>
  <article class="article">
    <h1>{{ about.Name }}</h1>
    <div class="prose">
      <StrapiBlocks :blocks="about.Decription" />
    </div>
  </article>
</template>
