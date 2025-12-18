<script setup lang="ts">
defineProps({
  title: {
    type: [String, Object], // Handle potential object title
    required: true,
  },
  date: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  path: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <NuxtLink :to="path" :aria-label="typeof title === 'string' ? title : 'Article'"
    class="flex cursor-pointer flex-col gap-2">
    <div
      class="overflow-hidden rounded-md border border-white/10 shadow-md shadow-zinc-950/50 transition-colors duration-200 hover:border-white/20">
      <NuxtImg width="1536" :alt="`${title} article image`"
        class="h-64 w-full object-cover transition-transform duration-200 hover:scale-105" :src="image"
        :aria-label="`${title} article image`" />
    </div>
    <div class="flex flex-col">
      <h3 class="text-lg font-semibold">
        {{ typeof title === 'object' ? (title as any)?.value || JSON.stringify(title) : title }}
      </h3>
      <span class="text-xs text-muted">{{ date }}</span>
    </div>
  </NuxtLink>
</template>
