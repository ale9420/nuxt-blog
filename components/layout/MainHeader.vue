<template>
  <header
    class="sticky relative top-0 flex items-center justify-between sm:p-3 lg:p-5 w-full z-10 text-slate-700 backdrop-blur-sm bg-slate-200/50 shadow-lg shadow-slate-300/50"
  >
    <div v-click-outside="closeSideBar" class="lg:hidden">
      <Bars3Icon class="lg:hidden size-6" @click="openSidebar = true" />
      <LayoutSideBar :open="openSidebar" @close="openSidebar = false" />
    </div>

    <h3 class="text-xl">BOG.DEV</h3>
    <div class="sm:hidden lg:flex">
      <FormSelect
        v-model="languageModel"
        property="value"
        label="label"
        class="bg-slate-200/50 hover:underline hover:underline-offset-4 hover:cursor-pointer"
        name="language"
        :options="languages"
      />
      <LayoutMenuNavigation class="flex" :pages="pages" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import type { Locale, PageEntityResponseCollection } from '~/types'
import { Bars3Icon } from '@heroicons/vue/16/solid'
import pagesQuery from '@/graphql/queries/pages.gql'

const openSidebar = ref(false)
const graphql = useStrapiGraphQL()
const result = await graphql<PageEntityResponseCollection>(pagesQuery)
const pages = result.data.pages.data
const { languages, updateLanguage } = useLanguageStore()
const languageModel = defineModel('language', {
  type: String,
  default: 'es',
  async set(value) {
    await updateLanguage(value as Locale)
  },
})

const closeSideBar = () => {
  openSidebar.value = false
}
</script>
