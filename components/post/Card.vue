<template>
  <article
    class="dark:text-slate-50 bg-neutral-50 shadow-md dark:bg-slate-500 overflow-hidden sm:rounded-md"
  >
    <div class="relative">
      <PostCategory
        :category="post.primary_category.data.attributes"
        class="absolute top-4 left-0 rounded-r-md"
        main
      />
      <StrapiBlocksTextImageNode
        :image="post?.featured_image?.data?.attributes"
        class="sm:h-40 sm:w-full md:h-52 object-cover"
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
      <div class="sm:min-h-15 md:min-h-20">
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
          class="font-semibold uppercase rounded-sm p-2 transition duration-500 ease-in-out bg-gradient-to-r light:from-stone-50 dark:from-stone-800 light:to-neutral-50 dark:to-neutral-800 light:text-stone-800 dark:text-stone-50 light:hover:from-stone-800 light:hover:to-neutral-800 light:hover:text-stone-50 dark:hover:from-stone-200 dark:hover:to-neutral-200 dark:hover:text-stone-800"
          @click="navigateToPost"
        >
          {{ $t('global.details') }}
        </NuxtLink>
        <PostReadTime :read-time="post.readTime" />
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { Post } from '~/types'

// border border-transparent hover:border-stone-800

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
