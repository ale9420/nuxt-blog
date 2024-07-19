<template>
	<div>
		<h1>{{ data?.title }}</h1>
		<img :src="data?.feature_image || ''" :alt="data?.title" />
		<div v-html="data?.html"></div>

		<pre>{{ data }}</pre>
		<pre>{{ status }}</pre>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { GHOST_API } = useContentApi();
console.log(route.params.slug);

const { data, status } = await useAsyncData('page', () =>
	GHOST_API.pages.read({ slug: route.params.slug as string })
);
</script>
