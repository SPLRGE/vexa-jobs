<script lang="ts" setup>
definePageMeta({
  layout: 'protected',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Vexa Jobs - Admin - Catégories',
})

const { user } = storeToRefs(useUserStore())
const isCategoryAddSliderOverOpen = useIsCategoryAddSlideOverOpen()
const isCategoryUpdateSlideOverOpen = useIsCategoryUpdateSlideOverOpen()
const isCategoryDeleteSlideOverOpen = useIsCategoryDeleteSlideOverOpen()
const currentCategory = useCurrentCategory()
const q = ref('')
const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: 'Nom',
    sortable: true,
  },
  {
    key: 'actions',
  },
]
const {
  data: categories,
  pending,
  refresh,
} = useLazyFetch('/api/category/all', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${useAuthStore().token}`,
  },
})
const filteredRows = computed(() => {
  if (!q.value || categories.value == null) {
    return categories.value
  }

  return categories.value.filter((category: any) => {
    return Object.values(category).some(value => {
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
        currentCategory.value = row
        isCategoryUpdateSlideOverOpen.value = true
      },
      disabled: user.value?.role !== 'ADMIN',
    },
    {
      label: 'Supprimer',
      icon: 'i-mdi-delete',
      click: () => {
        currentCategory.value = row
        isCategoryDeleteSlideOverOpen.value = true
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
        <UButton color="primary" icon="i-mdi-plus" @click="isCategoryAddSliderOverOpen = true" />
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

    <AddCategorySlideOver @refresh="refresh" />
    <UpdateCategorySlideOver @refresh="refresh" />
    <DeleteCategorySlideOver @refresh="refresh" />
  </div>
</template>
