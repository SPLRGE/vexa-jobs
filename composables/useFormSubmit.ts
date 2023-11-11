import type { Ref } from 'vue'
import type { NitroFetchOptions } from 'nitropack'

export const useFormSubmit = (
  onSuccessCallback: (data: any) => void,
  route: string,
  loading: Ref<boolean> | null,
  options: NitroFetchOptions<ResponseType> = {},
  finallyCallback?: () => void
) => {
  if (loading) loading.value = true // loading is a ref
  $fetch(route, options)
    .then(data => {
      onSuccessCallback(data)
    })
    .catch(err => {
      useToast().add({ title: 'Erreur', description: err.data.message, color: 'red' })
    })
    .finally(() => {
      if (loading) loading.value = false
      if (finallyCallback) {
        finallyCallback()
      }
    })
}
