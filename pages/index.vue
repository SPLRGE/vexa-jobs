<script lang="ts" setup>
useSeoMeta({
  title: 'Vexa - Jobs',
})

const { data, pending } = useLazyFetch('/api/category/posts')

const route = useRoute()
const isLoggedOutModalOpen = ref(route.query.loggedOut === 'true')
const isAccountDeletedModalOpen = ref(route.query.accountDeleted === 'true')
useRouter().replace({ query: { loggedOut: undefined, accountDeleted: undefined } })
</script>

<template>
  <div>
    <UModal v-model="isLoggedOutModalOpen">
      <UCard>
        <template #header>
          <div class="flex items-center">
            <UIcon class="text-3xl text-primary-green-500" name="i-mdi-check-circle" />
            <div class="ml-4">
              <h1 class="text-xl font-bold">Déconnexion réussie</h1>
            </div>
          </div>
        </template>

        <p>Vous avez été déconnecté.</p>
      </UCard>
    </UModal>

    <UModal v-model="isAccountDeletedModalOpen">
      <UCard>
        <template #header>
          <div class="flex items-center">
            <UIcon class="text-3xl text-primary-green-500" name="i-mdi-check-circle" />
            <div class="ml-4">
              <h1 class="text-xl font-bold">Compte supprimé</h1>
            </div>
          </div>
        </template>

        <p>Votre compte et toutes sont données ont bien été supprimés.</p>
      </UCard>
    </UModal>

    <!-- Nous cherchons des gens talentueux -->
    <div class="mb-4 mt-8 text-4xl font-bold">
      Nous cherchons <br />
      <TextGradient text="des gens talentueux" />.
    </div>
    <p>
      Chez Vexa Studio, nous cherchons des gens talentueux, créatifs & motivés à joindre notre équipe. Vous répondez à
      ces critères? Nous serons ravis de vous accueillir.
    </p>

    <!-- Pourquoi travailler chez nous -->
    <div class="mb-4 mt-8 text-3xl font-bold">
      <span>Pourquoi travailler</span> <br />
      <TextGradient text="chez nous" />?
    </div>
    <p>En plus d’avoir la chance de travailler dans un studio réputé, travailler chez nous comporte des avantages:</p>
    <ul class="list-inside list-disc leading-loose marker:text-primary-green-500">
      <li>Choisissez les commandes que vous désirez faire.</li>
      <li>Horaire extrêmement flexible.</li>
      <li>Salaire évolutif et avantageux.</li>
    </ul>

    <!-- Postes actuellement disponibles -->
    <div class="mb-4 mt-8 text-3xl font-bold">
      <span>Postes actuellement</span> <br />
      <TextGradient text="disponibles" />:
    </div>
    <p>Saisissez votre chance pour travailler au sein d’une équipe dynamique et évolutive!</p>

    <UProgress v-if="pending" animation="carousel" class="my-6" />
    <p v-else-if="!data || !Array.isArray(data) || data?.length == 0" class="my-4 italic text-gray-500">
      Aucun poste n’est actuellement disponible.
    </p>
    <PostsCategory
      v-for="category in data"
      v-else-if="data"
      :key="category.id"
      :name="category.name"
      :posts="category.posts"
    />
    <VexaError v-else>
      <p>Impossible de charger les postes.</p>
    </VexaError>

    <!-- Nous contacter -->
    <div class="mb-4 mt-8 text-3xl font-bold">
      <p>Nous <TextGradient text="contacter" />.</p>
    </div>
    <p>En cas de questions ou de commentaires, n’hésitez pas à entrer en contact avec nous.</p>
    <VexaButton class="my-4" text="Nous contacter" url="https://vexastudio.com/contact" />
  </div>
</template>

<style scoped></style>
