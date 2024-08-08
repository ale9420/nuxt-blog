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
  excerpt: BlockNode[]
  title: string
  slug: string
  content: BlockNode[]
  publishedAt: string
  createdAt: string
  updatedAt: string
  readTime: number
  featured_image: UploadFileEntityResponse
  author: AuthorEntityResponse
  primary_category: CategoryEntityResponse
  categories: CategoryRelationResponseCollection
  seo: ComponentSharedSeo
}

export type Page = {
  title: string
  slug: string
  content: BlockNode[]
  seo: ComponentSharedSeo
}

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
  total: number
  page: number
  pageSize: number
  pageCount: number
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
