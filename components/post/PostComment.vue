<template>
  <div
    class="flex flex-col bg-gradient-to-r from-neutral-200 via-zinc-200 to-gray-200 w-full p-3 rounded-md"
  >
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
        @click="postComment"
      >
        {{ $t('global.postComment') }}
      </UiButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup'
import CreateComment from '@/graphql/mutations/createComment.gql'

const emit = defineEmits(['refreshComments'])
const graphql = useStrapiGraphQL()
const postStore = usePostStore()
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

const postComment = handleSubmit(async ({ comment }) => {
  try {
    await graphql(CreateComment, {
      comment: {
        content: comment,
        relation: `api::post.post:${post.value?.id}`,
      },
    })
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
