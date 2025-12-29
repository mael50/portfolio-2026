<script setup lang="ts">
const isOpen = ref(false)
const router = useRouter()
const localePath = useLocalePath()
const colorMode = useColorMode()
const { t } = useI18n()

defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => {
      isOpen.value = !isOpen.value
    }
  }
})

const groups = computed(() => [
  {
    id: 'navigation',
    label: t('navigation.menu'),
    items: [
      {
        label: t('navigation.home'),
        icon: 'i-lucide-home',
        to: localePath('/')
      },
      {
        label: t('navigation.works'),
        icon: 'i-lucide-folder',
        to: localePath('/works')
      },
      {
        label: t('navigation.writing'),
        icon: 'i-lucide-file-text',
        to: localePath('/writing')
      },
      {
        label: t('navigation.about'),
        icon: 'i-lucide-user',
        to: localePath('/about')
      },
      {
        label: t('navigation.contact'),
        icon: 'i-lucide-mail',
        to: localePath('/contact')
      }
    ]
  },
])

function onSelect(option: any) {
  if (option.click) {
    option.click()
  } else if (option.to) {
    router.push(option.to)
  }
  isOpen.value = false
}
</script>

<template>
  <UModal v-model:open="isOpen">
    <template #content>
      <UCommandPalette :groups="groups" @update:model-value="onSelect" :placeholder="t('global.search')" close
        @update:open="isOpen = $event" />
    </template>
  </UModal>
</template>
