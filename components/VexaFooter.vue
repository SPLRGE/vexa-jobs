<script lang="ts" setup>
const year = new Date().getFullYear()
</script>

<template>
  <div class="my-6">
    <hr />
    <div class="flex flex-row items-center justify-between">
      <p class="my-4 text-center">
        Fait avec ❤️ par
        <NuxtLink class="text-blue-500 hover:underline" target="_blank" to="https://splrge.dev">splrge</NuxtLink>
        - &copy;
        {{ year }} -
        <NuxtLink class="italic text-blue-500 hover:underline" to="/admin">Login</NuxtLink>
      </p>
      <ColorModeButton />
    </div>
  </div>
</template>
