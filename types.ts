import type { BlocksContent } from 'vue-strapi-blocks-renderer'

export type Author = {
  name: string
  profile_image: UploadFileEntityResponse
}

type UploadFileEntityResponse = {
  data: UploadFileEntity
}

type AuthorEntity = {
  id: String
  attributes: Author
}

type CategoryEntity = {
  id: string
  attributes: Category
}

type PageEntity = {
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
  id: String
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
  excerpt: BlocksContent
  title: string
  meta_title?: string
  meta_description?: string
  slug: string
  content: BlocksContent
  publishedAt: string
  createdAt: string
  updatedAt: string
  featured_image: UploadFileEntityResponse
  author: AuthorEntityResponse
  primary_category: CategoryEntityResponse
  categories: CategoryRelationResponseCollection
}

export type Page = {
  title: string
  slug: string
  content: BlocksContent
  meta: Meta
}

type UploadFile = {
  name: String
  alternativeText: string
  caption: String
  url: string
  ext: String
}

type Pagination = {
  total: Number
  page: Number
  pageSize: Number
  pageCount: Number
}

type Meta = {
  meta_title: string
  meta_description: string
  slug: string
}

export interface PostEntity {
  id: String
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

export type PostEntityResponseCollection = {
  data: {
    posts: {
      data: PostEntity[]
    }
  }
  meta: ResponseCollectionMeta
}

export type PageEntityResponseCollection = {
  data: {
    pages: {
      data: PageEntity[]
    }
  }
  meta: ResponseCollectionMeta
}
