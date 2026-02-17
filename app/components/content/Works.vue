<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { locale } = useI18n()

const { data: projects } = await useAsyncData('projects', async () => {
  const collection = ('projects_' + locale.value) as keyof Collections
  return await queryCollection(collection).all() as Collections['projects_en'][] | Collections['projects_fr'][]
}, {
  watch: [locale],
})
</script>

<template>
  <section class="mx-auto mt-4 flex max-w-5xl flex-col gap-8 px-6 pb-16 pt-6 sm:mt-20">
    <div class="flex flex-col gap-3 text-center">
      <h1 class="font-newsreader italic text-white-shadow text-4xl sm:text-5xl">
        <slot
          name="title"
          mdc-unwrap="p"
        />
      </h1>
      <h2 class="text-center text-lg font-extralight italic text-muted">
        <slot
          name="subtitle"
          mdc-unwrap="p"
        />
      </h2>
    </div>
    <Divider class="mb-2 mt-1" />
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="project in projects"
        :key="project.name"
        :project
        variant="grid"
      />
    </div>
  </section>
</template>
