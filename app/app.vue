<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()
const { profile, seo } = useAppConfig()

useSchemaOrg([
  definePerson({
    name: profile.name,
    image: profile.picture,
    jobTitle: profile.job,
    email: profile.email,
    telephone: profile.phone,
    url: seo.url,
    sameAs: [
      'https://github.com/mael50',
      'https://www.linkedin.com/in/ma%C3%ABl-laroque-3884281bb/',
    ],
  }),
  defineWebSite({
    name: seo.title,
    description: seo.description,
    url: seo.url,
  }),
])
</script>

<template>
  <Html :lang="locale"
    class="font-geist text-[var(--ui-text)] transition-colors duration-300 selection:bg-white/60 selection:text-zinc-800">

  <Body>
    <LayoutScrollToTop />
    <NuxtLayout>
      <UApp :locale="locales[locale]">
        <NuxtPage />
      </UApp>
    </NuxtLayout>
    <Toaster close-button />
    <DotPattern
      class="absolute inset-0 -z-10 size-full fill-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
  </Body>

  </Html>
</template>
