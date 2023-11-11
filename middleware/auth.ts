export default defineNuxtRouteMiddleware(() => {
  if (!useAuthStore().isLoggedIn) {
    return navigateTo('/admin/login')
  }
})
