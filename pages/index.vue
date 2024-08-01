<template>
  <div>
    <div class="sm:flex sm:flex-col gap-5 lg:grid lg:grid-cols-3">
      <PostCard
        v-for="post of result?.data?.posts?.data"
        :key="+post.id"
        :post="post.attributes"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Posts from '@/graphql/queries/posts.gql'
import type { PostEntityResponseCollection } from '~/types'

const graphql = useStrapiGraphQL()
const result = await graphql<PostEntityResponseCollection>(Posts)

useSeoMeta({
  title: 'BOG.DEV Blog',
  description: 'Este es un blog donde nos enfocaremos en tecnologias web TI',
})
</script>
