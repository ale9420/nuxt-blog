import { defineStore } from 'pinia'
import { type PostEntityResponseCollection } from '@/types'
import Posts from '@/graphql/queries/posts.gql'
import PostBySlug from '@/graphql/queries/post-by-slug.gql'

export const usePostStore = defineStore('usePostStore', () => {
  const graphql = useStrapiGraphQL()
  const posts = ref<PostEntityResponseCollection>()
  const postBySlug = ref<PostEntityResponseCollection>()
  const languageStore = useLanguageStore()
  const { locale } = storeToRefs(languageStore)

  async function fetchPosts() {
    const result = await graphql<PostEntityResponseCollection>(Posts, {
      locale: locale.value,
    })
    posts.value = result
  }

  async function fetchPostBySlug(slug: string) {
    const result = await graphql<PostEntityResponseCollection>(PostBySlug, {
      slug,
      locale: locale.value,
    })
    postBySlug.value = result
  }

  return { fetchPosts, fetchPostBySlug, posts, postBySlug }
})
