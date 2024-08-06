<template>
  <nav>
    <NuxtLink
      :to="localePath('/')"
      class="hover:underline hover:underline-offset-4 hover:cursor-pointer hover:text-red-600 p-2"
      @click="$emit('click')"
      >{{ $t('global.home') }}</NuxtLink
    >
    <NuxtLink
      v-for="page in pages"
      :key="page.id"
      :to="
        localePath({
          name: 'page-slug',
          params: { slug: page.attributes.meta.slug },
        })
      "
      class="hover:underline hover:underline-offset-4 hover:cursor-pointer hover:text-red-600 p-2"
      @click="$emit('click')"
    >
      {{ page.attributes.title }}</NuxtLink
    >
  </nav>
</template>

<script lang="ts" setup>
import type { PageEntity } from '@/types'

type PagesProps = {
  pages: PageEntity[]
}

const localePath = useLocalePath()

defineEmits(['click'])
defineProps<PagesProps>()
</script>

<style></style>
