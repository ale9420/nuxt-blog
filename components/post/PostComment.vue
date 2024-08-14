<template>
  <div class="flex flex-col">
    <textarea class="bg-stone-200" placeholder="Escribe ..." name="comment" />
    <FormButton class="mt-3" @click="postComment">
      {{ $t('global.postComment') }}
    </FormButton>
  </div>
</template>

<script lang="ts" setup>
import CreateComment from '@/graphql/mutations/createComment.gql'

const graphql = useStrapiGraphQL()
const postStore = usePostStore()
const { postBySlug: post } = storeToRefs(postStore)

const postComment = async () => {
  await graphql(CreateComment, {
    comment: {
      content: 'El segundo comentario creado! x1',
      relation: `api::post.post:${post.value?.id}`,
    },
  })
}
</script>

<style></style>
