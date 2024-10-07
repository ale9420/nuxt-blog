<template>
  <Field
    v-slot="{ field, meta, value, errorMessage }"
    :name="name"
    :type="type"
    as="div"
    class="w-full border-stone-600 text-stone-600 flex flex-col"
    validate-on-input
  >
    <Transition>
      <label
        v-if="value && value?.toString()?.length > 0"
        :for="name"
        :class="{
          'text-red-600': !meta.valid && meta.dirty && !meta.pending,
          'text-stone-600': meta.valid && !meta.pending,
        }"
        class="transition duration-300 ease-in-out text-left"
      >
        {{ placeholder }}
      </label>
    </Transition>

    <div class="relative">
      <component
        :is="fieldComponent"
        v-bind="{ ...field, ...filteredAtts }"
        class="pb-1 bg-transparent border-b-2 w-full transition focus:outline-none"
        :class="{
          'border-red-600': !meta.valid && !meta.pending && meta.touched,
          'placeholder:text-red-600':
            !meta.valid && meta.touched && !meta.pending,
          'border-stone-600': !meta.touched || meta.valid,
          'placeholder:text-stone-600': !meta.touched || meta.valid,
        }"
        :type="type"
        :placeholder="placeholder"
      />
      <div
        v-if="$attrs['type'] === 'password'"
        class="absolute bottom-0 right-1"
      >
        <button
          v-if="hidePassword"
          type="button"
          @click.stop="hidePassword = false"
        >
          <EyeIcon class="size-5" />
        </button>
        <button v-else type="button" @click.stop="hidePassword = true">
          <EyeSlashIcon class="size-5" />
        </button>
      </div>
    </div>
    <Transition>
      <span v-if="errorMessage !== ''" class="text-red-500 text-sm text-left">{{
        errorMessage
      }}</span>
    </Transition>
  </Field>
</template>

<script lang="ts" setup>
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/20/solid'
import type { InputTypeHTMLAttribute } from 'vue'

type InputProps = {
  placeholder: string
  name: string
  component?: 'input' | 'textarea'
}

const props = defineProps<InputProps>()
const attrs = useAttrs()
const hidePassword = ref(true)
const type = computed(() =>
  attrs['type'] !== 'password'
    ? (attrs['type'] as InputTypeHTMLAttribute)
    : hidePassword.value
      ? 'password'
      : 'text'
)

const fieldComponent = computed(() =>
  props.component ? props.component : 'input'
)

const filteredAtts = computed(() => {
  console.log(attrs)
  type FilteredAttrs = Omit<typeof attrs, 'class'>
  const filteredAttrs = attrs as FilteredAttrs
  console.log(filteredAttrs)
  return filteredAttrs
})

defineOptions({
  inheritAttrs: false,
})
</script>
