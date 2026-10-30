<script setup lang="ts">
const links = [
  { to: '/sciences', label: 'Sciences' },
  { to: '/technologies', label: 'Technologies' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
]
</script>

<template>
  <PreviewBanner />
  <header class="site-header">
    <div class="container site-header-inner">
      <NuxtLink to="/" class="brand">
        Candy
      </NuxtLink>
      <nav aria-label="Main">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to">
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
  <main class="container site-main">
    <slot />
  </main>
  <footer class="site-footer">
    <div class="container">
      Content managed with Strapi
    </div>
  </footer>
</template>
