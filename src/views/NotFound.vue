<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        404
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
        {{ $t("error.page_not_found") }}
      </p>
      <router-link
        :to="`/${$i18n.locale}/`"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {{ $t("error.back_home") }}
      </router-link>
    </div>
  </div>
</template>
