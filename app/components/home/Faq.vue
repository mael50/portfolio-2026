<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { locale } = useI18n()

const { data: faq } = await useAsyncData('faq-' + locale.value, async () => {
  const collection = ('faq_' + locale.value) as keyof Collections
  return await queryCollection(collection).first() as Collections['faq_en'] | Collections['faq_fr']
}, {
  watch: [locale],
})

interface FaqItem {
  label: string
  content: string
}

const items = computed<FaqItem[]>(() => {
  return faq.value?.items || []
})

// SEO: Add FAQPage Schema
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': items.value.map((item: FaqItem) => ({
          '@type': 'Question',
          'name': item.label,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.content,
          },
        })),
      })),
    },
  ],
})
</script>

<template>
  <div
    v-if="faq"
    class="flex flex-col items-center justify-center space-y-8 w-full sm:px-20 md:px-30"
  >
    <div class="flex flex-col items-center justify-center gap-2">
      <h3 class="font-newsreader italic text-white-shadow text-4xl">
        {{ faq.title }}
      </h3>
    </div>

    <div class="w-full max-w-3xl">
      <UAccordion
        :unmount-on-hide="false"
        trailing-icon="lucide:plus"
        :items="items"
        :ui="{
          item: 'mb-2 group px-4 transform-gpu rounded-xl border border-white/10 bg-white/5 transition duration-500 will-change-transform hover:bg-white/[0.075]',
          trailingIcon: 'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-135',
        }"
      >
        <template #body="{ item: _item }">
          <MDC
            :value="_item.content || ''"
            unwrap="p"
          />
        </template>
      </UAccordion>
    </div>
  </div>
</template>
