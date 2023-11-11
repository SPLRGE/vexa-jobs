<script lang="ts" setup>
defineProps({
  url: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: false,
    default: 'Postuler',
  },
})
</script>

<template>
  <div>
    <NuxtLink
      :to="url"
      class="hover:bg-green-primary-400 rounded bg-primary-green-500 px-4 py-1 font-bold text-black"
      target="_blank"
    >
      {{ text }}
    </NuxtLink>
  </div>
</template>

<style scoped></style>
