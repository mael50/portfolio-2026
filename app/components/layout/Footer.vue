<template>
  <div class="mt-6 pb-20">
    <Divider />
    <footer class="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6">
      <span class="text-center text-sm text-muted">
        © {{ new Date().getFullYear() }}, Maël Laroque - {{
          $t("global.all_rights_reserved") }}.
      </span>
      <div class="flex flex-wrap justify-center gap-4 text-sm text-muted">

        <NuxtLinkLocale to="/mentions-legales" class="hover:text-white transition-colors">
          {{ $t("global.mentions_legales") }}
        </NuxtLinkLocale>
      </div>
    </footer>
  </div>
</template>
