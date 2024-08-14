<template>
  <header
    class="sticky relative top-0 flex items-center justify-between text-slate-700 bg-slate-200 shadow-lg shadow-slate-300/50 dark:bg-slate-900/75 dark:text-slate-50 dark:shadow-slate-800/50 sm:p-3 lg:p-5 w-full z-10"
  >
    <div v-click-outside="closeSideBar" class="lg:hidden">
      <Bars3Icon class="lg:hidden size-6" @click="openSidebar = true" />
      <LayoutSideBar :open="openSidebar" @close="openSidebar = false" />
    </div>

    <div class="sm:hidden lg:flex lg:items-center gap-3">
      <h3 class="text-xl font-semibold">BOG.DEV</h3>
      <LayoutMenuNavigation class="flex" :pages="pages" />
    </div>

    <div class="sm:hidden lg:flex lg:items-center">
      <div>
        <button
          v-if="!user"
          id="loginLink"
          type="button"
          class="hover:underline hover:underline-offset-4 hover:cursor-pointer hover:text-red-600 p-2"
          @click="openPopOver = true"
        >
          {{ $t('global.login') }}
        </button>
        <UiPopOver id="loginLink" :is-visible="openPopOver" class="w-64">
          <form class="bg-neutral-50 p-2" @submit.prevent>
            <input placeholder="Username" type="text" />
            <input placeholder="Password" type="text" />
          </form>
        </UiPopOver>
      </div>

      <NuxtLink
        v-if="!user"
        to="/auth/create-user"
        class="bg-gradient-to-r from-red-500 to-red-700 text-slate-50 mx-2 p-2 rounded-md"
        >{{ $t('global.signUp') }}</NuxtLink
      >
      <span
        v-if="user"
        class="hover:underline hover:underline-offset-4 hover:cursor-pointer hover:text-red-600 p-2"
        @click="logout"
        >{{ $t('global.logout') }}</span
      >
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

const user = useStrapiUser()
const openSidebar = ref(false)
const openPopOver = ref(false)
const graphql = useStrapiGraphQL()
const result = await graphql<PageEntityResponseCollection>(pagesQuery)
const pages = result.data.pages.data
const languageStore = useLanguageStore()
const { locale, languages } = storeToRefs(languageStore)
const { logout } = useStrapiAuth()
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
