<template>
  <nav>
    <UiLink :to="localePath('/')" @click="$emit('click')">
      {{ $t('global.home') }}
    </UiLink>
    <UiLink
      v-for="page in pages"
      :key="page.id"
      :to="
        localePath({
          name: 'page-slug',
          params: { slug: page.attributes.slug },
        })
      "
      @click="$emit('click')"
    >
      {{ page.attributes.title }}</UiLink
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
