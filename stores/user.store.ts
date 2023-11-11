export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | {
      id: number
      email: string
      role: 'USER' | 'ADMIN'
    },
  }),

  actions: {
    setUser(user: { id: number; email: string; role: 'USER' | 'ADMIN' } | null) {
      this.user = user
    },
  },

  getters: {
    isUserSet: state => !!state.user,
    isAdmin: state => state.user?.role === 'ADMIN',
  },
})
