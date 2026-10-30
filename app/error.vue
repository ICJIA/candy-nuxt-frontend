<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

useHead({ title: props.error.statusCode === 404 ? 'Not found' : 'Error' })
</script>

<template>
  <NuxtLayout>
    <div class="error-page">
      <p class="eyebrow">
        {{ error.statusCode }}
      </p>
      <h1>{{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}</h1>
      <p v-if="error.statusCode !== 404" class="muted">
        {{ error.statusMessage || error.message }}
      </p>
      <button type="button" class="button" @click="clearError({ redirect: '/' })">
        Back to home
      </button>
    </div>
  </NuxtLayout>
</template>
