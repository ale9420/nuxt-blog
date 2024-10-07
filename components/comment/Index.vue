<template>
  <div
    class="sm:w-full bg-gradient-to-r from-neutral-200 via-zinc-200 to-gray-200 flex roundend-lg"
  >
    <div class="grow flex">
      <span
        class="flex justify-center items-center bg-zinc-900 rounded-full text-neutral-50 font-semibold xs:text-xs sm:h-7 sm:w-7 sm:p-1"
        >{{ comment.author.name[0].toUpperCase() }}</span
      >
      <div class="ml-1.5 w-full">
        <div class="bg-neutral-100 rounded-md p-2">
          <div class="flex justify-between">
            <h4 class="font-semibold sm:text-sm">
              {{ comment.author.name }}
            </h4>
            <div class="flex gap-2">
              <button
                v-if="user?.email === comment.author.email && !edit"
                class="text-slate-500 flex items-center"
                @click="edit = true"
              >
                <PencilSquareIcon class="size-4 fill-slate-500 mr-1" />
                {{ $t('global.edit') }}
              </button>
              <button
                v-if="edit"
                :disabled="isSubmitting"
                :is-loading="isSubmitting"
                class="text-slate-500 flex items-center"
                type="button"
                @click="onCancel"
              >
                <XCircleIcon class="size-4 fill-slate-500 mr-1" />
                {{ $t('global.cancel') }}
              </button>
              <button
                v-if="user?.email === comment.author.email"
                class="text-red-500 flex items-center"
                @click="onDelete(comment.id)"
              >
                <TrashIcon class="size-4 fill-red-500 mr-1" />
                {{ $t('global.delete') }}
              </button>
            </div>
          </div>
          <div v-if="!edit">
            <p class="sm:text-sm md:text-base">{{ comment.content }}</p>
          </div>
          <Transition>
            <form v-if="edit" class="mt-3" @submit.prevent>
              <FormInput
                :placeholder="$t('global.comment')"
                type="text"
                name="content"
                component="textarea"
              />
              <UiButton
                v-if="edit"
                :disabled="!meta.valid || isSubmitting"
                class="mt-2"
                @click="onUpdate"
              >
                {{ $t('global.postComment') }}
              </UiButton>
            </form>
          </Transition>
        </div>
        <div class="flex gap-2 items-end">
          <button
            v-if="!reply && user && user?.email !== comment.author.email"
            class="text-inherit ml-2 hover:underline hover:underline-offset-4 hover:cursor-pointer hover:text-red-600"
            @click="reply = true"
          >
            Reply
          </button>

          <span class="text-gray-500">{{ formatDate(comment.createdAt) }}</span>
        </div>
        <Transition>
          <form
            v-if="reply"
            class="bg-neutral-100 rounded-md px-2 py-3 mt-3"
            @submit.prevent
          >
            <FormInput
              :placeholder="$t('global.comment')"
              type="text"
              name="content"
              component="textarea"
            />
            <UiButton
              :disabled="!meta.valid || isSubmitting"
              :is-loading="isSubmitting"
              type="button"
              class="mt-2"
              @click="onReply"
            >
              {{ $t('global.postComment') }}
            </UiButton>
          </form>
        </Transition>
        <div class="mt-2">
          <ul>
            <li v-for="children in comment.children" :key="children.id">
              <Comment :comment="children" class="mb-2" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <CommentDelete ref="deleteDialog" :comment-id="selectedCommentId" />
  </div>
</template>

<script setup lang="ts">
import {
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/vue/16/solid'
import * as yup from 'yup'
import { DateTime } from 'luxon'
import type { CommentNested } from '~/types'
import type Dialog from '../ui/Dialog.vue'

type CommentProps = {
  comment: CommentNested
}

const selectedCommentId = ref<number>(0)
const deleteDialog = ref<InstanceType<typeof Dialog>>()
const props = defineProps<CommentProps>()
const { t } = useI18n()
const edit = ref(false)
const reply = ref(false)
const user = useStrapiUser()
const commentStore = useCommentStore()
const postStore = usePostStore()
const languageStore = useLanguageStore()
const { postBySlug: post } = storeToRefs(postStore)
const { locale } = storeToRefs(languageStore)

const { meta, handleSubmit, isSubmitting, setFieldValue, resetForm } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      content: yup.string().required(t('validations.required')),
    })
  ),
})

const onCancel = () => {
  edit.value = false
  reply.value = false
}

const onDelete = (id: number) => {
  selectedCommentId.value = id
  deleteDialog.value?.show()
}

const onUpdate = handleSubmit(async ({ content }) => {
  await commentStore.updateComment({
    content,
    id: props.comment.id,
    relation: post.value?.id?.toString() || '',
  })
  edit.value = false
})

const onReply = handleSubmit(async ({ content }) => {
  await commentStore.postComment({
    content,
    relation: post.value?.id?.toString() || '',
    threadOf: props.comment.id.toString(),
  })
  reply.value = false
})

const formatDate = (date: string) =>
  DateTime.fromISO(date, { locale: locale.value }).toLocaleString(
    DateTime.DATETIME_SHORT
  )

watch(edit, () => {
  resetForm()
  setFieldValue('content', props.comment.content)
})
</script>
