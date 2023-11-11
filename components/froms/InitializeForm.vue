<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'
import { insertUserSchema } from '~/db/schema'

const form = ref()
const loading = ref(false)
const schema = insertUserSchema.pick({
  email: true,
  password: true,
  role: true,
})
const state = ref({
  email: '',
  password: '',
  role: 'ADMIN',
})

const submit = (event: FormSubmitEvent<z.output<typeof schema>>) => {
  useFormSubmit(
    () => {
      navigateTo('/admin')
    },
    '/api/initialize',
    loading,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event.data),
    }
  )
}
</script>

<template>
  <UForm :ref="form" :schema="schema" :state="state" class="space-y-4" @submit="submit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" type="email" />
    </UFormGroup>
    <UFormGroup label="Mot de passe" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>
    <UButton type="submit" :loading="loading">Démarrer...</UButton>
  </UForm>
</template>
