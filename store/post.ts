import { defineStore } from 'pinia'
import type { PostEntityResponseCollection } from '@/types'
import Posts from '@/graphql/queries/posts.gql'

export const usePostStore = defineStore('usePostStore', () => {
  const { language } = useLanguageStore()
  const graphql = useStrapiGraphQL()
  const posts = ref<PostEntityResponseCollection>()

  async function fetchPosts() {
    console.log('tulesio')
    const result = await graphql<PostEntityResponseCollection>(Posts, {
      locale: language?.code,
    })
    posts.value = result
    return result
  }

  // watch([locale], async () => {
  //   await fetchPosts()
  // })

  return { fetchPosts, posts }
})
