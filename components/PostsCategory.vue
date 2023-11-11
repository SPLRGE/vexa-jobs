<script lang="ts" setup>
defineProps<{
  name: string
  posts: {
    id: string
    title: string
    description: string
    link: string
    category: {
      id: number
      name: string
    }
  }[]
}>()
</script>

<template>
  <div v-if="posts.length !== 0" class="my-6">
    <span class="text-2xl font-bold">{{ name }}</span>
    <div class="flex flex-col">
      <PostsCard
        v-for="post in posts"
        :id="post.id"
        :key="post.id"
        :description="post.description"
        :title="post.title"
      />
    </div>
  </div>
</template>

<style scoped></style>
