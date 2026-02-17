<template>
  <section class="relative pt-12">
    <!-- grid -->
    <div
      class="pointer-events-none absolute inset-0 bg-center bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]" />

    <div class="relative mx-auto flex max-w-7xl flex-col justify-center gap-4 px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
      <!-- spotlight -->
      <div
        class="absolute -top-8 left-1/2 size-72 -translate-x-1/2 rounded-full bg-white/25 blur-[120px] lg:-top-8 lg:size-[32rem] lg:blur-[200px]" />

      <!-- profile picture -->
      <HomeProfilePicture />

      <div class="z-20 flex flex-col items-center justify-center">
        <!-- title -->
        <div class="font-geist" style="--stagger: 1; --delay: 10ms" data-animate>
          <h1
            class="mx-auto font-bold text-center text-pretty bg-gradient-to-b from-white to-white/50 bg-clip-text text-4xl text-transparent lg:max-w-4xl lg:text-5xl tracking-tight leading-tight">
            <slot name="hero_title" mdc-unwrap="p" />
          </h1>

          <!-- subtitle -->
          <h2 class="mx-auto mt-4 max-w-xl text-center text-lg antialiased text-white/60">
            <slot name="hero_subtitle" mdc-unwrap="p" />
          </h2>
        </div>

        <SettingsAvailability background class="mt-2" style="--stagger: 2" data-animate />

        <!-- social -->
        <HomeSocial style="--stagger: 3" data-animate />

        <!-- cta -->
        <HomeCTA style="--stagger: 4" data-animate />

        <HomeMarquee style="--stagger: 5" data-animate />

        <div style="--stagger: 6" data-animate class="mt-12 flex w-full max-w-3xl flex-col gap-4 lg:mt-16">
          <!-- projects -->
          <HomeProjects />
        </div>

        <Divider class="my-9" />

        <!-- Locality Section -->
        <section class="grid md:grid-cols-2 gap-12 items-center w-full max-w-4xl mx-auto my-16">
          <div class="space-y-6 text-left">
            <h2 class="font-newsreader italic text-3xl text-white-shadow">
              {{ t('agency.why_local') }}
            </h2>
            <p class="text-neutral-400 leading-relaxed">
              {{ t('agency.why_local_text') }}
            </p>
            <UButton :to="localePath('/contact')" size="xl" color="primary" variant="solid" :label="t('agency.cta')"
              trailing-icon="i-heroicons-arrow-right-20-solid" class="mt-4" />
          </div>
          <div class="space-y-4">
            <div
              class="p-6 rounded-xl border border-white/10 bg-white/5 space-y-4 backdrop-blur-sm transition-colors hover:bg-white/10 overflow-hidden">
              <div class="absolute inset-0">
                <NuxtImg src="/caen.jpeg" alt="Caen" class="w-full h-full object-cover opacity-40 scale-125" />
              </div>
              <div class="relative z-10 h-24 flex items-end">
                <div>
                  <h3 class="font-bold text-white mb-1">Caen</h3>
                  <p class="text-sm text-neutral-400">Calvados (14)</p>
                </div>
              </div>
            </div>
            <!-- Gouville Card -->
            <div
              class="group relative overflow-hidden p-6 rounded-xl border bg-white/5 border-white/10 space-y-4 translate-x-4 sm:translate-x-8">
              <!-- Background Image -->
              <div class="absolute inset-0">
                <NuxtImg src="/gouville.jpeg" alt="Cabines Gouville-sur-Mer"
                  class="w-full h-full object-cover opacity-40 transition-all duration-700 scale-130" />
              </div>

              <!-- Content -->
              <div class="relative z-10 space-y-4 h-24 flex items-end">
                <div>
                  <h3 class="font-bold text-white mb-1">Gouville-sur-Mer</h3>
                  <p class="text-sm text-neutral-200">Manche (50)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Content slot for SEO text -->
        <div v-if="$slots.content" class="w-full max-w-3xl prose dark:prose-invert mt-8 text-left">
          <slot name="content" />
        </div>

        <HomeFaq style="--stagger: 7" data-animate />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const route = useRoute()
const localePath = useLocalePath()
const { locale, t } = useI18n()
const collection = computed(() => `content_${locale.value}` as keyof Collections)
const { profile, seo, socials } = useAppConfig()

const { data: page } = await useAsyncData(route.path, () => queryCollection(collection.value).path(route.path).first())

// Generate JSON-LD for LocalBusiness if it's a local landing page
if (route.path.includes('creation-site-web')) {
  const areas = (seo as { localAreas?: string[] }).localAreas ?? []
  const imageUrl = profile.picture?.startsWith('http')
    ? profile.picture
    : `${seo.url}${profile.picture}`

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: `${profile.name} - Développeur Web`,
          image: imageUrl,
          '@id': `${seo.url}#local-business`,
          url: seo.url,
          telephone: profile.phone,
          email: profile.email,
          sameAs: Object.values(socials ?? {}),
          address: {
            '@type': 'PostalAddress',
            addressLocality: (page.value as { title?: string })?.title?.split(' à ')[1]?.split(' - ')[0] || 'Gouville-sur-Mer',
            addressRegion: (seo as { localRegion?: string }).localRegion || 'Normandie',
            addressCountry: (seo as { localCountry?: string }).localCountry || 'FR',
          },
          areaServed: areas.map((name) => ({ '@type': 'Place', name })),
          serviceType: [
            'Création de site vitrine',
            'Site e-commerce',
            'Développement SaaS',
            'Maintenance et refonte',
            'SEO local',
          ],
        }),
      },
    ],
  })
}
</script>
