<template>
  <footer
    class="flex sm:flex-col items-center bg-gradient-to-r from-red-700 to-red-800 text-neutral-50 p-5"
  >
    <NuxtLink class="text-3xl font-bold" to="/">BOG.DEV</NuxtLink>
    <span class="text-xs">{{ $t('meta.blogCategory') }}</span>
    <div class="flex gap-3 mt-4">
      <NuxtLink to="https://github.com/ale9420">
        <img class="h-8 w-8" src="/images/github.png" alt="Github" />
      </NuxtLink>
      <NuxtLink
        to="https://www.linkedin.com/in/alejandro-ramirez-garcia-046713139/"
      >
        <img class="h-8 w-8" src="/images/linkedin.png" alt="Linkedin" />
      </NuxtLink>
    </div>
  </footer>
</template>

<script lang="ts" setup></script>
