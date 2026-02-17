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

  const carouselItems = computed(() => {
    const items = (projects.value || [])
      .filter((work) => work.featured)
      .map((p) => ({ type: 'project', data: p }))

    return [
      ...items,
      { type: 'see-more' }
    ]
  })

  const carousel = ref()
</script>

<template>
  <div class="flex w-full flex-col gap-6 sm:gap-8">
    <div class="flex items-center justify-between px-1">
      <h3 class="font-newsreader italic text-white-shadow text-3xl sm:text-4xl">
        {{ $t("navigation.works") }}
      </h3>

      <div class="hidden sm:flex items-center gap-2">
        <UButton variant="ghost" icon="i-heroicons-arrow-left" class="rounded-full text-white hover:bg-white/10"
          @click="carousel?.emblaApi?.scrollPrev()" />
        <UButton variant="ghost" icon="i-heroicons-arrow-right" class="rounded-full text-white hover:bg-white/10"
          @click="carousel?.emblaApi?.scrollNext()" />
      </div>
    </div>

    <UCarousel ref="carousel" v-slot="{ item }: { item: any }" :items="carouselItems" :ui="{
      item: 'basis-[85%] sm:basis-1/2 lg:basis-1/3 snap-start',
      container: 'gap-4 sm:gap-6 py-2 px-1',
    }" class="w-full" indicators>
      <div class="h-full">
        <ProjectCard v-if="item.type === 'project'" :project="item.data" class="h-full w-full" />

        <NuxtLinkLocale v-else to="/works"
          class="group relative flex h-full min-h-[300px] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:shadow-xl hover:shadow-white/5">
          <div
            class="flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
            <UIcon name="heroicons:arrow-up-right" class="size-7 text-white" />
          </div>
          <span class="font-newsreader italic text-xl text-white-shadow">{{ $t("global.see_more") }}</span>
        </NuxtLinkLocale>
      </div>
    </UCarousel>
  </div>
</template>
