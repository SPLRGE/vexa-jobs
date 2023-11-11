<script lang="ts" setup>
const isModalOpen = ref(false)
const loading = ref(false)

const submit = () => {
  useFormSubmit(
    () => {
      useAuthStore().setToken(null)
      navigateTo({
        path: '/',
        query: {
          accountDeleted: 'true',
        },
      })
    },
    '/api/user',
    loading,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      body: {
        id: useUserStore().user?.id,
      },
    }
  )
}
</script>

<template>
  <UCard>
    <template #header>
      <p class="text-2xl">Supprimer votre compte</p>
    </template>

    <UButton class="mt-4" color="red" type="submit" @click="isModalOpen = true">Supprimer</UButton>
  </UCard>

  <UModal v-model="isModalOpen">
    <UCard>
      <template #header>
        <div class="flex items-center">
          <UIcon class="text-3xl text-red-500" name="i-mdi-warning" />
          <div class="ml-4">
            <h1 class="text-xl font-bold">Voulez-vous vraiment supprimer votre compte ?</h1>
          </div>
        </div>
      </template>

      <p>La suppression de votre compte est irreversible !</p>

      <template #footer>
        <div class="flex flex-row justify-between">
          <UButton color="red" type="submit" :loading="loading" @click="submit">Je veux supprimer mon compte</UButton>
          <UButton color="primary" @click="isModalOpen = false">Annuler</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
