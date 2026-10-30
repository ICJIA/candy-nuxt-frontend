<script setup lang="ts">
const [sciences, technologies] = await Promise.all([
  useContent<Science[]>('content/sciences'),
  useContent<Technology[]>('content/technologies'),
])

useSeoMeta({ title: '', description: 'Sciences and technologies, managed in Strapi.' })
</script>

<template>
  <section class="hero">
    <h1>Explore sciences and technologies</h1>
    <p class="muted">
      Everything on this site is published from the Strapi admin.
    </p>
  </section>

  <section class="section">
    <div class="section-head">
      <h2>Sciences</h2>
      <NuxtLink to="/sciences">
        View all
      </NuxtLink>
    </div>
    <div v-if="sciences.length" class="grid">
      <ContentCard
        v-for="science in sciences.slice(0, 6)"
        :key="science.documentId"
        :title="science.Name"
        :to="science.slug ? `/sciences/${science.slug}` : null"
        :cover="science.Cover"
      />
    </div>
    <p v-else class="muted">
      No sciences published yet.
    </p>
  </section>

  <section class="section">
    <div class="section-head">
      <h2>Technologies</h2>
      <NuxtLink to="/technologies">
        View all
      </NuxtLink>
    </div>
    <div v-if="technologies.length" class="grid">
      <ContentCard
        v-for="technology in technologies.slice(0, 6)"
        :key="technology.documentId"
        :title="technology.Name"
        :to="technology.slug ? `/technologies/${technology.slug}` : null"
        :cover="technology.Cover"
      />
    </div>
    <p v-else class="muted">
      No technologies published yet.
    </p>
  </section>
</template>
