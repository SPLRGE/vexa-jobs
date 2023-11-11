<script setup lang="ts">
import { insertCategorySchema } from '~/db/schema'

const schema = insertCategorySchema.pick({
  name: true,
})
const state = ref({
  name: '',
})

const successCallback = () => {
  useCategoriesStore().fetchCategories()
}
</script>

<template>
  <SlideOverModel
    is-open-state="isCategoryAddSlideOverOpen"
    :schema="schema"
    :state="state"
    route="/api/category"
    method="POST"
    title="Ajouter une catégorie"
    success-toast-message="La catégorie a bien été créée"
    submit-button-text="Ajouter"
    :success-callback="successCallback"
  >
    <UFormGroup label="Nom" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>
  </SlideOverModel>
</template>
