export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [] as { name: string; value: number }[],
  }),

  actions: {
    setCategories(categories: { name: string; value: number }[]) {
      this.categories = categories
    },
    fetchCategories() {
      useFormSubmit(
        data => {
          this.setCategories(
            data.map((category: { id: number; name: string }) => ({ name: category.name, value: category.id }))
          )
        },
        '/api/category/all',
        null,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${useAuthStore().token}`,
          },
        }
      )
    },
    fetchCategoriesIfNot() {
      if (this.categories.length === 0) {
        this.fetchCategories()
      }
    },
    fromIdToName(id: number) {
      return this.categories.find(category => category.value === id)?.name
    },
    fromNameToId(name: string) {
      return this.categories.find(category => category.name === name)?.value
    },
  },
})
