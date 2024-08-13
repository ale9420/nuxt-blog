<template>
  <section
    class="dark:text-slate-50 bg-slate-100 rounded-lg shadow-xl dark:bg-slate-500 md:overflow-hidden lg:shadow-2xl"
  >
    <div class="relative">
      <PostCategory
        :category="post.primary_category.data.attributes"
        class="absolute top-4 left-0 rounded-r-md"
        main
      />
      <StrapiBlocksTextImageNode
        :image="post?.featured_image?.data?.attributes"
        class="sm:w-72 sm:w-full md:h-64 lg:h-80 object-cover rounded-t-lg"
      />
    </div>
    <div class="sm:py-2 sm:px-1.5 lg:p-3 w-full">
      <h5 class="font-semibold md:text-lg lg:text-2xl">
        {{ post.title }}
      </h5>
      <PostAuthor
        :author="post.author.data.attributes"
        :published-at="post.publishedAt"
      />
      <div class="min-h-20">
        <div
          class="prose prose-zinc prose-p:leading-none dark:prose-invert sm:prose-sm lg:prose-lg mt-5 line-clamp-4"
        >
          <StrapiBlocksText :nodes="post?.excerpt" />
        </div>
      </div>
      <div class="flex items-center justify-between mt-5">
        <NuxtLink
          :to="{
            name: 'post-slug',
            params: { slug: post.slug },
            query: { locale: encodeURI(post.locale) },
          }"
          class="bg-gradient-to-r from-orange-500 via-red-500 to-rose-500 text-slate-50 font-semibold uppercase rounded-lg p-2"
          @click="navigateToPost"
        >
          {{ $t('global.details') }}
        </NuxtLink>
        <PostReadTime :read-time="post.readTime" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Post } from '~/types'

type PostProps = {
  post: Post
  id: string | number
}

const { updatePost } = usePostStore()
const props = defineProps<PostProps>()

const navigateToPost = () => {
  updatePost({ ...props.post, id: props.id })
}
</script>
