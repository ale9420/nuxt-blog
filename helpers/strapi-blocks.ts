import { h } from 'vue'
import { type BlocksComponents } from 'vue-strapi-blocks-renderer'
import { screens } from '@/constants/screens'

import type { ImageBlock } from '@/types'

function getResourceUrl(url: string) {
  return url.startsWith('https://') ? url : `http://localhost:1437${url}`
}

function resolveImage(props: ImageBlock) {
  console.log(props)
  let url = ''
  switch (true) {
    case window?.innerWidth >= +screens.sm:
      url = props.formats.small.url
      break
    case window?.innerWidth >= +screens.md:
      url = props.formats.medium.url
      break
    default:
      url = getResourceUrl(props.formats.small.url)
      break
  }

  console.log(url)

  return url
}

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
    h('img', {
      class: '',
      src: resolveImage(props.image as unknown as ImageBlock),
      alt: props.image.alternativeText || '',
    }),
  'list-item': (props) => h('li', props.children),
}
