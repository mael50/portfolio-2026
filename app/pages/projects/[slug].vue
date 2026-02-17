<script setup lang="ts">
  import type { Collections } from '@nuxt/content'

  const route = useRoute()
  const { locale, t } = useI18n()
  const localePath = useLocalePath()
  const { seo, profile } = useAppConfig()
  const slug = route.params.slug as string

  const { data: project } = await useAsyncData(`project-${slug}-${locale.value}`, async () => {
    const collection = ('projects_' + locale.value) as keyof Collections
    const allProjects = await queryCollection(collection).all()
    return allProjects.find(p => p.stem.endsWith(`/${slug}`)) as Collections['projects_fr']
  }, {
    watch: [locale],
  })

  const { data: allProjects } = await useAsyncData(`projects-${locale.value}`, async () => {
    const collection = ('projects_' + locale.value) as keyof Collections
    return await queryCollection(collection).all() as Collections['projects_en'][] | Collections['projects_fr'][]
  }, {
    watch: [locale],
  })

  const otherProjects = computed(() => (allProjects.value || [])
    .filter(p => p.stem !== project.value?.stem)
    .slice(0, 2))

  const isSoon = computed(() => /soon|bient/i.test(project.value?.release || ''))
  const summary = computed(() => project.value?.summary || project.value?.description || '')
  const publishedDate = computed(() => {
    if (isSoon.value) return undefined
    if (project.value?.date) return project.value.date
    const yearMatch = project.value?.release?.match(/\d{4}/)?.[0]
    return yearMatch ? `${yearMatch}-01-01` : undefined
  })

  const router = useRouter()

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
    }
    else {
      router.push(localePath('/'))
    }
  }

  if (!project.value) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }

  const url = useRequestURL()
  const canonicalUrl = computed(() => {
    const path = url.pathname.endsWith('/') && url.pathname !== '/' ? url.pathname.slice(0, -1) : url.pathname
    return `${seo.url}${path}`
  })

  useSeoMeta({
    title: project.value.name,
    description: summary.value,
    ogSiteName: seo.title,
    ogTitle: project.value.name,
    ogDescription: summary.value,
    ogImage: project.value.image,
    ogUrl: canonicalUrl.value,
    author: profile.name,
    twitterTitle: project.value.name,
    twitterDescription: summary.value,
    twitterCard: 'summary_large_image',
  })

  useHead({
    link: [
      { rel: 'canonical', href: canonicalUrl.value },
    ],
  })

  useSchemaOrg([
    defineWebPage({
      '@type': 'CreativeWork' as any,
      name: project.value.name,
      description: summary.value,
      image: project.value.image,
      datePublished: publishedDate.value,
      url: canonicalUrl.value,
    }),
    defineBreadcrumb({
      itemListElement: [
        { name: t('navigation.home'), item: '/' },
        { name: t('navigation.works'), item: '/works' },
        { name: project.value.name, item: route.path },
      ],
    }),
  ])
</script>

