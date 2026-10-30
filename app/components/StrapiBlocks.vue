<script setup lang="ts">
// Renders content from a Strapi "blocks" (rich text) field
defineProps<{ blocks: BlockNode[] | null | undefined }>()

const mediaUrl = useStrapiMedia()
</script>

<template>
  <template v-for="(block, i) in blocks ?? []" :key="i">
    <component :is="`h${block.level}`" v-if="block.type === 'heading'">
      <StrapiInline :nodes="block.children" />
    </component>

    <component :is="block.format === 'ordered' ? 'ol' : 'ul'" v-else-if="block.type === 'list'">
      <template v-for="(item, j) in block.children" :key="j">
        <StrapiBlocks v-if="item.type === 'list'" :blocks="[item]" />
        <li v-else>
          <StrapiInline :nodes="item.children" />
        </li>
      </template>
    </component>

    <blockquote v-else-if="block.type === 'quote'">
      <StrapiInline :nodes="block.children" />
    </blockquote>

    <pre v-else-if="block.type === 'code'"><code>{{ block.children.map((c) => c.text).join('') }}</code></pre>

    <img
      v-else-if="block.type === 'image'"
      :src="mediaUrl(block.image.url)"
      :alt="block.image.alternativeText ?? ''"
      :width="block.image.width ?? undefined"
      :height="block.image.height ?? undefined"
      loading="lazy"
    >

    <p v-else>
      <StrapiInline :nodes="block.children" />
    </p>
  </template>
</template>
