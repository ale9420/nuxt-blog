import { defineStore } from 'pinia'
import type { PostEntityResponseCollection } from '@/types'
import Posts from '@/graphql/queries/posts.gql'

export const usePostStore = defineStore('usePostStore', () => {
  const graphql = useStrapiGraphQL()
  const posts = ref<PostEntityResponseCollection>()
  const languageStore = useLanguageStore()
  const { locale } = storeToRefs(languageStore)

  async function fetchPosts() {
    const result = await graphql<PostEntityResponseCollection>(Posts, {
      locale: locale.value,
    })
    posts.value = result
    return result
  }

  watch(locale, async () => {
    await fetchPosts()
  })

  return { fetchPosts, posts }
})
