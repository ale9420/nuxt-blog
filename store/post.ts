import { defineStore } from 'pinia'
import { type Post, type PostEntityResponseCollection } from '@/types'
import Posts from '@/graphql/queries/posts.gql'
import PostBySlug from '@/graphql/queries/post-by-slug.gql'

export const usePostStore = defineStore('usePostStore', () => {
  const graphql = useStrapiGraphQL()
  const posts = ref<PostEntityResponseCollection>()
  const postBySlug = ref<Post>()
  const languageStore = useLanguageStore()
  const { language } = storeToRefs(languageStore)

  async function fetchPosts() {
    const result = await graphql<PostEntityResponseCollection>(Posts, {
      locale: language.value?.code,
    })
    posts.value = result
  }

  async function fetchPostBySlug(slug: string, locale: string) {
    const result = await graphql<PostEntityResponseCollection>(PostBySlug, {
      slug,
      locale,
    })
    if (result.data.posts.data.length > 0)
      console.log(result.data.posts.data[0].id)
    updatePost({
      ...result.data.posts.data[0].attributes,
      id: result.data.posts.data[0].id,
    })
  }

  function updatePost(post: Post) {
    postBySlug.value = post
  }

  return { fetchPosts, fetchPostBySlug, updatePost, posts, postBySlug }
})
