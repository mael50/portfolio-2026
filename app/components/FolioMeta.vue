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
const { t } = useI18n()

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
const canonicalUrl = computed(() => {
  const path = url.pathname.endsWith('/') && url.pathname !== '/' ? url.pathname.slice(0, -1) : url.pathname
  return `${seo.url}${path}`
})

useSeoMeta({
  ogSiteName: seo.title,
  ogTitle: pageSEO.value.title,
  ogDescription: pageSEO.value.description,
  ogType: isWriting ? 'article' : 'website',
  ogUrl: canonicalUrl.value,
  author: profile.name,
  title: pageSEO.value.title,
  description: pageSEO.value.description,
  twitterTitle: pageSEO.value.title,
  twitterDescription: pageSEO.value.description,
  twitterCard: 'summary_large_image',
})

const breadcrumbs = computed(() => {
  const items = [
    { name: t('navigation.home'), item: '/' },
  ]

  if (isWriting) {
    items.push({ name: t('navigation.writing'), item: '/writing' })
    items.push({ name: pageSEO.value.title || '', item: route.path })
  } else if (route.path !== '/') {
    items.push({ name: pageSEO.value.title || '', item: route.path })
  }

  return items
})

if (isWriting) {
  useSchemaOrg([
    defineArticle({
      headline: pageSEO.value.title,
      description: pageSEO.value.description,
      image: (page as any).image?.src || '/og-image.png',
      datePublished: (page as any).date,
      dateModified: (page as any).dateModified || (page as any).date, // Fallback to published date
      author: [
        {
          name: profile.name,
          url: seo.url,
        },
      ],
      publisher: {
        name: seo.title,
        logo: '/favicon.ico', // Or a better logo URL
      },
      mainEntityOfPage: canonicalUrl.value as any,
    }),
    defineBreadcrumb({
      itemListElement: breadcrumbs.value,
    }),
  ])
} else {
  useSchemaOrg([
    defineWebPage({
      name: pageSEO.value.title,
      description: pageSEO.value.description,
    }),
    defineBreadcrumb({
      itemListElement: breadcrumbs.value,
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
  link: [
    ...link,
    { rel: 'canonical', href: canonicalUrl.value },
  ],
})

defineOgImageComponent('Main', {
  title: pageSEO.value.title,
  description: pageSEO.value.description,
  component: 'Main', // Force le composant
})
</script>

<template>
  <slot />
</template>
