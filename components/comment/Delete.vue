<template>
  <UiDialog ref="deleteDialog" size="small" :title="$t('comment.title')">
    <div>
      <p>{{ $t('comment.confirmDelete') }}</p>
    </div>
    <template #actions>
      <UiButton @click="hideModal">{{ $t('global.cancel') }}</UiButton>
      <UiButton state="warning" @click="onDelete">{{
        $t('global.delete')
      }}</UiButton>
    </template>
  </UiDialog>
</template>

<script lang="ts" setup>
import type Dialog from '../ui/Dialog.vue'

type DeleteProps = {
  commentId: number
}

const deleteDialog = ref<InstanceType<typeof Dialog>>()
const postStore = usePostStore()
const { postBySlug: post } = storeToRefs(postStore)
const { removeComment } = useCommentStore()

const onDelete = async () => {
  await removeComment({
    relation: post.value?.id as string,
    id: props.commentId,
  })
}

const showModal = () => {
  deleteDialog.value?.show()
}

const hideModal = () => {
  deleteDialog.value?.hide()
}

const props = defineProps<DeleteProps>()
defineExpose({ show: showModal })
</script>
