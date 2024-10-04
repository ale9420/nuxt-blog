import { defineStore } from 'pinia'
import { type Post, type PostEntityResponseCollection } from '@/types'
import Posts from '@/graphql/queries/posts.gql'
import PostBySlug from '@/graphql/queries/post-by-slug.gql'
import FeaturedPostsQuery from '@/graphql/queries/featuredPosts.gql'

export const usePostStore = defineStore('usePostStore', () => {
  const graphql = useStrapiGraphQL()
  const posts = ref<PostEntityResponseCollection>()
  const featuredPosts = ref<PostEntityResponseCollection>()
  const postBySlug = ref<Post>()
  const languageStore = useLanguageStore()
  const { language } = storeToRefs(languageStore)

  async function fetchPosts(page: number, pageSize: number) {
    try {
      const result = await graphql<PostEntityResponseCollection>(Posts, {
        locale: language.value?.code,
        page,
        pageSize,
      })
      posts.value = result
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchPostBySlug(slug: string, locale: string) {
    try {
      const result = await graphql<PostEntityResponseCollection>(PostBySlug, {
        slug,
        locale,
      })
      if (result.data.posts.data.length > 0)
        console.log(result.data.posts.data[0])
      updatePost({
        ...result.data.posts.data[0].attributes,
        id: result.data.posts.data[0].id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchFeaturedPosts() {
    try {
      const result =
        await graphql<PostEntityResponseCollection>(FeaturedPostsQuery)
      featuredPosts.value = result
    } catch (error) {
      console.log(error)
    }
  }

  function updatePost(post: Post) {
    postBySlug.value = post
  }

  return {
    fetchPosts,
    fetchPostBySlug,
    fetchFeaturedPosts,
    updatePost,
    posts,
    postBySlug,
    featuredPosts,
  }
})
