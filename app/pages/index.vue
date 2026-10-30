<script setup lang="ts">
const [{ data: homepage }, sciences, technologies] = await Promise.all([
  useHomepage(),
  useContent<Science[]>('content/sciences'),
  useContent<Technology[]>('content/technologies'),
])

// The home page title is the SEO title on its own, without the " · Site name" suffix
useSeoMeta({
  title: () => homepage.value?.defaultSeo?.metaTitle ?? homepage.value?.SiteName ?? 'Candy',
  titleTemplate: '%s',
})
</script>

<template>
  <section class="hero">
    <h1>{{ homepage?.SiteName ?? 'Candy' }}</h1>
    <div v-if="homepage?.siteDecription" class="prose hero-intro">
      <StrapiBlocks :blocks="homepage.siteDecription" />
    </div>
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
        :excerpt="blocksExcerpt(science.Description)"
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
        :excerpt="blocksExcerpt(technology.Description)"
      />
    </div>
    <p v-else class="muted">
      No technologies published yet.
    </p>
  </section>
</template>
