<template>
  <UiPopOver id="loginLink" ref="popover" :is-visible="openPopOver">
    <template #trigger="{ toggle }">
      <button
        v-if="!user"
        class="hover:underline hover:underline-offset-4 hover:cursor-pointer hover:text-red-600 p-2"
        data-popover-target="loginLink"
        type="button"
        @click="toggle"
      >
        {{ $t('global.login') }}
      </button>
    </template>
    <form class="flex flex-col gap-2 bg-neutral-50 p-3" @submit.prevent>
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
      <UiButton class="w-full" :disabled="!meta.valid" @click="onSubmit">{{
        $t('global.login')
      }}</UiButton>
    </form>
  </UiPopOver>
</template>

<script lang="ts" setup>
import * as yup from 'yup'
import type PopOver from '../ui/PopOver.vue'

const popover = ref<InstanceType<typeof PopOver>>()
const { login } = useStrapiAuth()
const { addToast } = useToastStore()
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
  try {
    await login({
      identifier: identifier.value as string,
      password: password.value as string,
    })

    popover?.value?.hide()
  } catch (error) {
    addToast({
      title: 'Error de autenticacion',
      description: 'Usuario o contraseña no validos',
      status: 'error',
      timeout: 9000,
    })
    console.log(error)
  }
})
</script>
