<template>
	<div>
		<div class="grid grid-cols-3 gap-3">
			<post-card v-for="post of posts" :key="post.id" :post="post" />
		</div>

		<button @click="getPosts">Get posts</button>
	</div>
</template>

<script lang="ts" setup>
import { usePostStore } from '@/store/post';
const { getPosts, posts } = usePostStore();

getPosts();
// const { data: posts } = useAsyncData('posts', () => getPosts());
</script>
