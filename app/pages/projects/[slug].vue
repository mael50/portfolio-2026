<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
const slug = route.params.slug as string

const { data: project } = await useAsyncData(`project-${slug}`, async () => {
    const collection = ('projects_' + locale.value) as keyof Collections
    const allProjects = await queryCollection(collection).all()
    return allProjects.find(p => p.stem.endsWith(`/${slug}`)) as Collections['projects_fr']
})

const router = useRouter()

const goBack = () => {
    if (window.history.length > 1) {
        router.back()
    } else {
        router.push(localePath('/'))
    }
}

if (!project.value) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useSeoMeta({
    title: project.value.name,
    description: project.value.description,
    ogTitle: project.value.name,
    ogDescription: project.value.description,
    ogImage: project.value.image,
})
</script>

<template>
    <div v-if="project" class="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div
            class="pointer-events-none absolute inset-0 bg-center bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]" />
        <div
            class="absolute -top-8 left-1/2 size-72 -translate-x-1/2 rounded-full bg-white/25 blur-[120px] lg:-top-8 lg:size-[32rem] lg:blur-[200px]" />

        <div class="relative z-10 flex flex-col gap-8">
            <button @click="goBack"
                class="flex items-center gap-2 text-white/60 hover:text-white transition-colors w-fit cursor-pointer">
                <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
                {{ $t('global.back') }}
            </button>

            <div class="flex flex-col gap-4">
                <h1
                    class="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                    {{ project.name }}
                </h1>
                <div class="flex items-center gap-4 text-white/60">
                    <span>{{ project.release }}</span>
                    <span v-if="project.link" class="w-1 h-1 bg-white/60 rounded-full"></span>
                    <a v-if="project.link" :href="project.link" target="_blank"
                        class="hover:text-white underline decoration-white/30 underline-offset-4">
                        {{ $t('global.see_more') }}
                    </a>
                </div>
            </div>

            <div class="w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5">
                <NuxtImg :src="project.image" :alt="project.name" class="w-full h-full object-cover" />
            </div>

            <div v-if="project.description" class="prose prose-invert max-w-none">
                <p class="text-lg text-white/80 leading-relaxed">
                    {{ project.description }}
                </p>
            </div>

            <div v-if="project.gallery?.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(img, index) in project.gallery" :key="index"
                    class="rounded-lg overflow-hidden border border-white/10 bg-white/5">
                    <NuxtImg :src="img"
                        class="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                </div>
            </div>
        </div>
    </div>
</template>
