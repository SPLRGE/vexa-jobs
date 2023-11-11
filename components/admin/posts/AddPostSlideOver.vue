<script setup lang="ts">
import { z } from 'zod'
import { insertPostSchema, stringToNumber } from '~/db/schema'

// @ts-ignore
const schema = insertPostSchema
  .omit({
    id: true,
    createdBy: true,
    createdAt: true,
    clicks: true,
  })
  .merge(
    z.object({
      categoryId: z
        .number()
        .or(stringToNumber("L'identifiant de la catégorie doit être un nombre"))
        .transform(value => Number(value)),
    })
  )

const state = ref({
  title: '',
  description: '',
  link: '',
  isActive: true,
  categoryId: 0 as number,
})

const categoriesStore = useCategoriesStore()
categoriesStore.fetchCategoriesIfNot()
const { categories } = storeToRefs(categoriesStore)
</script>

<template>
  <SlideOverModel
    is-open-state="isPostAddSlideOverOpen"
    :schema="schema"
    :state="state"
    route="/api/post"
    method="POST"
    title="Ajouter un poste"
    success-toast-message="Le poste a bien été créé"
    submit-button-text="Ajouter"
  >
    <UFormGroup label="Titre" name="title">
      <UInput v-model="state.title" />
    </UFormGroup>
    <UFormGroup label="Description" name="description">
      <UInput v-model="state.description" />
    </UFormGroup>
    <UFormGroup label="Lien" name="link">
      <UInput v-model="state.link" />
    </UFormGroup>
    <UFormGroup label="Est actif" name="isActive">
      <UCheckbox v-model="state.isActive" />
    </UFormGroup>
    <UFormGroup label="Catégorie" name="categoryId">
      <USelect v-model="state.categoryId" :options="categories" option-attribute="name" />
    </UFormGroup>
  </SlideOverModel>
</template>
