<template>
  <UiDialog ref="dialog" size="medium" show-icon>
    <template #icon>
      <LockClosedIcon class="size-14" />
    </template>
    <Form
      v-slot="{ meta, handleSubmit }"
      :validation-schema="validationSchema"
      class="flex flex-col gap-2"
      autocomplete="off"
    >
      <h1 class="self-center text-5xl font-light mt-3 mb-6">
        {{ $t('auth.loginNow') }}
      </h1>
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
        class="w-full mt-6"
        type="button"
        :disabled="!meta.valid"
        @click="handleSubmit((values: LoginForm) => onSubmit(values))"
        >{{ $t('global.login') }}</UiButton
      >
      <div class="flex justify-between">
        <UiLink to="/auth/create-user">{{ $t('auth.noAccount') }}</UiLink>
        <UiLink>{{ $t('auth.forgotPassword') }}</UiLink>
      </div>
    </Form>
  </UiDialog>
</template>

<script lang="ts" setup>
import * as yup from 'yup'
import type Dialog from '../ui/Dialog.vue'
import type { LoginForm, LoginError } from '@/types'
import { LockClosedIcon } from '@heroicons/vue/20/solid'

const dialog = ref<InstanceType<typeof Dialog>>()
const { t } = useI18n()
const { login } = useStrapiAuth()
const { addToast } = useToastStore()
const user = useStrapiUser()

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

    dialog?.value?.hide()
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
  dialog.value?.show()
}

onBeforeUnmount(() => {
  dialog.value?.hide()
})

defineExpose({ showModal })
</script>
