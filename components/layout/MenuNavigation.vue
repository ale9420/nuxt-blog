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
    <UiLink v-if="user" @click="logout">
      {{ $t('global.logout') }}
    </UiLink>
  </nav>
</template>

<script lang="ts" setup>
import type { PageEntity } from '@/types'

type PagesProps = {
  pages: PageEntity[]
}

const user = useStrapiUser()
const { logout } = useStrapiAuth()
const localePath = useLocalePath()

defineEmits(['click'])
defineProps<PagesProps>()
</script>

<style></style>
