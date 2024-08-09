<template>
  <header
    class="sticky relative top-0 flex items-center justify-between text-slate-700 backdrop-blur-sm bg-slate-200/50 shadow-lg shadow-slate-300/50 dark:bg-slate-900/75 dark:text-slate-50 dark:shadow-slate-800/50 sm:p-3 lg:p-5 w-full z-10"
  >
    <div v-click-outside="closeSideBar" class="lg:hidden">
      <Bars3Icon class="lg:hidden size-6" @click="openSidebar = true" />
      <LayoutSideBar :open="openSidebar" @close="openSidebar = false" />
    </div>

    <h3 class="text-xl">BOG.DEV</h3>
    <div class="sm:hidden lg:flex">
      <LayoutMenuNavigation class="flex" :pages="pages" />
      <FormSelect
        v-model="languageModel"
        property="value"
        label="label"
        name="language"
        return-mode="object"
        :options="languages"
      />
    </div>
  </header>
</template>

<script lang="ts" setup>
import type { Language, PageEntityResponseCollection } from '~/types'
import { Bars3Icon } from '@heroicons/vue/16/solid'
import pagesQuery from '@/graphql/queries/pages-header-list.gql'

const openSidebar = ref(false)
const graphql = useStrapiGraphQL()
const result = await graphql<PageEntityResponseCollection>(pagesQuery)
const pages = result.data.pages.data
const languageStore = useLanguageStore()
const { locale, languages } = storeToRefs(languageStore)
const languageModel = defineModel<Language>('language', {
  async set(value) {
    await languageStore.updateLanguage(value)
  },
})

const closeSideBar = () => {
  openSidebar.value = false
}

onBeforeMount(() => {
  languageModel.value = languages.value.find((i) => i.value === locale.value)
})
</script>
