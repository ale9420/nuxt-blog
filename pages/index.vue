<template>
  <div>
    <div
      class="sm:flex sm:flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3"
    >
      <PostCard
        v-for="post of posts?.data?.posts?.data"
        :key="+post.id"
        :post="post.attributes"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { posts, fetchPosts } = usePostStore()

onServerPrefetch(async () => {
  await fetchPosts()
})

useSeoMeta({
  title: 'BOG.DEV Blog',
  description: 'Este es un blog donde nos enfocaremos en tecnologias web TI',
})
</script>
