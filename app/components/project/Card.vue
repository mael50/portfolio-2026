<script setup lang="ts">
const props = withDefaults(defineProps<{
  project: {
    name: string
    release: string
    image: string
    link?: string
    stem: string
    summary?: string
    description?: string
    services?: string[]
    stack?: string[]
  }
  variant?: 'compact' | 'grid' | 'featured'
}>(), {
  variant: 'compact',
})

const img = useImage()
const localePath = useLocalePath()
const { t } = useI18n()

const isSoon = computed(() => /soon|bient/i.test(props.project.release || ''))
const statusLabel = computed(() => (isSoon.value ? t('global.soon') : props.project.release))
const summary = computed(() => props.project.summary || props.project.description || '')
const tags = computed(() => (props.project.services?.length ? props.project.services : props.project.stack) || [])
const tagLimit = computed(() => (props.variant === 'grid' ? 1 : 1))
const imageRatio = computed(() => (props.variant === 'featured' ? 'aspect-[16/10]' : 'aspect-[4/3]'))
const titleSize = computed(() => (props.variant === 'featured' ? 'text-xl' : 'text-lg'))
</script>

<template>
  <NuxtLink
    :aria-label="`${project.name} project link`"
    :to="localePath('/projects/' + project.stem.split('/').pop())"
    class="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1412] text-white shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-1"
  >
    <div class="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-emerald-300/15 blur-3xl" />
    <div class="pointer-events-none absolute -left-24 bottom-6 h-40 w-40 rounded-full bg-amber-300/15 blur-3xl" />

    <div class="relative mx-4 mt-4 overflow-hidden rounded-xl border border-white/10 bg-white/5" :class="imageRatio">
      <div class="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/10 to-transparent" />
      <NuxtImg
        :placeholder="img(`${project.image}`)"
        width="1536"
        :alt="project.name + ' project image'"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        :src="project.image"
      />
    </div>
    <div class="relative z-10 flex flex-1 flex-col gap-2 px-4 pb-4 pt-4">
      <div class="flex items-center justify-between gap-3">
        <h3 class="font-newsreader italic text-white/95 leading-tight" :class="titleSize">
          {{ project.name }}
        </h3>
      </div>
      <div class="mt-auto flex flex-wrap items-center gap-2 pt-2">
        <span
          v-for="tag in tags.slice(0, tagLimit)"
          :key="tag"
          class="rounded-full bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/70"
        >
          {{ tag }}
        </span>
        <span class="ml-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/60">
          {{ $t('global.see_more') }}
          <UIcon name="heroicons:arrow-right" class="size-3 text-white/60 transition-transform group-hover:-rotate-45" />
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
