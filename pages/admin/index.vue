<script lang="ts" setup>
definePageMeta({
  layout: 'protected',
  middleware: 'auth',
})
useSeoMeta({
  title: 'Vexa Jobs - Admin',
})

const welcomeMessage = computed(() => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'Bonjour'
  if (hour >= 12 && hour < 18) return 'Bon après-midi'
  return 'Bonsoir'
})
const { user } = storeToRefs(useUserStore())
</script>

<template>
  <div class="mt-4">
    <div class="flex flex-row flex-wrap justify-between">
      <p class="text-2xl font-bold">{{ welcomeMessage }}, {{ user?.email }} !</p>
      <VexaButton class="my-4" url="https://discord.splrge.dev" text="Besoin d'aide ?" />
    </div>
  </div>
</template>
