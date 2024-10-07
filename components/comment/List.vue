<template>
  <section class="bg-slate-700 sm:p-5 lg:px-0 py-10">
    <div
      class="flex flex-col items-center max-w-[75ch] mx-auto gap-2 text-neutral-800"
    >
      <div class="flex items-center text-neutral-50">
        <ChatBubbleBottomCenterTextIcon class="size-6 mr-2" />
        <h2 class="text-4xl">
          {{ $t('global.comments', { comments: comments?.length || 0 }) }}
        </h2>
      </div>
      <ul v-if="comments && comments?.length > 0" class="mt-4 w-full">
        <li v-for="comment in comments" :key="comment.id" class="mb-2">
          <Comment class="px-2 py-3" :comment="comment" />
        </li>
      </ul>

      <hr class="w-2/4 h-1 sm:my-2 mt-8 mb-4 border-t-neutral-50" />
      <CommentCreate
        v-if="user"
        @refresh-comments="commentStore.fetchCommentsByPost(post?.id as string)"
      />
      <div v-else class="flex flex-col items-center text-neutral-50">
        <h5 class="sm:text-xl md:text-2xl">{{ $t('global.joinCommunity') }}</h5>
        <i18n-t
          keypath="global.signUpToComment"
          tag="p"
          class="font-semibold text-center mt-2 sm:text-xs"
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
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/16/solid'

const user = useStrapiUser()
const authLogin = ref()
const commentStore = useCommentStore()
const postStore = usePostStore()
const { postBySlug: post } = storeToRefs(postStore)
const { comments } = storeToRefs(commentStore)

onMounted(async () => {
  await commentStore.fetchCommentsByPost(post.value?.id as string)
})
</script>
