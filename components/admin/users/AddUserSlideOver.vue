<script setup lang="ts">
import { insertUserSchema } from '~/db/schema'

const schema = insertUserSchema.pick({
  email: true,
  password: true,
  role: true,
})
const state = ref({
  email: '',
  password: '',
  role: 'USER',
})
const options = ref(['ADMIN', 'USER'])
</script>

<template>
  <SlideOverModel
    is-open-state="isUserAddSlideOverOpen"
    :schema="schema"
    :state="state"
    route="/api/user"
    method="POST"
    title="Ajouter un utilisateur"
    success-toast-message="L'utilisateur a bien été créé"
    submit-button-text="Ajouter"
  >
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" type="email" />
    </UFormGroup>
    <UFormGroup label="Mot de passe" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>
    <UFormGroup label="Rôle" name="role">
      <USelect v-model="state.role" :options="options" />
    </UFormGroup>
  </SlideOverModel>
</template>
