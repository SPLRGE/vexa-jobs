export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as null | string,
  }),

  getters: {
    isLoggedIn: state => !!state.token,
  },

  actions: {
    setToken(token: string | null) {
      this.token = token
    },
    logout() {
      this.token = null
      useUserStore().setUser(null)
      navigateTo({
        path: '/',
        query: {
          loggedOut: 'true',
        },
      })
    },
  },
})
