<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import { withLeadingSlash, joinURL, withoutTrailingSlash } from 'ufo'

const route = useRoute()
const { locale, localeProperties, t } = useI18n()

const slug = computed(() => {
  const params = route.params.slug
  if (!params) return []
  return Array.isArray(params) ? params : [params]
})
const path = computed(() => {
  const p = joinURL(locale.value, ...slug.value)
  return withLeadingSlash(withoutTrailingSlash(p))
})
const collection = computed(() => `content_${locale.value}` as keyof Collections)

const { data: page } = await useAsyncData(path.value, async () =>
  await queryCollection(collection.value).path(path.value).first() as Collections['content_en'] | Collections['content_fr'],
)

if (!page.value)
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })

const { profile } = useAppConfig()

const { copy } = useClipboard()

defineShortcuts({
  meta_o: {
    usingInput: true,
    handler: () => {
      copy(profile.email!)
      toast.success(t('global.email_copied'))
    },
  },
})
</script>

<template>
  <div v-if="page">
    <FolioMeta :page :is-writing="route.path.includes('/articles/')" />
    <ContentRenderer :dir="localeProperties?.dir ?? 'ltr'" :value="page" />
  </div>
</template>
