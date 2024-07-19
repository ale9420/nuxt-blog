<template>
	<header
		class="flex items-start justify-between p-5 bg-gradient-to-r from-red-600 to-red-400"
	>
		<h3 class="text-slate-50 text-xl">BOG.DEV</h3>
		<div class="flex">
			<NuxtLink
				to="/"
				class="text-slate-50 hover:underline hover:underline-offset-4 hover:cursor-pointer p-2"
				>Home</NuxtLink
			>
			<NuxtLink
				v-for="page in pages"
				:key="page.id"
				:to="{ name: 'page-slug', params: { slug: page.slug } }"
				class="text-slate-50 hover:underline hover:underline-offset-4 hover:cursor-pointer p-2"
				>About me</NuxtLink
			>
		</div>
	</header>
</template>

<script lang="ts" setup>
const { GHOST_API } = useContentApi();

const { data: pages } = useAsyncData('pages', () =>
	GHOST_API.pages.browse({ fields: ['id', 'slug'] })
);
</script>
