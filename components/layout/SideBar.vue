<template>
  <div
    class="flex flex-col absolute top-0 left-0 backdrop-blur-sm bg-slate-600/50 h-screen drop-shadow-lg overscroll-none dark:bg-slate-800/75 sm:w-3/5 md:w-1/2 z-50 p-5"
    :class="{ hidden: !open }"
  >
    <div class="flex justify-between">
      <h3 class="text-slate-50 text-xl">BOG.DEV</h3>
      <XCircleIcon
        class="size-6 text-neutral-50 cursor-pointer"
        @click="$emit('close')"
      />
    </div>
    <hr class="w-full" />

    <div class="flex flex-col justify-between h-full text-slate-50 mt-3">
      <LayoutMenuNavigation
        class="flex flex-col"
        :pages="pages"
        @click="$emit('close')"
      />
      <FormSelect
        v-model="languageModel"
        property="value"
        label="label"
        name="language"
        return-mode="object"
        :options="languages"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { XCircleIcon } from '@heroicons/vue/20/solid'
import type { Language } from '~/types'

type SideBarProps = {
  open: boolean
}

const emit = defineEmits(['close'])
defineProps<SideBarProps>()

const languageStore = useLanguageStore()
const { pages } = await usePages()
const { locale, languages } = storeToRefs(languageStore)

const languageModel = defineModel<Language>('language', {
  async set(value) {
    await languageStore.updateLanguage(value)
    emit('close')
  },
})

onBeforeMount(() => {
  languageModel.value = languages.value.find((i) => i.value === locale.value)
})
</script>
