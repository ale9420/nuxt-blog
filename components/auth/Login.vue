<template>
  <UiPopOver id="loginLink" ref="popover" :is-visible="openPopOver">
    <template #trigger="{ toggle }">
      <button
        v-if="!user"
        class="text-blue-400"
        popovertarget="loginLink"
        type="button"
        @click="toggle"
      >
        {{ $t('global.login') }}
      </button>
    </template>
    <Form
      v-slot="{ meta, handleSubmit }"
      :validation-schema="validationSchema"
      class="flex flex-col gap-2 bg-neutral-50 p-3"
      autocomplete="off"
    >
      <FormInput
        :placeholder="$t('auth.email')"
        name="identifier"
        type="text"
      />
      <FormInput
        :placeholder="$t('auth.password')"
        name="password"
        type="password"
      />
      <UiButton
        class="w-full mt-2"
        type="button"
        :disabled="!meta.valid"
        @click="handleSubmit((values) => onSubmit(values as LoginForm))"
        >{{ $t('global.login') }}</UiButton
      >
    </Form>
  </UiPopOver>
</template>

<script lang="ts" setup>
import * as yup from 'yup'
import type PopOver from '../ui/PopOver.vue'
import type { LoginForm, LoginError } from '@/types'

const popover = ref<InstanceType<typeof PopOver>>()
const { t } = useI18n()
const { login } = useStrapiAuth()
const { addToast } = useToastStore()
const user = useStrapiUser()
const openPopOver = ref(false)

const validationSchema = toTypedSchema(
  yup.object({
    identifier: yup
      .string()
      .email(t('validations.email'))
      .required(t('validations.required')),
    password: yup
      .string()
      .min(6, t('validations.min', { min: 6 }))
      .required(t('validations.required')),
  })
)

const onSubmit = async ({ identifier, password }: LoginForm) => {
  try {
    await login({
      identifier,
      password,
    })

    popover?.value?.hide()
    addToast({
      title: t('auth.welcomeTitle', {
        username: user.value?.username,
      }),
      status: 'success',
      timeout: 9000,
    })
  } catch (e) {
    const loginError = e as unknown as LoginError
    if (loginError.error.status === 400) {
      addToast({
        title: t('auth.unauthorizedTitle'),
        description: t('auth.unauthorizedDescription'),
        status: 'error',
        timeout: 9000,
      })
    }
  }
}

const showModal = () => {
  popover.value?.show()
}

defineExpose({ showModal })
</script>
