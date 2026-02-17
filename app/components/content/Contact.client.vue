<script setup lang="ts">
  const { profile } = useAppConfig()
  const { t } = useI18n()

  const loading = ref(false)
  const form = ref({
    email: '',
    message: '',
    phone: '',
    fullname: '',
    subject: '',
  })

  async function onSubmit() {
    loading.value = true
    try {
      await $fetch('/api/emails/send', {
        method: 'POST',
        body: form.value,
      })
      toast.success(t('contact.success'), {
        description: t('contact.success_description'),
      })
      form.value = {
        email: '',
        message: '',
        phone: '',
        fullname: '',
        subject: '',
      }
    }
    catch (error) {
      console.error(error)
      toast.error(t('contact.error'), {
        description: t('contact.error_description'),
      })
    }
    finally {
      loading.value = false
    }
  }
</script>

<template>
  <div class="relative isolate px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-center">
      <!-- Left Column: Text & Info -->
      <div class="flex flex-col justify-center">
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl text-white-shadow">
          <slot name="title" mdc-unwrap="p" />
        </h1>
        <div class="mt-6 text-lg leading-8 text-neutral-400">
          <slot name="subtitle" mdc-unwrap="p" />
        </div>

        <div class="mt-10 flex flex-col sm:flex-row gap-4">
          <SpotlightButton as="a" :href="`mailto:${profile?.email}`" class="group w-full sm:w-auto h-auto !py-4 !px-6">
            <div class="flex items-center gap-4">
              <div
                class="flex-none flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 group-hover:bg-white/20 transition-colors">
                <UIcon name="heroicons-envelope" class="h-4 w-4 text-white" />
              </div>
              <span class="text-base leading-7 text-white font-medium z-10">
                {{ profile?.email }}
              </span>
            </div>
          </SpotlightButton>

          <SpotlightButton as="a" :href="`tel:${profile?.phone}`" class="group w-full sm:w-auto h-auto !py-4 !px-6">
            <div class="flex items-center gap-4">
              <div
                class="flex-none flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 group-hover:bg-white/20 transition-colors">
                <UIcon name="heroicons-phone" class="h-4 w-4 text-white" />
              </div>
              <span class="text-base leading-7 text-white font-medium z-10">
                {{ profile?.phone }}
              </span>
            </div>
          </SpotlightButton>
        </div>
      </div>

      <!-- Right Column: Form -->
      <SpotlightCard white class="p-8">
        <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
          <UFormField :label="$t('contact.label_name')" name="fullname" required>
            <UInput v-model="form.fullname" type="text" autocomplete="name" class="w-full"
              :placeholder="$t('contact.placeholders.name')" size="lg" variant="outline" color="neutral" required />
          </UFormField>

          <UFormField :label="$t('contact.label_email')" name="email" required>
            <UInput v-model="form.email" type="email" autocomplete="email" class="w-full"
              :placeholder="$t('contact.placeholders.email')" size="lg" variant="outline" color="neutral" required />
          </UFormField>

          <!-- Hidden Phone Field/Optional if needed, reusing previous logic -->
          <UFormField :label="$t('contact.label_phone')" name="phone">
            <UInput v-model="form.phone" autocomplete="tel" class="w-full"
              :placeholder="$t('contact.placeholders.phone')" size="lg" variant="outline" color="neutral" />
          </UFormField>

          <UFormField :label="$t('contact.label_subject')" name="subject" required>
            <UInput v-model="form.subject" class="w-full" :placeholder="$t('contact.label_subject')" size="lg"
              variant="outline" color="neutral" required />
          </UFormField>

          <UFormField :label="$t('contact.label_message')" name="message" required>
            <UTextarea v-model="form.message" autoresize class="w-full" :rows="4"
              :placeholder="$t('contact.placeholders.message')" size="lg" variant="outline" color="neutral" required />
          </UFormField>

          <div class="mt-2">
            <UButton :loading="loading" type="submit" block size="xl" color="neutral" variant="solid" class="font-bold">
              {{ $t("contact.submit") }}
            </UButton>
          </div>
        </form>
      </SpotlightCard>
    </div>
  </div>
</template>
