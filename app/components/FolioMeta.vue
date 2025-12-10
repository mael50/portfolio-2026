<script setup lang="ts">
import type { ContentEnCollectionItem, ContentFrCollectionItem, ArticlesEnCollectionItem, ArticlesFrCollectionItem } from '@nuxt/content'

useScriptPlausibleAnalytics({
  domain: 'maellaroque.fr',
})

const { page, isWriting } = defineProps<{
  page: ContentEnCollectionItem | ContentFrCollectionItem | ArticlesEnCollectionItem | ArticlesFrCollectionItem
  isWriting: boolean
}>()

const route = useRoute()
const { link, seo, profile } = useAppConfig()

const pageSEO = computed(() => ({
  title: isWriting ? page?.title : page?.title || seo.title,
  description: isWriting ? page?.description : page?.description || seo.description,
}))

const getTitleTemplate = (title: string | undefined) => {
  if (route.path === '/') return title || `${seo.title}`
  if (isWriting) return title ?? null
  return `${title} | ${seo.title}`
}

const url = useRequestURL()

useSeoMeta({
  ogSiteName: seo.title,
  ogTitle: pageSEO.value.title,
  ogDescription: pageSEO.value.description,
  ogType: isWriting ? 'article' : 'website',
  ogUrl: url.href,
  author: profile.name,
  title: pageSEO.value.title,
  description: pageSEO.value.description,
  twitterTitle: pageSEO.value.title,
  twitterDescription: pageSEO.value.description,
  twitterCard: 'summary_large_image',
})

if (isWriting) {
  useSchemaOrg([
    defineArticle({
      headline: pageSEO.value.title,
      description: pageSEO.value.description,
      image: (page as any).image?.src || '/og-image.png',
      datePublished: page.date,
      author: [
        {
          name: profile.name,
          url: seo.url,
        },
      ],
    }),
  ])
} else {
  useSchemaOrg([
    defineWebPage({
      name: pageSEO.value.title,
      description: pageSEO.value.description,
    }),
  ])
}

useHead({
  title: pageSEO.value.title,
  titleTemplate: getTitleTemplate,
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'charset', content: 'utf-8' },
    { name: 'robots', content: 'index, follow' },
    { name: 'color-scheme', content: 'light dark' },
  ],
  link,
})

defineOgImageComponent('Main', {
  title: pageSEO.value.title,
  description: pageSEO.value.description,
})
</script>

<template>
  <slot />
</template>
