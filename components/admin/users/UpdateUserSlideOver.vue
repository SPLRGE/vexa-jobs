<script setup lang="ts">
import { insertUserSchema } from '~/db/schema'

const user = useCurrentUser()
const schema = insertUserSchema.pick({
  id: true,
  email: true,
  password: true,
  role: true,
})
const state = ref({
  id: user.value?.id,
  email: user.value?.email,
  password: undefined,
  role: user.value?.role,
})
watch(user, () => {
  state.value.id = user.value?.id
  state.value.email = user.value?.email
  state.value.role = user.value?.role
})
const options = ref(['ADMIN', 'USER'])
</script>

<template>
  <SlideOverModel
    is-open-state="isUserUpdateSlideOverOpen"
    :schema="schema"
    :state="state"
    route="/api/user"
    method="PUT"
    title="Modifier un utilisateur"
    success-toast-message="L'utilisateur a bien été modifié"
    submit-button-text="Modifier"
  >
    <UFormGroup label="ID" name="id">
      <UInput v-model="state.id" type="text" disabled />
    </UFormGroup>
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
