import { defineStore } from 'pinia';
import GhostContentAPI, { type PostsOrPages } from '@tryghost/content-api';

export const usePostStore = defineStore('post', () => {
	const config = useRuntimeConfig();
	let posts = ref<PostsOrPages | null>();

	const GHOST_API = new GhostContentAPI({
		url: config.public.ghostContentUrl,
		key: config.public.ghostApiKey,
		version: 'v5.0',
	});

	async function getPosts() {
		const { data } = await useAsyncData('posts', () =>
			GHOST_API.posts.browse({ limit: 10, include: ['tags', 'authors'] })
		);
		posts.value = data.value;
	}

	async function getPostBySlug(slug: string) {
		const { data } = await useAsyncData('posts', () =>
			GHOST_API.posts.read({ slug }, { formats: ['html'] })
		);

		return { data };
	}

	return { getPosts, getPostBySlug, posts };
});
