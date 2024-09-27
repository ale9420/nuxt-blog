import { defineStore } from 'pinia'
import type { CreateComment } from '@/types.ts'
import RemoveCommentMutation from '@/graphql/mutations/removeComment.gql'
import GetCommentsByPost from '@/graphql/queries/getCommentsByPost.gql'
import CreateCommentMutation from '@/graphql/mutations/createComment.gql'
import UpdateCommentMutation from '@/graphql/mutations/updateComment.gql'

import type {
  CommentEntityResponseCollection,
  CommentNested,
  RemoveComment,
  UpdateComment,
} from '@/types'

export const useCommentStore = defineStore('comment', () => {
  const graphql = useStrapiGraphQL()
  const comments = ref<CommentNested[]>()
  const { addRequestErrorToast } = useToastStore()

  async function fetchCommentsByPost(postId: string) {
    const result = await graphql<CommentEntityResponseCollection>(
      GetCommentsByPost,
      {
        post: `api::post.post:${postId}`,
      }
    )

    comments.value = result?.data?.findAllInHierarchy.map((i) => ({
      ...i,
      edit: false,
    }))
  }

  async function postComment({ relation, ...comment }: CreateComment) {
    try {
      await graphql(CreateCommentMutation, {
        comment: {
          ...comment,
          relation: `api::post.post:${relation}`,
        },
      })
      await fetchCommentsByPost(relation)
    } catch (error) {
      addRequestErrorToast()
    }
  }

  async function updateComment({ content, id, relation }: UpdateComment) {
    try {
      await graphql(UpdateCommentMutation, {
        input: {
          id,
          content,
          relation: `api::post.post:${relation}`,
        },
      })
      await fetchCommentsByPost(relation)
    } catch (error) {
      addRequestErrorToast()
    }
  }

  async function removeComment({ id, relation }: RemoveComment) {
    try {
      await graphql(RemoveCommentMutation, {
        input: {
          id,
          relation: `api::post.post:${relation}`,
        },
      })
      await fetchCommentsByPost(relation)
    } catch {
      addRequestErrorToast()
    }
  }

  return {
    comments,
    postComment,
    updateComment,
    removeComment,
    fetchCommentsByPost,
  }
})
