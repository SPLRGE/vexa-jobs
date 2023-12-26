<script lang="ts" setup>
const props = defineProps<{
  content: string
}>()

function copy() {
  navigator.clipboard.writeText(props.content)
  useToast().add({ title: 'Succès', description: 'Copie réussite !', color: 'green' })
}
</script>

<template>
  <UIcon name="i-mdi-content-copy" class="mx-1 cursor-pointer hover:underline" @click="copy()" />
</template>

<style scoped></style>
