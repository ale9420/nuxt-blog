import type { PageEntityResponseCollection } from '@/types'
import pagesQuery from '@/graphql/queries/pages.gql'

export const usePages = async () => {
  const graphql = useStrapiGraphQL()
  const result = await graphql<PageEntityResponseCollection>(pagesQuery)
  const pages = result.data.pages.data
  return { pages }
}
