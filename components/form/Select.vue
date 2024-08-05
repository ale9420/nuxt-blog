<template>
  <select :name="name" :modelValue="modelValue" @input="onUpdate">
    <option
      v-for="lang in options"
      :key="lang[property]"
      :value="lang[property]"
    >
      {{ lang[label] }}
    </option>
  </select>
</template>

<script lang="ts" setup>
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
