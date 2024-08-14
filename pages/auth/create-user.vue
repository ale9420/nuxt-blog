<template>
  <div class="container">
    <form class="flex flex-col gap-3" @submit.prevent>
      <input
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        name="email"
        placeholder="Email"
        class="p-3"
      />
      <input
        v-model="username"
        v-bind="usernameAttrs"
        type="text"
        name="username"
        placeholder="Username"
        class="p-3"
      />
      <input
        v-model="phoneNumber"
        v-bind="phoneNumberAttrs"
        type="phone"
        name="phone"
        placeholder="Phone number"
        class="p-3"
      />
      <input
        v-model="password"
        v-bind="passwordAttrs"
        type="text"
        name="password"
        placeholder="Password"
        class="p-3"
      />
      <button
        class="bg-red-500 disabled:bg-gray-300 disabled:text-gray-500 p-3"
        :disabled="!meta.valid"
        @click="onSubmit"
      >
        Crear
      </button>
      <pre>{{ meta }}</pre>
    </form>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { useForm } from 'vee-validate'

const { t } = useI18n()
const { addToast } = useToastStore()
const { register } = useStrapiAuth()
const { meta, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().required().email(),
      username: yup.string().required(),
      password: yup.string().required(),
      phoneNumber: yup.string().required(),
    })
  ),
})

const [email, emailAttrs] = defineField('email')
const [username, usernameAttrs] = defineField('username')
const [password, passwordAttrs] = defineField('password')
const [phoneNumber, phoneNumberAttrs] = defineField('phoneNumber')

const onSubmit = handleSubmit(async (values) => {
  await register(values)
  addToast({
    title: t('global.success'),
    description: t('global.auth.createdAccount'),
    timeout: 2000,
    status: 'success',
  })
  console.log(values)
})

definePageMeta({
  middleware: 'user-register',
})
</script>
