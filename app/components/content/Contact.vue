<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { profile } = useAppConfig()
const { t } = useI18n()

const isResendEnabled = useRuntimeConfig().public.resend

const state = ref({
  email: '',
  message: '',
  phone: '',
  fullname: '',
  subject: '',
})

const schema = computed(() => z.object({
  email: z.string().email(t('contact.errors.email_invalid')),
  message: z.string().min(10, t('contact.errors.message_short')),
  subject: z.string().min(5, t('contact.errors.subject_short')),
  fullname: z.string().min(3, t('contact.errors.name_short')),
}))
type Schema = z.output<typeof schema.value>

const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await $fetch('/api/emails/send', {
      method: 'POST',
      body: event.data,
    })
    state.value = {
      email: '',
      message: '',
      phone: '',
      fullname: '',
      subject: '',
    }
    toast.success(t('contact.success'))
  }
  catch (error) {
    console.error('Contact form submission error:', error)
    toast.error(t('contact.error'))
  }
  loading.value = false
}
</script>

<template>
  <div class="relative isolate px-6 py-24 sm:py-32 lg:px-8">
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>

    <div class="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div class="flex flex-col justify-center">
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl font-newsreader italic text-white-shadow">
          <slot name="title" mdc-unwrap="p" />
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          <slot name="subtitle" mdc-unwrap="p" />
        </p>

        <div class="mt-10 space-y-6">
          <div class="flex items-center gap-x-4">
            <div
              class="flex-none flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
              <UIcon name="heroicons-envelope" class="h-6 w-6 text-white" />
            </div>
            <a :href="`mailto:${profile.email}`"
              class="text-base leading-7 text-white hover:text-primary-400 transition-colors">
              {{ profile.email }}
            </a>
          </div>

          <div class="flex items-center gap-x-4">
            <div
              class="flex-none flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
              <UIcon name="heroicons-phone" class="h-6 w-6 text-white" />
            </div>
            <span class="text-base leading-7 text-white">
              {{ profile.phone }}
            </span>
          </div>
        </div>

        <div class="mt-10">
          <MeetingButton />
        </div>
      </div>

      <div class="bg-white/5 ring-1 ring-white/10 rounded-3xl p-8 backdrop-blur-xl">
        <UForm :state :schema="schema" class="flex flex-col gap-4" @submit="onSubmit">
          <UFormField :label="$t('contact.label_name')" name="fullname" required>
            <UInput v-model="state.fullname" type="text" autocomplete="name" class="w-full"
              :placeholder="$t('contact.placeholders.name')" size="lg" />
          </UFormField>

          <UFormField :label="$t('contact.label_email')" name="email" required>
            <UInput v-model="state.email" autocomplete="email" class="w-full"
              :placeholder="$t('contact.placeholders.email')" size="lg" />
          </UFormField>

          <UFormField :label="$t('contact.label_phone')" name="phone">
            <UInput v-model="state.phone" autocomplete="tel" class="w-full"
              :placeholder="$t('contact.placeholders.phone')" size="lg" />
          </UFormField>

          <UFormField :label="$t('contact.label_subject')" name="subject" required>
            <UInput v-model="state.subject" class="w-full" :placeholder="$t('contact.label_subject')" size="lg" />
          </UFormField>

          <UFormField :label="$t('contact.label_message')" name="message" required>
            <UTextarea v-model="state.message" autoresize class="w-full" :rows="4"
              :placeholder="$t('contact.placeholders.message')" size="lg" />
          </UFormField>

          <div class="mt-4">
            <UTooltip :disabled="isResendEnabled" :text="$t('contact.disabled')" class="w-full">
              <UButton :loading :disabled="!isResendEnabled" type="submit" block size="xl" color="primary"
                variant="solid" class="font-bold">
                {{ $t("contact.submit") }}
              </UButton>
            </UTooltip>
          </div>
        </UForm>
      </div>
    </div>
  </div>
</template>
