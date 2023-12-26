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

function disconnect() {
  useAuthStore().logout()
}
</script>

<template>
  <div class="mt-4">
    <div class="flex flex-row flex-wrap justify-between">
      <p class="text-2xl font-bold">{{ welcomeMessage }}, {{ user?.email }} !</p>
      <VexaButton class="my-4" url="https://discord.splrge.dev" text="Besoin d'aide ?" />
    </div>
    <div>
      <p class="font-bold">Liens</p>
      <ul class="list-inside list-disc">
        <li>
          <NuxtLink to="/" class="text-blue-500 hover:underline">Accueil</NuxtLink>
        </li>
        <li>
          <NuxtLink to="https://discord.gg/YGdRcZhBsZ" target="_blank" class="text-blue-500 hover:underline"
            >Discord Vexa</NuxtLink
          >
          <CopyButton content="https://discord.gg/YGdRcZhBsZ" />
        </li>
      </ul>
    </div>
    <div class="mt-8 flex flex-row items-center justify-between md:hidden">
      <NuxtLink to="/admin/account" class="rounded bg-blue-500 px-4 py-2 dark:bg-blue-800">Mon compte</NuxtLink>
      <ColorModeButton />
      <NuxtLink to="#" class="rounded bg-red-500 px-4 py-2 dark:bg-red-800" @click="disconnect"
        >Se déconnecter</NuxtLink
      >
    </div>
  </div>
</template>
