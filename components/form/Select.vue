<template>
  <div>
    <select
      v-model="internalValue"
      class="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