<template>
  <div v-if="project" class="relative mx-auto max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8">
    <!-- Ambient Background -->
    <div
      class="pointer-events-none absolute inset-0 bg-center bg-grid-white/5 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]" />
    <div
      class="absolute -top-8 left-1/2 size-72 -translate-x-1/2 rounded-full bg-white/20 blur-[120px] lg:-top-8 lg:size-[40rem] lg:blur-[200px]" />

    <!-- Back Button -->
    <button
      class="group relative z-10 mb-12 flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white sm:mb-20"
      @click="goBack">
      <UIcon name="i-heroicons-arrow-left" class="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      {{ t('global.back') }}
    </button>

    <article class="relative z-10 flex flex-col gap-16 lg:gap-24">

      <!-- Header -->
      <header class="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
        <div
          class="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
          <time :datetime="publishedDate">{{ project.release }}</time>
          <template v-if="project.industry">
            <span class="h-0.5 w-0.5 rounded-full bg-white/20" />
            <span>{{ project.industry }}</span>
          </template>
          <template v-if="project.role">
            <span class="h-0.5 w-0.5 rounded-full bg-white/20" />
            <span>{{ project.role }}</span>
          </template>
        </div>

        <h1 class="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl leading-[0.9]">
          {{ project.name }}
        </h1>

        <p v-if="summary" class="text-xl leading-relaxed text-white/60 sm:text-2xl max-w-2xl">
          {{ summary }}
        </p>

        <div v-if="project.link" class="mt-4">
          <NuxtLink :to="project.link" target="_blank"
            class="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white transition hover:bg-white/10 hover:border-white/20">
            {{ t('global.project_visit_site') }}
            <UIcon name="i-heroicons-arrow-up-right"
              class="h-5 w-5 text-white/40 transition-colors group-hover:text-white" />
          </NuxtLink>
        </div>
      </header>

      <!-- Featured Image (Banner) -->
      <div v-if="project.image || project.body?.banner"
        class="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
        <NuxtImg :src="project.body?.banner ?? project.image" :alt="project.name"
          class="w-full h-auto scale-105 object-cover" sizes="100vw sm:100vw md:100vw lg:1280px" />
      </div>

      <!-- Main Content Grid -->
      <div class="grid gap-16 lg:grid-cols-[1fr_20rem] lg:gap-24">

        <!-- Text Content -->
        <div class="flex flex-col gap-12 text-lg leading-relaxed text-white/80 sm:text-xl">

          <!-- Introduction -->
          <p v-if="project.description" class="text-white/90 font-light">
            {{ project.description }}
          </p>

          <!-- Client Context -->
          <p v-if="project.about_client">
            {{ project.about_client }}
          </p>

          <!-- Project Challenge/Solution -->
          <p v-if="project.about_project">
            {{ project.about_project }}
          </p>

          <!-- Gallery -->
          <section v-if="project.gallery?.length > 1" class="flex flex-col gap-8 mt-8">
            <h2 class="text-3xl font-bold text-white">{{ t('global.project_gallery') }}</h2>
            <div class="space-y-8">
              <div v-for="(img, idx) in project.gallery.filter((i: string) => i !== project.image)" :key="idx"
                class="overflow-hidden rounded-2xl border border-white/5 bg-white/5">
                <NuxtImg :src="img" :alt="`${project.name} gallery image ${idx + 1}`" class="w-full h-auto object-cover"
                  loading="lazy" />
              </div>
            </div>
          </section>

        </div>

        <!-- Sidebar Info -->
        <aside class="flex flex-col gap-12 lg:sticky lg:top-32 lg:h-fit">

          <!-- Services -->
          <div v-if="project.services?.length">
            <h3 class="mb-6 text-sm font-bold uppercase tracking-widest text-white/90 border-b border-white/10 pb-4">
              {{ t('global.project_services') }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="service in project.services" :key="service"
                class="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white">
                {{ service }}
              </span>
            </div>
          </div>

          <!-- Key Highlights -->
          <div v-if="project.highlights?.length">
            <h3 class="mb-6 text-sm font-bold uppercase tracking-widest text-white/90 border-b border-white/10 pb-4">
              {{ t('global.project_highlights') }}
            </h3>
            <ul class="flex flex-col gap-4">
              <li v-for="item in project.highlights" :key="item"
                class="flex gap-3 text-base text-white/60 leading-snug">
                <UIcon name="i-heroicons-check" class="h-5 w-5 shrink-0 text-primary-400" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Results -->
          <div v-if="project.results?.length">
            <h3 class="mb-6 text-sm font-bold uppercase tracking-widest text-white/90 border-b border-white/10 pb-4">
              {{ t('global.project_results') }}
            </h3>
            <ul class="flex flex-col gap-4">
              <li v-for="item in project.results" :key="item" class="flex gap-3 text-base text-white/60 leading-snug">
                <UIcon name="i-heroicons-arrow-trending-up" class="h-5 w-5 shrink-0 text-green-400" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

        </aside>
      </div>

    </article>

    <!-- Footer / Other Projects -->
    <div v-if="otherProjects.length" class="mt-32 border-t border-white/10 pt-20">
      <div class="mb-12 flex items-baseline justify-between">
        <h2 class="text-3xl font-bold text-white">{{ t('global.project_other') }}</h2>
        <NuxtLink :to="localePath('/works')"
          class="group flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors">
          {{ t('global.see_more') }}
          <UIcon name="i-heroicons-arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <ProjectCard v-for="item in otherProjects" :key="item.name" :project="item" variant="grid" />
      </div>
    </div>
  </div>
</template>
