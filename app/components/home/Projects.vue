<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { locale } = useI18n()
const localePath = useLocalePath()

const { data: projects } = await useAsyncData('projects', async () => {
  const collection = ('projects_' + locale.value) as keyof Collections
  return await queryCollection(collection).all() as Collections['projects_en'][] | Collections['projects_fr'][]
}, {
  watch: [locale],
})
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <h3 class="font-newsreader italic text-white-shadow text-3xl sm:text-4xl">
      {{ $t("navigation.works") }}
    </h3>
    <div class="flex w-full gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
      <div v-for="project in projects?.filter((work) => work.featured)" :key="project.name"
        class="min-w-[300px] sm:min-w-[400px] snap-start">
        <ProjectCard :project="project" />
      </div>

      <NuxtLinkLocale to="/works"
        class="group relative flex min-w-[200px] sm:min-w-[250px] snap-start cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10 hover:scale-[1.02]">
        <div
          class="size-14 flex items-center justify-center rounded-full border border-white/10 bg-white/5 transition-transform duration-500 group-hover:rotate-45">
          <UIcon name="heroicons:arrow-up-right" class="size-6 text-white" />
        </div>
        <span class="font-newsreader italic text-lg text-white-shadow">{{ $t("global.see_more") }}</span>
      </NuxtLinkLocale>
    </div>
    <div class="flex">
      <NuxtLinkLocale to="/works" class="group flex items-center gap-2">
        <span class="font-newsreader italic text-xl text-white-shadow transition-all group-hover:mr-2">
          {{ $t("global.see_more") }}
        </span>
        <div
          class="flex size-8 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all group-hover:bg-white/10 group-hover:border-white/40">
          <UIcon name="heroicons:arrow-right" class="size-4 text-white transition-transform group-hover:-rotate-45" />
        </div>
      </NuxtLinkLocale>
    </div>
  </div>
</template>
