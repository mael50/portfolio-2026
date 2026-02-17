<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
})

function handleError() {
  clearError({ redirect: '/' })
}

function goBack() {
  clearError()
  useRouter().back()
}

const statusCode = computed(() => Number(props.error?.statusCode ?? 500))

const copy = computed(() => {
  switch (statusCode.value) {
    case 404:
      return {
        title: 'Page introuvable',
        subtitle: "La page que vous cherchez n'existe plus ou a été déplacée.",
      }
    case 401:
    case 403:
      return {
        title: 'Accès refusé',
        subtitle: "Vous n'avez pas les droits nécessaires pour voir cette page.",
      }
    case 500:
      return {
        title: 'Erreur serveur',
        subtitle: "Une erreur est survenue côté serveur. On regarde ça.",
      }
    default:
      return {
        title: "Quelque chose s'est mal passé",
        subtitle: 'Un incident inattendu est survenu. Essayez à nouveau.',
      }
  }
})
</script>

<template>
  <main
    class="relative isolate grid min-h-screen place-items-center overflow-hidden bg-zinc-950 px-6 py-24 sm:py-32 lg:px-8">
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" />
      <div class="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
    </div>

    <div class="relative mx-auto max-w-xl text-center">
      <p class="text-accent text-sm font-semibold uppercase tracking-[0.3em]">
        Erreur {{ statusCode }}
      </p>
      <h1 class="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        {{ copy.title }}
      </h1>
      <p class="mt-4 text-base leading-7 text-neutral-300 sm:text-lg">
        {{ copy.subtitle }}
      </p>
      <p v-if="error?.message" class="mt-4 text-sm text-neutral-500">
        {{ error.message }}
      </p>

      <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          class="bg-accent hover:bg-accent-hover cursor-pointer rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm transition"
          @click="handleError">
          Retour à l’accueil
        </button>
        <NuxtLink
          to="/contact"
          class="cursor-pointer rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40">
          Me contacter
        </NuxtLink>
        <button
          class="cursor-pointer rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40"
          @click="goBack">
          Page précédente
        </button>
      </div>
    </div>
  </main>
</template>
