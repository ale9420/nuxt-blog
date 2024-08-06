<template>
  <div
    class="grid bg-slate-200/50 dark:bg-slate-800/50 rounded-md border border-slate-500"
  >
    <ChevronDownIcon
      class="pointer-events-none z-10 right-1 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden"
    />
    <select
      class="appearance-none min-w-20 backdrop-blur-sm bg-slate-200/50 dark:bg-slate-800/50 rounded-md row-start-1 col-start-1 text-sm p-2"
      :name="name"
      :modelValue="modelValue"
      @input="onUpdate"
    >
      <option
        v-for="lang in options"
        :key="lang[property]"
        :value="lang[property]"
      >
        {{ lang[label] }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ChevronDownIcon } from '@heroicons/vue/16/solid'

// interface SelectProps<T, K extends keyof T> {
//   options: T[]
//   key: K
//   label: K
//   modelValue: string
// }

type SelectProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[]
  property: string
  modelValue: string
  label: string
  name: string
}

defineProps<SelectProps>()

const emit = defineEmits(['update:modelValue'])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onUpdate = (event: any) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style></style>
