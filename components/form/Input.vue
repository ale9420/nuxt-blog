<template>
  <Field
    v-slot="{ field, meta, value, errorMessage }"
    :name="name"
    :type="type"
    as="div"
    class="w-full flex flex-col border-stone-600 text-stone-600 dark:border-stone-200 dark:text-stone-200"
    validate-on-input
  >
    <Transition>
      <label
        v-if="value && value?.toString()?.length > 0"
        :for="name"
        :class="{
          'text-red-600 dark:text-red-400':
            !meta.valid && meta.dirty && !meta.pending,
          'text-stone-600 dark:text-stone-100': meta.valid && !meta.pending,
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
          'border-red-600 dark:border-red-400':
            !meta.valid && meta.dirty && !meta.pending,
          'placeholder:text-red-600 dark:placeholder:text-red-400':
            !meta.valid && meta.dirty && !meta.pending,
          'border-stone-600 dark:border-stone-200':
            (meta.valid && !meta.pending) || (!meta.valid && !meta.dirty),
          'placeholder:text-stone-600 dark:placeholder:text-stone-200':
            !meta.dirty || meta.valid,
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
      <span
        v-if="errorMessage !== ''"
        class="text-red-500 dark:text-red-400 text-xs text-left"
        >{{ errorMessage }}</span
      >
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

type Attributes = Record<string, unknown> & { class?: string }

const props = defineProps<InputProps>()
const attrs: Attributes = useAttrs()
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
  const attributes = { ...attrs }
  if (attributes.class) delete attributes.class
  return attributes
})

defineOptions({
  inheritAttrs: false,
})
</script>
