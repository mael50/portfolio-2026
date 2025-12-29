<template>
  <div class="mt-6 pb-20">
    <Divider />
    <footer class="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6">
      <span class="text-center text-sm text-muted">
        © {{ new Date().getFullYear() }}, Maël Laroque - {{
          $t("global.all_rights_reserved") }}.
      </span>
      <NuxtLink to="/mentions-legales" class="text-muted hover:text-white transition-colors text-sm">
        {{ $t("global.mentions_legales") }}
      </NuxtLink>
    </footer>
  </div>
</template>
