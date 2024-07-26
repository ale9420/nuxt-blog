// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	imports: { dirs: ['store'] },
	modules: [
		['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }],
		'@nuxtjs/strapi',
	],
	css: ['~/public/main.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	strapi: {
		url: process.env.STRAPI_URL,
	},
	runtimeConfig: {
		public: {
			ghostContentUrl: process.env.GHOST_CONTENT_URL,
			ghostApiKey: process.env.GHOST_API_KEY,
		},
	},
});
