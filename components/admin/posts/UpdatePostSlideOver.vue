<script setup lang="ts">
import { z } from 'zod'
import { insertPostSchema, stringToNumber } from '~/db/schema'

const post = useCurrentPost()
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
  id: post.value?.id,
  title: post.value?.title,
  description: post.value?.description,
  link: post.value?.link,
  isActive: post.value?.isActive,
  categoryId: post.value?.category.id,
})
watch(post, () => {
  state.value.id = post.value?.id
  state.value.title = post.value?.title
  state.value.description = post.value?.description
  state.value.link = post.value?.link
  state.value.isActive = post.value?.isActive
  state.value.categoryId = post.value?.category.id
})
const categoriesStore = useCategoriesStore()
categoriesStore.fetchCategoriesIfNot()
const { categories } = storeToRefs(categoriesStore)
</script>

<template>
  <SlideOverModel
    is-open-state="isPostUpdateSlideOverOpen"
    :schema="schema"
    :state="state"
    route="/api/post"
    method="PUT"
    title="Modifier un poste"
    success-toast-message="Le poste a bien été modifié"
    submit-button-text="Modifier"
  >
    <UFormGroup label="ID" name="id">
      <UInput v-model="state.id" :disabled="true" />
    </UFormGroup>
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
