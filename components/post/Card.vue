<template>
	<NuxtLink :to="{ name: 'post-slug', params: { slug: post.slug } }">
		<section
			class="bg-neutral-100 shadow-md rounded-md overflow-hidden hover:shadow-lg hover:cursor-pointer"
		>
			<div class="relative">
				<img
					:src="post.feature_image || ''"
					:alt="post?.feature_image_alt || post.title"
					class="h-60 w-full"
				/>
				<span
					v-if="post.primary_tag"
					class="absolute right-0 top-4 bg-gradient-to-r from-red-500 to-red-700 text-slate-100 rounded-l-lg p-1"
					>{{ post.primary_tag.name }}</span
				>
			</div>
			<div class="p-5">
				<h3 class="text-2xl font-bold">{{ post.title }}</h3>
				<div class="min-h-24">
					<p class="text-slate-600 line-clamp-3 mt-2">
						{{ post.excerpt }}
					</p>
				</div>
				<div class="flex items-end mt-5 min-h-10">
					<span
						v-for="tag in tags"
						:key="tag.id"
						class="bg-yellow-400 rounded-md mr-1 py-1 px-2"
						>{{ tag.name }}</span
					>
				</div>
				<div class="flex items-center mt-2">
					<img
						class="rounded-full h-10 w-10"
						:src="post.primary_author?.profile_image || ''"
						alt=""
					/>
					<div class="ml-2">
						<p>{{ post.primary_author?.name }}</p>
						<span>{{ postDate }}</span>
					</div>
				</div>
			</div>
		</section>
	</NuxtLink>
</template>

<script lang="ts" setup>
import { DateTime } from 'luxon';
import { type PostOrPage } from '@tryghost/content-api';

type PostProps = {
	post: PostOrPage;
};

const props = defineProps<PostProps>();
const postDate = computed(() =>
	DateTime.fromISO(props.post.published_at as string).toLocaleString(
		DateTime.DATE_FULL
	)
);

const tags = computed(() =>
	props.post.tags?.filter((tag) => tag.id !== props?.post?.primary_tag?.id)
);
</script>
