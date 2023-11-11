<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { insertUserSchema } from '~/db/schema'

const options = ref(['ADMIN', 'USER'])
const schema = insertUserSchema.pick({ email: true, password: true, role: true })
const { token } = storeToRefs(useAuthStore())
const { user } = storeToRefs(useUserStore())
const state = ref({
  email: user.value?.email,
  password: undefined,
  role: user.value?.role,
})
const form = ref()
const loading = ref(false)
const toast = useToast()

const submit = (event: FormSubmitEvent<z.output<typeof schema>>) => {
  loading.value = true
  return $fetch('/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({
      id: user.value?.id,
      ...event.data,
    }),
  })
    .then(() => {
      toast.add({ title: 'Succès', description: 'Votre compte a bien été modifié', color: 'green' })
    })
    .catch(err => toast.add({ title: 'Erreur', description: err.data.message, color: 'red' }))
    .finally(() => (loading.value = false))
}
</script>

<template>
  <UCard>
    <template #header>
      <p class="text-2xl">Modifier votre compte</p>
    </template>

    <UForm ref="form" :schema="schema" :state="state" @submit="submit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>
      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>
      <UFormGroup label="Role" name="role">
        <USelect v-model="state.role" :options="options" />
      </UFormGroup>
      <UButton :loading="loading" class="mt-4" type="submit">Modifier</UButton>
    </UForm>
  </UCard>
</template>
