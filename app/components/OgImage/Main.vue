<script setup lang="ts">
defineProps<{
    title?: string
    description?: string
}>()

const { profile } = useAppConfig()
</script>

<template>
    <div class="w-full h-full flex flex-col bg-[#09090b] text-white p-20 font-sans">
        <!-- Subtle Background Pattern -->
        <div
            class="absolute inset-0 bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

        <!-- Content Container -->
        <div class="relative z-10 flex flex-col justify-between h-full">

            <!-- Header -->
            <div class="flex items-center justify-center text-center gap-6">
                <img :src="profile.picture" class="w-20 h-20 rounded-full border-2 border-white/10 object-cover" />
                <div class="flex flex-col items-center gap-1">
                    <span class="text-3xl font-bold text-white leading-none">{{ profile.name }}</span>
                    <span class="text-emerald-400 text-lg font-medium uppercase tracking-wider leading-none">Freelance
                        Full Stack</span>
                </div>
            </div>

            <!-- Main Title Area -->
            <div class="flex flex-col gap-6 max-w-5xl">
                <h1 class="text-6xl font-black leading-tight text-white">
                    {{ title }}
                </h1>

            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between border-t border-white/10 pt-10">
                <div class="flex items-center gap-4">
                    <div class="w-4 h-4 rounded-full bg-emerald-500"></div>
                    <span class="text-2xl text-neutral-300 font-medium">Available for new projects</span>
                </div>
                <span class="text-2xl font-mono text-neutral-500">maellaroque.fr</span>
            </div>

        </div>
    </div>
</template>
