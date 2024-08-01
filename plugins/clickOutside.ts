import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    beforeMount(el: any, binding: any) {
      el.clickOutsideEvent = function (event: any) {
        console.log('asdasd')
        // Check if the clicked element is neither the element
        // to which the directive is applied nor its child
        if (!(el === event.target || el.contains(event.target))) {
          // Invoke the provided method
          binding.value(event)
        }
      }
      document.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el: any) {
      // Remove the event listener when the bound element is unmounted
      document.removeEventListener('click', el.clickOutsideEvent)
    },
    getSSRProps(binding, vnode) {
      console.log(binding, vnode)
      // you can provide SSR-specific props here
      return {}
    },
  })
})
