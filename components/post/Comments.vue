<template>
  <section class="bg-slate-700 py-10">
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
        class="sm:w-full bg-gradient-to-r from-neutral-200 via-zinc-200 to-gray-200 rounded-md shadow-md flex px-2 py-3"
      >
        <div class="grow flex">
          <span
            class="flex justify-center items-center bg-zinc-900 rounded-full text-neutral-50 font-semibold xs:text-xs sm:h-7 sm:w-7 sm:p-1"
            >{{ comment.author.name[0].toUpperCase() }}</span
          >
          <div class="ml-1.5 w-full">
            <h4 class="font-semibold sm:text-sm/[6px]">
              {{ comment.author.name }}
            </h4>
            <span class="text-gray-500 text-xs">{{
              formatDate(comment.createdAt)
            }}</span>
            <p v-if="!comment.edit" class="sm:text-sm md:text-base mt-2">
              {{ comment.content }}
            </p>
            <PostUpdateComment
              v-else
              class="mt-2"
              :comment-id="comment.id"
              :post-id="post?.id?.toString() || ''"
              :content="comment.content"
              @cancel="comment.edit = false"
              @update="comment.edit = false"
            />

            <div v-if="user?.email === comment.author.email && !comment.edit">
              <hr class="border-t-1 border-stone-400 w-full my-3" />
              <div class="flex gap-2">
                <UiButton @click="comment.edit = true">
                  <PencilSquareIcon class="size-4 fill-neutral-50" />
                  {{ $t('global.edit') }}
                </UiButton>
                <UiButton state="warning" @click="onDelete(comment.id)">
                  <TrashIcon class="size-4 fill-neutral-50" />
                  {{ $t('global.delete') }}
                </UiButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="w-2/4 h-1 mt-8 mb-4 border-t-neutral-50" />
      <PostComment
        v-if="user"
        @refresh-comments="commentStore.fetchCommentsByPost(post?.id as string)"
      />
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
            <NuxtLink
              class="text-blue-400 cursor-pointer"
              @click="authLogin.showModal()"
            >
              {{ $t('global.login').toLocaleLowerCase() }}
            </NuxtLink>
            <AuthLogin ref="authLogin" />
          </template>
        </i18n-t>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { DateTime } from 'luxon'
import {
  ChatBubbleBottomCenterTextIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/vue/16/solid'

const user = useStrapiUser()
const authLogin = ref()
const commentStore = useCommentStore()
const postStore = usePostStore()
const languageStore = useLanguageStore()
const { postBySlug: post } = storeToRefs(postStore)
const { locale } = storeToRefs(languageStore)
const { comments } = storeToRefs(commentStore)

const formatDate = (date: string) =>
  DateTime.fromISO(date, { locale: locale.value }).toLocaleString(
    DateTime.DATETIME_MED
  )

const onDelete = async (id: number) => {
  await commentStore.removeComment({ relation: post.value?.id as string, id })
}

onMounted(async () => {
  await commentStore.fetchCommentsByPost(post.value?.id as string)
})
</script>
