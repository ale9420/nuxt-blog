import { defineNuxtPlugin } from '#app'
import type { DirectiveBinding } from 'vue'

type Element = {
  clickOutsideEvent: (event: MouseEvent) => void
} & HTMLElement

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    beforeMount(el: Element, binding: DirectiveBinding) {
      el.clickOutsideEvent = function (event: MouseEvent) {
        if (!(el === event.target || el.contains(event.target as Node))) {
          binding.value(event)
        }
      }
      document.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el: Element) {
      document.removeEventListener('click', el.clickOutsideEvent)
    },
    getSSRProps(_binding, _vnode) {
      return {}
    },
  })
})
