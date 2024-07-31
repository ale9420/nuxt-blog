import { h } from 'vue'
import { type BlocksComponents } from 'vue-strapi-blocks-renderer'

export const userBlocks: BlocksComponents = {
  paragraph: (props) => h('p', { class: 'prose-p' }, props.children),
  quote: (props) =>
    h('blockquote', { class: 'prose-blockquote:text-red-100' }, props.children),
  code: (props) => h('pre', [h('code', props.children)]),
  heading: (props) => h(`h${props.level}`, props.children),
  link: (props) =>
    h(
      'a',
      { class: 'prose-a', href: props.url, target: '_blank' },
      props.children
    ),
  list: (props) =>
    h(
      props.format === 'ordered' ? 'ol' : 'ul',
      { class: 'prose-list' },
      Array.isArray(props.children)
        ? props.children?.map((i) => h('li', { class: '' }, i.children))
        : []
    ),
  image: (props) =>
    h(
      'img',
      {
        class: 'prose-img',
        src: props.image.url,
        alt: props.image.alternativeText,
      },
      props.children
    ),
  'list-item': (props) => h('li', props.children),
}
