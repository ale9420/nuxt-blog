<template>
  <div>
    <UiPopOver id="loginLink" ref="popover" :is-visible="openPopOver">
      <template #trigger>
        <button
          v-if="!user"
          class="hover:underline hover:underline-offset-4 hover:cursor-pointer hover:text-red-600 p-2"
          popovertarget="loginLink"
          popovertargetaction="toggle"
          type="button"
          @click="openPopOver = true"
        >
          {{ $t('global.login') }}
        </button>
      </template>
      <form class="flex flex-col gap-2 bg-neutral-50 p-2" @submit.prevent>
        <FormInput
          v-model="identifier"
          v-bind="identifierAttrs"
          placeholder="Username"
          type="text"
        />
        <FormInput
          v-model="password"
          v-bind="passwordAttrs"
          placeholder="Password"
          type="password"
        />
        <UiButton :disabled="!meta.valid" @click="onSubmit">{{
          $t('global.login')
        }}</UiButton>
      </form>
    </UiPopOver>
  </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup'
import type PopOver from '../ui/PopOver.vue'

const popover = ref<InstanceType<typeof PopOver>>()
const { login } = useStrapiAuth()
const user = useStrapiUser()
const openPopOver = ref(false)

const { meta, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      identifier: yup.string().required(),
      password: yup.string().required(),
    })
  ),
})

const [identifier, identifierAttrs] = defineField('identifier')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async () => {
  await login({
    identifier: identifier.value as string,
    password: password.value as string,
  })

  popover?.value?.hide()
})
</script>
