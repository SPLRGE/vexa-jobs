<script setup lang="ts">
useHead({
  meta: [
    {
      name: 'robots',
      content: 'noindex',
    },
  ],
})
</script>

<template>
  <div class="space-y-4">
    <h1 class="mt-6 text-2xl font-bold">Créer le premier utilisateur</h1>
    <p class="text-gray-500">Cet utilisateur sera un administrateur</p>
    <InitializeForm />
  </div>
</template>
