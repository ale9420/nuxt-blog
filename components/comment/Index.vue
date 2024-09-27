<template>
  <div
    class="sm:w-full bg-gradient-to-r from-neutral-200 via-zinc-200 to-gray-200 rounded-md shadow-md flex px-2 py-3"
  >
    <div class="grow flex">
      <span
        class="flex justify-center items-center bg-zinc-900 rounded-full text-neutral-50 font-semibold xs:text-xs sm:h-7 sm:w-7 sm:p-1"
        >{{ comment.author.name[0].toUpperCase() }}</span
      >
      <div class="ml-1.5 w-full">
        <h4 class="font-semibold sm:text-sm/[6px]">
          {{ comment.author.name }}
        </h4>
        <span class="text-gray-500 text-xs">{{
          formatDate(comment.createdAt)
        }}</span>
        <div v-if="!edit && !reply">
          <p class="sm:text-sm md:text-base mt-2">{{ comment.content }}</p>
          <div class="ml-10">
            <Comment
              v-for="children in comment.children"
              :key="children.id"
              :comment="children"
              class="mb-2"
            />
            <!-- <div v-for="children in comment.children" :key="children.id" >
              <p>{{ children.content }}</p>
              <hr class="border-t-1 border-stone-400 w-full my-3" />
            </div> -->
          </div>
        </div>
        <form v-else-if="edit || reply" @submit.prevent>
          <FormInput
            :placeholder="$t('global.comment')"
            type="text"
            name="content"
            component="textarea"
          />
        </form>
        <div>
          <hr class="border-t-1 border-stone-400 w-full my-3" />
          <div class="flex gap-2">
            <UiButton
              v-if="edit || reply"
              :disabled="!meta.valid || isSubmitting"
              :is-loading="isSubmitting"
              type="button"
              @click="edit && !reply ? onUpdate() : onReply()"
            >
              {{ $t('global.postComment') }}
            </UiButton>
            <UiButton
              v-if="edit || reply"
              :disabled="isSubmitting"
              :is-loading="isSubmitting"
              type="button"
              @click="onCancel"
            >
              {{ $t('global.cancel') }}
            </UiButton>
            <UiButton
              v-if="user?.email === comment.author.email && !edit"
              @click="edit = true"
            >
              <PencilSquareIcon class="size-4 fill-neutral-50" />
              {{ $t('global.edit') }}
            </UiButton>
            <UiButton
              v-if="user?.email === comment.author.email && !edit"
              state="warning"
              @click="onDelete(comment.id)"
            >
              <TrashIcon class="size-4 fill-neutral-50" />
              {{ $t('global.delete') }}
            </UiButton>
            <UiButton
              v-if="!reply && user?.email !== comment.author.email"
              @click="reply = true"
              >Replicar</UiButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/16/solid'
import * as yup from 'yup'
import { DateTime } from 'luxon'
import type { CommentNested } from '~/types'

type CommentProps = {
  comment: CommentNested
}

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

const onDelete = async (id: number) => {
  await commentStore.removeComment({ relation: post.value?.id as string, id })
}

const formatDate = (date: string) =>
  DateTime.fromISO(date, { locale: locale.value }).toLocaleString(
    DateTime.DATETIME_MED
  )

watch(edit, () => {
  resetForm()
  setFieldValue('content', props.comment.content)
})
</script>
