<script lang="ts" setup>
definePageMeta({
  layout: 'protected',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Vexa Jobs - Admin - Utilisateurs',
})

const { user } = storeToRefs(useUserStore())
const currentUser = useCurrentUser()
const isUserAddSliderOverOpen = useIsUserAddSlideOverOpen()
const isUserUpdateSlideOverOpen = useIsUserUpdateSlideOverOpen()
const isUserDeleteSlideOverOpen = useIsUserDeleteSlideOverOpen()
const q = ref('')
const columns = [
  {
    key: 'id',
    label: 'ID',
    sortable: true,
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
  },
  {
    key: 'role',
    label: 'Rôle',
  },
  {
    key: 'actions',
  },
]
const {
  data: users,
  pending,
  refresh,
} = useLazyFetch('/api/user/all', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${useAuthStore().token}`,
  },
})

const filteredRows = computed(() => {
  if (!q.value || users.value == null) {
    return users.value
  }

  return users.value.filter((user: any) => {
    return Object.values(user).some(value => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})
const moreButtonItems = (row: any) => [
  [
    {
      label: 'Modifier',
      icon: 'i-mdi-pencil',
      click: () => {
        currentUser.value = row
        isUserUpdateSlideOverOpen.value = true
      },
    },
    {
      label: 'Supprimer',
      icon: 'i-mdi-delete',
      click: () => {
        currentUser.value = row
        isUserDeleteSlideOverOpen.value = true
      },
    },
  ],
]
</script>

<template>
  <div class="mt-6">
    <div v-if="user?.role == 'ADMIN'">
      <div class="flex flex-row justify-between">
        <UInput v-model="q" placeholder="Rechercher par email" />
        <div class="space-x-4">
          <UButton color="primary" icon="i-mdi-plus" @click="isUserAddSliderOverOpen = true" />
          <UButton color="gray" icon="i-mdi-refresh" @click="refresh" />
        </div>
      </div>
      <UTable :columns="columns" :loading="pending" :rows="filteredRows" :sort="{ column: 'id', direction: 'desc' }">
        <template #actions-data="{ row }">
          <div class="text-right">
            <UDropdown :items="moreButtonItems(row)">
              <UButton color="gray" icon="i-mdi-settings-outline" variant="ghost" />
            </UDropdown>
          </div>
        </template>
      </UTable>

      <AddUserSlideOver @refresh="refresh" />
      <UpdateUserSlideOver @refresh="refresh" />
      <DeleteUserSlideOver @refresh="refresh" />
    </div>
    <div v-else class="text-center text-gray-500">
      <UIcon name="i-mdi-lock" class="text-6xl" />
      <p class="italic">Vous n'avez pas l'autorisation de voir les utilisateurs...</p>
    </div>
  </div>
</template>
