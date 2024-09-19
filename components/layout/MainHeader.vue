<template>
  <header
    class="sticky relative top-0 flex flex-col items-center justify-center text-zinc-800 bg-neutral-50 shadow-lg shadow-slate-300/50 dark:bg-slate-900/75 dark:text-slate-50 dark:shadow-slate-800/50 sm:p-3 lg:p-5 w-full z-10"
  >
    <NuxtLink class="text-3xl font-bold" to="/">BOG.DEV</NuxtLink>
    <span class="text-xs">{{ $t('meta.blogCategory') }}</span>
    <div v-click-outside="closeSideBar" class="lg:hidden">
      <Bars3Icon class="lg:hidden size-6" @click="openSidebar = true" />
      <LayoutSideBar :open="openSidebar" @close="openSidebar = false" />
    </div>

    <div
      class="sm:hidden lg:flex lg:items-center mt-3 pt-2 border-t border-zinc-500"
    >
      <LayoutMenuNavigation class="flex" :pages="pages" />
      <FormSelect
        v-model="languageModel"
        class="pl-2"
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
import type { Language, PageEntityResponseCollection } from '@/types'
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
