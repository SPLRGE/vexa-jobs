<script lang="ts" setup>
definePageMeta({
  layout: 'protected',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Vexa Jobs - Admin - Postes',
})

const { user } = storeToRefs(useUserStore())
const requestQuery = user.value?.role === 'ADMIN' ? { adminMode: true } : {}
const currentPost = useCurrentPost()
const isPostAddSliderOverOpen = useIsPostAddSlideOverOpen()
const isPostUpdateSlideOverOpen = useIsPostUpdateSlideOverOpen()
const isPostDeleteSlideOverOpen = useIsPostDeleteSlideOverOpen()
const q = ref('')
const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'title',
    label: 'Titre',
    sortable: true,
  },
  {
    key: 'isActive',
    label: 'Est actif',
    sortable: true,
  },
  {
    key: 'clicks',
    label: 'Clics',
    sortable: true,
  },
  {
    key: 'category.name',
    label: 'Catégorie',
    sortable: true,
  },
  {
    key: 'createdBy.email',
    label: 'Créé par',
    sortable: true,
  },
  {
    key: 'actions',
  },
]
const {
  data: posts,
  pending,
  refresh,
} = useLazyFetch('/api/post/all', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${useAuthStore().token}`,
  },
  query: requestQuery,
})
watch(posts, () => {
  posts.value = posts.value?.map(post => {
    return {
      ...post,
      isActive: post.isActive !== undefined ? post.isActive : true,
      clicks: post.clicks !== undefined ? post.clicks : Number.NaN,
      createdBy: {
        email: post.createdBy?.email ? post.createdBy.email : 'Inconnu',
      },
    }
  })
})
const filteredRows = computed(() => {
  if (!q.value || posts.value == null) {
    return posts.value
  }

  return posts.value.filter((post: any) => {
    return Object.values(post).some(value => {
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
        currentPost.value = row
        isPostUpdateSlideOverOpen.value = true
      },
      disabled: user.value?.role !== 'ADMIN',
    },
    {
      label: 'Supprimer',
      icon: 'i-mdi-delete',
      click: () => {
        currentPost.value = row
        isPostDeleteSlideOverOpen.value = true
      },
      disabled: user.value?.role !== 'ADMIN',
    },
  ],
]
</script>

<template>
  <div class="mt-6">
    <div class="flex flex-row justify-between">
      <UInput v-model="q" placeholder="Rechercher par nom" />
      <div class="space-x-4">
        <UButton color="primary" icon="i-mdi-plus" @click="isPostAddSliderOverOpen = true" />
        <UButton color="gray" icon="i-mdi-refresh" @click="refresh" />
      </div>
    </div>
    <UTable :columns="columns" :loading="pending" :rows="filteredRows" :sort="{ column: 'id', direction: 'desc' }">
      <template #isActive-data="{ row }">
        <div class="flex items-center">
          <span class="h-4 w-4 rounded-full" :class="row.isActive ? 'bg-green-500' : 'bg-red-500'"></span>
        </div>
      </template>
      <template #actions-data="{ row }">
        <div class="text-right">
          <UDropdown :items="moreButtonItems(row)">
            <UButton color="gray" icon="i-mdi-settings-outline" variant="ghost" />
          </UDropdown>
        </div>
      </template>
    </UTable>

    <AddPostSlideOver @refresh="refresh" />
    <UpdatePostSlideOver @refresh="refresh" />
    <DeletePostSlideOver @refresh="refresh" />
  </div>
</template>
