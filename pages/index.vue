<template>
	<div>
		<!-- <div class="grid grid-cols-3 gap-3">
			<post-card v-for="post of posts" :key="post.id" :post="post" />
		</div>

		<button @click="getPosts">Get posts</button> -->

		<section
			v-for="post of postQuery.data.posts.data"
			:key="post.id"
			class="prose lg:prose-xl prose-headings:underline"
		>
			<!-- <pre>{{ post.attributes }}</pre>
			<br /> -->
			<!-- <div v-html="post.attributes.content"></div> -->
			<StrapiBlocks :content="post.attributes.content" :blocks="userBlocks" />
		</section>
	</div>
</template>

<script lang="ts" setup>
import { StrapiBlocks } from 'vue-strapi-blocks-renderer';
import { userBlocks } from '@/helpers/strapi-blocks';

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

console.log(postQuery.data.posts.data);

useSeoMeta({
	title: 'BOG.DEV Blog',
	description: 'Este es un blog donde nos enfocaremos en tecnologias web TI',
});
</script>
