<script lang="ts" setup>
definePageMeta({
  layout: 'protected',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Vexa Jobs - Admin - Mon compte',
})
</script>

<template>
  <div class="space-y-8">
    <EditAccount />
    <DeleteAccount />
  </div>
</template>
