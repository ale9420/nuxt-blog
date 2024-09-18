<template>
  <div>
    <select
      v-model="internalValue"
      class="block w-full bg-inherit text-gray-900 cursor-pointer hover:border-b hover:border-red-600 hover:text-red-600 focus:ring-zinc-800 focus:border-zinc-800 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-zinc-800 dark:focus:border-zinc-400"
      :name="name"
    >
      <option
        v-for="option in options"
        :key="String(option[property as U])"
        :value="option"
      >
        {{ String(option[label as U]) }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" generic="T extends object, U extends keyof T" setup>
type SelectProps = {
  options: T[]
  property: U
  label: U
  modelValue: T | undefined
  name: string
  returnMode: 'value' | 'object'
}

const props = defineProps<SelectProps>()
const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>
