<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'
import { insertUserSchema } from '~/db/schema'
import { useFormSubmit } from '~/composables/useFormSubmit'

const form = ref()
const loading = ref(false)
const schema = insertUserSchema.pick({ email: true, password: true })
const state = ref({ email: undefined, password: undefined })

const submit = (event: FormSubmitEvent<z.output<typeof schema>>) => {
  return useFormSubmit(
    data => {
      useAuthStore().setToken(data.token)
      navigateTo('/admin')
    },
    '/api/auth/login',
    loading,
    {
      retry: 0,
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
  <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="submit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>
    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>
    <UButton :loading="loading" class="mt-4" type="submit">Connexion</UButton>
  </UForm>
</template>
