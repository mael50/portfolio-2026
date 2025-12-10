<script setup lang="ts">
defineProps<{
    title?: string
    description?: string
}>()

const { profile } = useAppConfig()
</script>

<template>
    <div
        class="w-full h-full flex flex-col justify-between p-20 bg-[#09090b] text-white relative overflow-hidden font-sans">
        <!-- Grid Background -->
        <div
            class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <!-- Gradient Blobs -->
        <div class="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/20 blur-[120px] rounded-full" />
        <div class="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full" />

        <!-- Main Content -->
        <div class="relative z-10 flex flex-col gap-8 mt-10">
            <div class="flex items-center gap-6">
                <div class="relative">
                    <div
                        class="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full opacity-75 blur-sm" />
                    <img :src="profile.picture" alt="Profile"
                        class="relative w-24 h-24 rounded-full border-4 border-[#09090b] object-cover shadow-2xl" />
                </div>
                <div class="flex flex-col">
                    <span class="text-3xl font-bold text-white tracking-tight">{{ profile.name }}</span>
                    <span class="text-xl text-emerald-400 font-medium tracking-wide uppercase">{{ profile.job }}</span>
                </div>
            </div>

            <div class="flex flex-col gap-4 max-w-4xl">
                <h1 class="text-7xl font-extrabold leading-[1.1] tracking-tight text-white">
                    {{ title }}
                </h1>
                <p class="text-4xl text-neutral-400 leading-snug font-light line-clamp-2">
                    {{ description }}
                </p>
            </div>
        </div>

        <!-- Footer / Brand -->
        <div class="relative z-10 flex items-center justify-between border-t border-white/10 pt-8 mt-auto">
            <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span class="text-xl text-neutral-500 font-mono">Available for new projects</span>
            </div>
            <span class="text-2xl font-bold text-white tracking-widest">MAELLAROQUE.FR</span>
        </div>
    </div>
</template>
