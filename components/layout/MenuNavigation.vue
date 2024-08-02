<template>
  <div>
    <NuxtLink
      @click="$emit('click')"
      to="/"
      class="hover:underline hover:underline-offset-4 hover:cursor-pointer p-2"
      >Home</NuxtLink
    >
    <NuxtLink
      v-for="page in pages"
      @click="$emit('click')"
      :key="page.id"
      :to="{ name: 'page-slug', params: { slug: page.attributes.meta.slug } }"
      class="hover:underline hover:underline-offset-4 hover:cursor-pointer p-2"
      >{{ page.attributes.title }}</NuxtLink
    >
  </div>
</template>

<script lang="ts" setup>
import type { PageEntity } from '@/types'

type PagesProps = {
  pages: PageEntity[]
}

defineProps<PagesProps>()
</script>

<style></style>
