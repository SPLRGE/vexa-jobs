<script setup lang="ts">
import type { UnwrapRef } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const props = defineProps<{
  isOpenState: string
  schema: z.ZodSchema<any>
  state: UnwrapRef<any>
  route: string
  method: 'POST' | 'PUT' | 'DELETE'
  title: string
  successToastMessage: string
  submitButtonText: string
  buttonColor?: string
  successCallback?: () => void
}>()

const emit = defineEmits(['refresh'])
const form = ref()
const toast = useToast()
const loading = ref(false)
const isOpen = useState(props.isOpenState)

const submit = (event: FormSubmitEvent<z.output<typeof props.schema>>) => {
  useFormSubmit(
    () => {
      toast.add({ title: 'Succès', description: props.successToastMessage, color: 'green' })
      Object.keys(props.state).forEach(key => {
        // eslint-disable-next-line vue/no-mutating-props
        props.state[key] = ''
      })
      emit('refresh')
      if (props.successCallback) {
        props.successCallback()
      }
    },
    props.route,
    loading,
    {
      method: props.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      body: event.data,
    },
    () => {
      isOpen.value = false
    }
  )
}
</script>

<template>
  <USlideover v-model="isOpen">
    <UCard
      :ui="{
        divide: 'divide-none',
        ring: 'ring-0',
        shadow: 'shadow-none',
      }"
    >
      <template #header>
        <div class="flex justify-between">
          <p class="text-2xl font-bold">{{ title }}</p>
          <UButton icon="i-mdi-close" variant="ghost" color="red" @click="isOpen = false" />
        </div>
      </template>

      <slot name="pre-form" />
      <UForm :ref="form" :state="state" :schema="schema" class="space-y-4" @submit="submit">
        <slot />
        <UButton :loading="loading" class="mt-4" type="submit" :color="buttonColor ? buttonColor : 'primary-green'">{{
          submitButtonText
        }}</UButton>
      </UForm>
    </UCard>
  </USlideover>
</template>
