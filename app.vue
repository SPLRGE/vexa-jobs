<script lang="ts" setup>
useHead({
  bodyAttrs: {
    class: 'bg-white font-sans text-black',
  },
})

useSeoMeta({
  ogSiteName: 'Vexa - Jobs',
  ogImage: '/vexa_large_image.png',
  twitterCard: 'summary_large_image',
  twitterImage: '/vexa_large_image.png',
  twitterImageAlt: 'Vexa Jobs Banner',
  twitterSite: '@VexaStudio',
  description: 'Découvrez tous les postes disponibles chez Vexa Studio',
  ogDescription: 'Découvrez tous les postes disponibles chez Vexa Studio',
  twitterDescription: 'Découvrez tous les postes disponibles chez Vexa Studio',
  ogUrl: 'https://jobs.vexastudio.com',
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>
