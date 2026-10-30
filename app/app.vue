<script setup lang="ts">
useHead({
  titleTemplate: (title) => (title ? `${title} · Candy` : 'Candy'),
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
