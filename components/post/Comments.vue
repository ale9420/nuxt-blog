<template>
  <div class="flex flex-col gap-4 w-full">
    <h2 class="self-center">Comentarios</h2>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="sm:w-full md:w-96 bg-slate-200 rounded-md p-3"
    >
      <div class="flex">
        <span
          class="flex justify-center items-center bg-amber-400 rounded-full font-bold sm:h-8 sm:w-8 md:h-10 md:w-10 sm:p-1 md:p-2"
          >{{ comment.author.name[0].toUpperCase() }}</span
        >
        <div class="ml-3">
          <div class="flex items-center sm:text-xs text-sm">
            <h4 class="font-semibold">{{ comment.author.name }}</h4>
            <span class="text-gray-500 ml-1">{{
              formatDate(comment.createdAt)
            }}</span>
          </div>
          <p class="sm:text-sm md:text-base">
            {{ comment.content }}
          </p>
        </div>
      </div>
    </div>

    <PostComment v-if="user" @refresh-comments="fetchComments" />
    <div v-else class="bg-stone-200 p-2 flex items-center justify-center h-24">
      <i18n-t
        keypath="global.signUpToComment"
        tag="span"
        class="font-semibold ml-1 lg:ml-2"
        for="author"
      >
        <template #signUp>
          <NuxtLink to="/auth/create-user" class="text-blue-800">
            {{ $t('global.signUp').toLocaleLowerCase() }}
          </NuxtLink>
        </template>
        <template #login>
          <NuxtLink to="/auth/create-user" class="text-blue-800">
            {{ $t('global.login').toLocaleLowerCase() }}
          </NuxtLink>
        </template>
      </i18n-t>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DateTime } from 'luxon'

import GetCommentsByPost from '@/graphql/queries/getCommentsByPost.gql'
import {
  type CommentNested,
  type CommentEntityResponseCollection,
} from '@/types'

const user = useStrapiUser()
const graphql = useStrapiGraphQL()
const postStore = usePostStore()
const { postBySlug: post } = storeToRefs(postStore)
const comments = ref<CommentNested[]>()

const formatDate = (date: string) =>
  DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED)

const fetchComments = async () => {
  const result = await graphql<CommentEntityResponseCollection>(
    GetCommentsByPost,
    {
      post: `api::post.post:${post.value?.id}`,
    }
  )

  comments.value = result?.data?.findAllInHierarchy
}

onMounted(async () => {
  await fetchComments()
})
</script>
