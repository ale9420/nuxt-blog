<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="container rounded-md overflow-hidden sm:flex sm:flex-col md:flex-row sm:my-3 lg:m-6 2xl:mx-auto"
  >
    <div
      class="bg-slate-700 text-neutral-50 py-5 px-8 prose dark:prose-invert sm:prose-sm 2xl:prose-xl prose-p:leading-normal prose-headings:text-neutral-50 prose-zinc grow basis-full"
    >
      <h1 class="uppercase text-center font-semibold">
        {{ $t('global.info') }}
      </h1>
      <p>{{ $t('auth.joinCommunityText') }}</p>
      <p class="font-bold">{{ $t('auth.userBenefits') }}</p>
      <ul>
        <li v-html="$t('auth.userBenefit1')"></li>
        <li v-html="$t('auth.userBenefit2')"></li>
        <li v-html="$t('auth.userBenefit3')"></li>
      </ul>
      <p class="font-bold">{{ $t('auth.steps') }}</p>
      <ul>
        <li v-html="$t('auth.step1')"></li>
        <li v-html="$t('auth.step2')"></li>
        <li v-html="$t('auth.step3')"></li>
      </ul>
    </div>
    <div class="py-5 px-8 bg-stone-200 flex items-center basis-full">
      <form
        class="flex flex-col gap-5 w-full"
        autocomplete="off"
        @submit.prevent
      >
        <h3
          class="sm:text-2xl text-slate-700 font-semibold text-center uppercase"
        >
          {{ $t('auth.registerForm') }}
        </h3>
        <FormInput type="email" name="email" :placeholder="$t('auth.email')" />
        <FormInput
          type="text"
          name="username"
          :placeholder="$t('auth.username')"
        />
        <FormInput
          type="password"
          name="password"
          :placeholder="$t('auth.password')"
        />
        <FormInput
          type="password"
          name="confirmPassword"
          :placeholder="$t('auth.confirmPassword')"
        />
        <UiButton
          class="mt-6"
          :disabled="!meta.valid"
          :is-loading="isSubmitting"
          @click="onSubmit"
        >
          Crear
        </UiButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import type { StrapiErrorResponse } from '~/types'

const { t } = useI18n()
const { addToast } = useToastStore()
const { register } = useStrapiAuth()
const { meta, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup
        .string()
        .required(t('validations.required'))
        .email(t('validations.email')),
      username: yup.string().required(t('validations.required')),
      password: yup.string().required(t('validations.required')),
      confirmPassword: yup
        .string()
        .required(t('validations.required'))
        .oneOf([yup.ref('password')], t('validations.matchPassword')),
    })
  ),
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await register(values)
    addToast({
      title: t('global.success'),
      description: t('global.auth.createdAccount'),
      timeout: 2000,
      status: 'success',
    })
  } catch (e) {
    const error = e as StrapiErrorResponse
    addToast({
      title: 'Error',
      description: error.error.message,
      timeout: 2000,
      status: 'error',
    })
  }
})

definePageMeta({
  middleware: 'user-register',
  layout: 'auth',
})

useSeoMeta({
  title: t('auth.registerForm'),
  description: t('auth.joinCommunityText'),
})
</script>
