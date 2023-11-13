<script lang="ts" setup>
import type { UseFetchOptions } from '#app'

const authStore = useAuthStore()
const userStore = useUserStore()

const { data } = await useFetch('/api/user/me', {
  headers: {
    Authorization: 'Bearer ' + authStore.token,
  },
  method: 'GET',
} as UseFetchOptions<any>)
userStore.setUser(data.value.user || null)
const { user } = storeToRefs(userStore)

const isOpen = ref(false)

const items = [
  [
    {
      label: 'Mon compte',
      icon: 'i-mdi-account-circle',
      to: '/admin/account',
    },
    {
      label: 'Se déconnecter',
      icon: 'i-mdi-logout',
      click: () => authStore.logout(),
    },
  ],
]
</script>

<template>
  <div>
    <div class="hidden flex flex-row justify-between py-4">
      <div class="flex flex-row items-center space-x-6">
        <NuxtLink to="/admin">
          <svg fill="none" height="30" viewBox="0 0 58 42" width="58" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M37.3174 41.8655H22.2817L0 0H10.4671C14.2244 0 17.6559 2.13098 19.3226 5.498L37.3174 41.8655Z"
              fill="#06F47C"
            />
            <path
              d="M39.8225 36.7768L58 0H47.3311C43.6795 0 40.3257 2.01434 38.6099 5.23758L31.1519 19.247L39.8225 36.7768Z"
              fill="#06F47C"
            />
          </svg>
        </NuxtLink>
        <div class="border border-black py-4"></div>
        <NuxtLink
          class="border-b-2 border-transparent hover:border-primary-green-500"
          to="/admin/users"
          active-class="!border-primary-green-500"
        >Utilisateurs</NuxtLink
        >
        <NuxtLink
          class="border-b-2 border-transparent hover:border-primary-green-500"
          to="/admin/posts"
          active-class="!border-primary-green-500"
        >Postes</NuxtLink
        >
        <NuxtLink
          class="border-b-2 border-transparent hover:border-primary-green-500"
          to="/admin/categories"
          active-class="!border-primary-green-500"
        >Catégories</NuxtLink
        >
      </div>
      <div class="flex flex-row items-center space-x-2">
        <UDropdown :items="items">
          <div class="flex flex-row items-center">
            <span>{{ user?.email }}</span>
            <UIcon name="i-mdi-chevron-down" />
          </div>
        </UDropdown>
      </div>
    </div>

    <!-- burger menu mobiles -->
    <div>
      <div class="flex flex-row justify-between p-4 items-center">
        <NuxtLink to="/admin">
          <svg fill="none" height="25" viewBox="0 0 58 42" width="58" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M37.3174 41.8655H22.2817L0 0H10.4671C14.2244 0 17.6559 2.13098 19.3226 5.498L37.3174 41.8655Z"
              fill="#06F47C"
            />
            <path
              d="M39.8225 36.7768L58 0H47.3311C43.6795 0 40.3257 2.01434 38.6099 5.23758L31.1519 19.247L39.8225 36.7768Z"
              fill="#06F47C"
            />
          </svg>
        </NuxtLink>
        <UIcon class="text-xl" :name="isOpen ? 'i-mdi-close' : 'i-mdi-menu'" @click="isOpen = !isOpen" />
      </div>

      <div v-if="isOpen" class="flex flex-col">
        <NuxtLink
          class="bg-transparent p-2 rounded hover:bg-gray-100"
          to="/admin/users"
          active-class="!bg-gray-100"
        >Utilisateurs</NuxtLink
        >
        <NuxtLink
          class="bg-transparent p-2 rounded hover:bg-gray-100"
          to="/admin/posts"
          active-class="!bg-gray-100"
        >Postes</NuxtLink
        >
        <NuxtLink
          class="bg-transparent p-2 rounded hover:bg-gray-100"
          to="/admin/categories"
          active-class="!bg-gray-100"
        >Catégories</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
