import type { BlockNode } from '#strapi-blocks-renderer/types'

export type Language = {
  value: string
  label: string
  code: string
}

export enum Locale {
  es = 'es',
  en = 'en',
}

export type Author = {
  name: string
  profile_image: UploadFileEntityResponse
}

type UploadFileEntityResponse = {
  data: UploadFileEntity
}

type AuthorEntity = {
  id: string
  attributes: Author
}

type CategoryEntity = {
  id: string
  attributes: Category
}

export type PageEntity = {
  id: string
  attributes: Page
}

type AuthorEntityResponse = {
  data: AuthorEntity
}

type CategoryEntityResponse = {
  data: CategoryEntity
}

type CategoryRelationResponseCollection = {
  data: CategoryEntity[]
}

type UploadFileEntity = {
  id: string
  attributes: UploadFile
}

export type Category = {
  name: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type Post = {
  id: string | number
  excerpt: BlockNode[]
  title: string
  slug: string
  content: BlockNode[]
  publishedAt: string
  createdAt: string
  updatedAt: string
  locale: string
  readTime: number
  featured_image: UploadFileEntityResponse
  author: AuthorEntityResponse
  primary_category: CategoryEntityResponse
  categories: CategoryRelationResponseCollection
  seo: ComponentSharedSeo
  localizations?: PostRelationResponseCollection
}

export type Page = {
  title: string
  slug: string
  content: BlockNode[]
  seo: ComponentSharedSeo
  featured_image: UploadFileEntityResponse
}

export type CommentsCommentInput = {
  blockedThread: boolean
  blockReason: string
  authorUser: string
  authorId: string
  authorName: string
  authorEmail: string
  authorAvatar: string
  isAdminComment: boolean
  removed: boolean
  approvalStatus: string
  related: string
  reports: string[]
  threadOf: string
}

type CommonComment = {
  content: string
  blocked: boolean
}

type CommentAuthor = {
  id: string
  name: string
  email: string
  avatar: string
}

export type CommentNested = {
  id: number
  createdAt: string
  author: CommentAuthor
  edit: boolean
  children: CommentNested[]
} & CommonComment

type ImageFormat = {
  name: string
  url: string
  ext: string
  hash: string
  mime: string
  path?: string | null
  width: number
  height: number
  size: number
  sizeInBites: number
}

type ImageFormats = {
  small: ImageFormat
  thumbnail: ImageFormat
  medium: ImageFormat
  large: ImageFormat
}

export type UploadFile = {
  name: string
  caption: string
  url: string
  alternativeText: string
  width: number
  height: number
  formats: ImageFormats
  provider: string
}

type Pagination = {
  total?: number
  page?: number
  pageSize?: number
  pageCount?: number
}

type ComponentSharedSeo = {
  metaTitle: string
  metaDescription: string
  keywords?: string
  metaRobots?: string
  canonicalURL?: string
}

export interface PostEntity {
  id: string
  attributes: Post
}

export type PageEntityResponse = {
  data: PageEntity
}

export interface PostEntityResponse {
  data: PostEntity
}

export interface ResponseCollectionMeta {
  pagination: Pagination
}

type PostRelationResponseCollection = {
  data: [PostEntity]
}

export type PostEntityResponseCollection = {
  data: {
    posts: {
      data: PostEntity[]
      meta: ResponseCollectionMeta
    }
  }
}

export type PageEntityResponseCollection = {
  data: {
    pages: {
      data: PageEntity[]
    }
  }
  meta: ResponseCollectionMeta
}

export type CommentEntityResponseCollection = {
  data: {
    findAllInHierarchy: CommentNested[]
  }
}

export type ToastStatus = 'success' | 'warning' | 'error'

export type Toast = {
  title: string
  description?: string
  timeout: number
  status: ToastStatus
  id?: number
}

export type LoginError = {
  error: {
    message: string
    name: string
    status: number
  }
}

export type PaginationProps = {
  limit: number
  page: number
  pageCount: number
}

export type StrapiErrorResponse = {
  error: HttpError
}

export type HttpError = {
  details: HttpError[]
  message: string
  name: string
  status: number
}

export type Color =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fucshia'
  | 'pink'
  | 'rose'

export type Comment = {
  id: number
  relation: string
}

export type RemoveComment = Comment

export type UpdateComment = {
  content: string
} & Comment

export type CreateComment = {
  content: string
  relation: string
  threadOf?: string
}
