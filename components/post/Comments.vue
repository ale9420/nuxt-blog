<template>
  <div class="flex flex-col gap-4">
    <h2 class="self-center">Comentarios</h2>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="flex bg-slate-300 rounded-md p-3"
    >
      <h4>{{ comment.author.name }}</h4>

      {{ comment.content }}
    </div>

    <button @click="postComment"></button>
  </div>
</template>

<script lang="ts" setup>
import CreateComment from '@/graphql/mutations/createComment.gql'
import GetCommentsByPost from '@/graphql/queries/getCommentsByPost.gql'
import {
  type CommentNested,
  type CommentEntityResponseCollection,
} from '@/types'

const graphql = useStrapiGraphQL()
const postStore = usePostStore()
const { postBySlug: post } = storeToRefs(postStore)
const comments = ref<CommentNested[]>()

const postComment = async () => {
  await graphql(CreateComment, {
    comment: {
      content: 'El segundo comentario creado! x1',
      // authorName: 'Tulito',
      // authorEmail: 'tulito22@hotmail.com',
      relation: 'api::post.post:3',
    },
  })
}

onMounted(async () => {
  console.log(post.value?.id)
  const result = await graphql<CommentEntityResponseCollection>(
    GetCommentsByPost,
    {
      post: `api::post.post:${post.value?.id}`,
    }
  )

  comments.value = result?.data?.findAllInHierarchy

  console.log(result)
})
</script>
