<template>
  <div
    class="flex flex-col bg-gradient-to-r from-neutral-200 via-zinc-200 to-gray-200 w-full p-3 roundend-md"
  >
    <Form v-slot="{ meta, handleSubmit }" :validation-schema="validationSchema">
      <FormInput
        name="comment"
        :placeholder="$t('global.comment')"
        component="textarea"
      />
      <UiButton
        class="mt-3 w-full"
        :disabled="!meta.valid"
        type="button"
        @click="
          handleSubmit((e: CommentForm, { resetForm }: any) =>
            postComment(e, resetForm)
          )
        "
      >
        {{ $t('global.postComment') }}
      </UiButton>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup'
import CreateComment from '@/graphql/mutations/createComment.gql'
import type { CommentForm } from '~/types'

const emit = defineEmits(['refreshComments'])
const graphql = useStrapiGraphQL()
const postStore = usePostStore()
const { postBySlug: post } = storeToRefs(postStore)
const { t } = useI18n()
const validationSchema = toTypedSchema(
  yup.object({
    comment: yup.string().required(t('validations.required')),
  })
)

const postComment = async ({ comment }: CommentForm, resetForm: () => void) => {
  await graphql(CreateComment, {
    comment: {
      content: comment,
      relation: `api::post.post:${post.value?.id}`,
    },
  })
  resetForm()
  emit('refreshComments')
}
</script>
