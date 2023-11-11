<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <span class="bg-gradient-to-r from-gradient-eucalyptus to-gradient-guppie-green bg-clip-text text-transparent">
    {{ text }}
  </span>
</template>

<style scoped></style>
