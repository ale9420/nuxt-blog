import { defineStore } from 'pinia'
import { type Post, type PostEntityResponseCollection } from '@/types'
import Posts from '@/graphql/queries/posts.gql'
import PostBySlug from '@/graphql/queries/post-by-slug.gql'

export const usePostStore = defineStore('usePostStore', () => {
  const graphql = useStrapiGraphQL()
  const posts = ref<PostEntityResponseCollection>()
  const postBySlug = ref<Post>()
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
    if (result.data.posts.data.length > 0)
      updatePost(result.data.posts.data[0].attributes)
  }

  function updatePost(post: Post) {
    postBySlug.value = post
  }

  return { fetchPosts, fetchPostBySlug, updatePost, posts, postBySlug }
})
