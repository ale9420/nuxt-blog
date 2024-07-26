<template>
	<article class="bg-slate-100">
		<img
			:src="post?.feature_image || ''"
			:alt="post?.title"
			class="h-1/3 w-full"
		/>
		<div class="p-5">
			<h1 class="text-7xl">{{ post?.title }}</h1>
			<div class="mt-5" v-html="post?.html"></div>
		</div>
	</article>
</template>

<script lang="ts" setup>
const route = useRoute();

const graphql = useStrapiGraphQL();

const postQuery: any = await graphql(`
	query post {
		posts {
			data {
				id
				attributes {
					content
					published
				}
			}
		}
	}
`);
// const { getPostBySlug } = usePostStore();
// const { data: post } = await getPostBySlug(route.params.slug as string);

// const seoTitle = post.value?.meta_title || post.value?.title || '';
// const seoDescription = post.value?.meta_description || post.value?.excerpt;

// useSeoMeta({
// 	title: () => seoTitle,
// 	ogTitle: () => seoTitle,
// 	description: () => seoDescription,
// 	ogDescription: () => seoDescription,
// 	ogImage: () => post.value?.og_image,
// });
</script>
