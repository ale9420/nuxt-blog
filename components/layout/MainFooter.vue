<template>
  <footer
    class="flex sm:flex-col items-center bg-gradient-to-r from-slate-600 to-slate-700 p-5 text-neutral-50"
  >
    <div class="flex gap-3">
      <NuxtLink to="https://github.com/ale9420">
        <NuxtImg class="h-10 w-10" src="/github.png" />
      </NuxtLink>
      <NuxtLink
        to="https://www.linkedin.com/in/alejandro-ramirez-garcia-046713139/"
      >
        <NuxtImg class="h-10 w-10" src="/linkedin.png" />
      </NuxtLink>
    </div>
    <hr class="w-full my-5" />
    <div class="container text-justify">
      <h3 class="text-xl">{{ $t('footer.blog') }}</h3>
      <p class="text-sm mt-2">
        {{ $t('footer.blogText') }}
      </p>
    </div>
  </footer>
</template>

<script lang="ts" setup></script>
