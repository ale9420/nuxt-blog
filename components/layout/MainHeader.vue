<template>
  <header
    class="sticky top-0 flex items-center justify-between sm:p-3 lg:p-5 bg-gradient-to-r from-red-600 to-red-400 w-full z-10"
  >
    <Bars3Icon class="lg:hidden size-6 text-neutral-50" />
    <h3 class="text-slate-50 text-xl">BOG.DEV</h3>
    <div class="sm:hidden lg:flex">
      <NuxtLink
        to="/"
        class="text-slate-50 hover:underline hover:underline-offset-4 hover:cursor-pointer p-2"
        >Home</NuxtLink
      >
      <NuxtLink
        v-for="page in pages"
        :key="page.id"
        :to="{ name: 'page-slug', params: { slug: page.attributes.meta.slug } }"
        class="text-slate-50 hover:underline hover:underline-offset-4 hover:cursor-pointer p-2"
        >{{ page.attributes.title }}</NuxtLink
      >
    </div>
  </header>
</template>

<script lang="ts" setup>
import type { PageEntityResponseCollection } from '~/types'
import { Bars3Icon } from '@heroicons/vue/16/solid'
import pagesQuery from '@/graphql/queries/pages.gql'

const graphql = useStrapiGraphQL()
const result = await graphql<PageEntityResponseCollection>(pagesQuery)
const pages = result.data.pages.data
</script>
