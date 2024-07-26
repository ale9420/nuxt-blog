import { h } from 'vue';

import {
	StrapiBlocks,
	type BlocksComponents,
	type ModifiersComponents,
} from 'vue-strapi-blocks-renderer';

export const userBlocks: BlocksComponents = {
	// Will include the class "mb-4" on all paragraphs
	paragraph: (props) => h('p', { class: 'mb-4' }, props.children),
	quote: (props) => h('quote', { class: 'quote' }, props.children),
	code: (props) => h('code', { class: 'code' }, props.children),
	heading: (props) => h('h1', { class: 'prose-h1' }, props.children),
	link: (props) => h('h1', { class: 'text-5xl' }, props.children),
	list: (props) => h('h1', { class: 'text-5xl' }, props.children),
	image: (props) =>
		h(
			'img',
			{
				class: 'prose-img:{utility}',
				src: props.image.url,
				alt: props.image.alternativeText,
			},
			props.children
		),
	'list-item': (props) => h('h1', { class: 'text-5xl' }, props.children),
};
