<script setup lang="ts">
import { insertCategorySchema } from '~/db/schema'

const category = useCurrentCategory()
const schema = insertCategorySchema.pick({
  id: true,
})
const state = ref({
  id: category.value?.id,
  name: category.value?.name,
})
watch(category, () => {
  state.value.id = category.value?.id
  state.value.name = category.value?.name
})
</script>

<template>
  <SlideOverModel
    is-open-state="isCategoryDeleteSlideOverOpen"
    :schema="schema"
    :state="state"
    route="/api/category"
    method="DELETE"
    title="Supprimer une catégorie"
    success-toast-message="La catégorie a bien été supprimée"
    submit-button-text="Supprimer définitivement"
    button-color="red"
  >
    <UFormGroup label="ID" name="id"> <UInput v-model="state.id" type="text" :disabled="true" /> </UFormGroup>
    <UFormGroup label="Nom" name="name">
      <UInput v-model="state.name" :disabled="true" />
    </UFormGroup>

    <template #pre-form>
      <p class="mb-4 italic text-gray-500">
        Attention, la suppression de cette catégorie entrainera la
        <span class="font-bold">suppression automatique</span> et irréversible des postes associés !
      </p>
    </template>
  </SlideOverModel>
</template>
