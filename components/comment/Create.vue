<template>
  <div class="flex flex-col bg-neutral-200 w-full p-3 rounded-md">
    <form autocomplete="off" @submit.prevent>
      <FormInput
        name="comment"
        :placeholder="$t('global.comment')"
        component="textarea"
      />
      <UiButton
        class="mt-3 w-full"
        :disabled="!meta.valid || isSubmitting"
        :is-loading="isSubmitting"
        type="button"
        @click="onSubmit"
      >
        {{ $t('global.postComment') }}
      </UiButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup'

const emit = defineEmits(['refreshComments'])
const postStore = usePostStore()
const { postComment } = useCommentStore()
const { addToast } = useToastStore()
const { postBySlug: post } = storeToRefs(postStore)
const { t } = useI18n()
const { meta, handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      comment: yup.string().required(t('validations.required')),
    })
  ),
})

const onSubmit = handleSubmit(async ({ comment }) => {
  try {
    await postComment({ content: comment, relation: post.value?.id as string })
    resetForm()
    emit('refreshComments')
  } catch {
    addToast({
      title: 'Error',
      description: t('global.requestError'),
      timeout: 2000,
      status: 'error',
    })
  }
})
</script>
