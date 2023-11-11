<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    class="mt-4 flex flex-row items-center justify-between rounded-md border-2 border-primary-green-500 p-6 shadow-2xl"
  >
    <div class="flex flex-col">
      <span class="text-xl font-bold"> {{ title }}</span>
      <span class="text-sm">
        {{ description }}
      </span>
    </div>
    <VexaButton :url="'/api/redirect?postId=' + id" />
  </div>
</template>

<style scoped></style>
