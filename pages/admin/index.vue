<script lang="ts" setup>
definePageMeta({
  layout: 'protected',
  middleware: 'auth',
})
useSeoMeta({
  title: 'Vexa Jobs - Admin',
})

const authStore = useAuthStore()
const userStore = useUserStore()
</script>

<template>
  <div>
    {{ authStore.token }}
    {{ userStore.user }}
  </div>
</template>
