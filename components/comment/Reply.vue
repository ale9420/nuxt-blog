<template>
  <form @submit.prevent>
    <FormInput
      :placeholder="$t('global.comment')"
      type="text"
      name="content"
      component="textarea"
    />
    <div class="flex gap-2 mt-3">
      <UiButton
        :disabled="isSubmitting"
        :is-loading="isSubmitting"
        type="button"
        @click="$emit('cancel')"
      >
        {{ $t('global.cancel') }}
      </UiButton>
      <UiButton
        :disabled="!meta.valid || isSubmitting"
        :is-loading="isSubmitting"
        type="button"
        @click="onSubmit"
      >
        {{ $t('global.postComment') }}
      </UiButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
import * as yup from 'yup'

type UpdateCommentProps = {
  postId: string
  threadOf: string
  content: string
}

const props = defineProps<UpdateCommentProps>()
const emit = defineEmits(['cancel', 'update'])

const { postComment } = useCommentStore()
const { t } = useI18n()
const { meta, handleSubmit, isSubmitting, resetForm, setFieldValue } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      content: yup.string().required(t('validations.required')),
    })
  ),
})

const onSubmit = handleSubmit(async ({ content }) => {
  await postComment({ content, relation: props.postId })
  resetForm()
  emit('update')
})

onMounted(() => {
  setFieldValue('content', props.content)
})
</script>
