<template>
  <input v-model="internalValue" class="p-2 rounded-md bg-slate-300" />
</template>

<script lang="ts" setup>
type InputProps = {
  modelValue: string | number | undefined
}

const props = defineProps<InputProps>()
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
