<template>
  <div class="bg-slate-700 py-10">
    <div
      class="flex flex-col items-center max-w-[65ch] mx-auto gap-2 text-neutral-800"
    >
      <div class="flex items-center mb-4 text-neutral-50">
        <ChatBubbleBottomCenterTextIcon class="size-6 mr-2" />
        <h2 class="text-4xl">
          {{ $t('global.comments', { comments: comments?.length || 0 }) }}
        </h2>
      </div>

      <div
        v-for="comment in comments"
        :key="comment.id"
        class="sm:w-full bg-gradient-to-r from-neutral-200 via-zinc-200 to-gray-200 rounded-sm shadow-md px-2 py-3"
      >
        <div class="flex">
          <span
            class="flex justify-center items-center bg-zinc-900 rounded-full text-neutral-50 font-semibold xs:text-xs sm:h-7 sm:w-7 sm:p-1"
            >{{ comment.author.name[0].toUpperCase() }}</span
          >
          <div class="ml-1.5">
            <h4 class="font-semibold sm:text-sm/[6px]">
              {{ comment.author.name }}
            </h4>
            <span class="text-gray-500 text-xs">{{
              formatDate(comment.createdAt)
            }}</span>
            <p class="sm:text-sm md:text-base mt-2">
              {{ comment.content }}
            </p>
          </div>
        </div>
      </div>
      <hr class="w-2/4 h-1 mt-8 mb-4 border-t-neutral-50" />
      <PostComment v-if="user" @refresh-comments="fetchComments" />
      <div v-else class="flex flex-col items-center text-neutral-50">
        <h5 class="text-2xl">{{ $t('global.joinCommunity') }}</h5>
        <i18n-t
          keypath="global.signUpToComment"
          tag="p"
          class="font-semibold mt-2"
          for="author"
        >
          <template #signUp>
            <NuxtLink to="/auth/create-user" class="text-blue-400">
              {{ $t('global.signUp').toLocaleLowerCase() }}
            </NuxtLink>
          </template>
          <template #login>
            <NuxtLink class="text-blue-400" @click="authLogin.showModal()">
              {{ $t('global.login').toLocaleLowerCase() }}
            </NuxtLink>
            <AuthLogin ref="authLogin" />
          </template>
        </i18n-t>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DateTime } from 'luxon'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/16/solid'
import GetCommentsByPost from '@/graphql/queries/getCommentsByPost.gql'
import {
  type CommentNested,
  type CommentEntityResponseCollection,
} from '@/types'

const user = useStrapiUser()
const graphql = useStrapiGraphQL()
const postStore = usePostStore()
const languageStore = useLanguageStore()
const { postBySlug: post } = storeToRefs(postStore)
const { locale } = storeToRefs(languageStore)
const comments = ref<CommentNested[]>()
const authLogin = ref()

const formatDate = (date: string) =>
  DateTime.fromISO(date, { locale: locale.value }).toLocaleString(
    DateTime.DATETIME_MED
  )

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
