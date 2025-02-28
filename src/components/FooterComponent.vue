<script setup>
import { useThemeStore } from "../store/themeStore";
import NewslettersForm from "./NewslettersForm.vue";
const themeStore = useThemeStore();
</script>

<template>
  <footer class="bg-white dark:bg-gray-900 mt-20 py-8">
    <!-- Newsletter Form Section -->
    <div class="max-w-2xl mx-auto mb-8 text-center">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Subscribe to Our Newsletter
      </h2>
      <NewslettersForm />
    </div>

    <!-- Divider Line -->
    <hr class="border-gray-300 dark:border-gray-700 mb-6" />

    <!-- Footer Content -->
    <div class="mx-auto w-full max-w-screen-xl p-4">
      <div class="md:flex md:justify-between items-center">
        <div class="mb-6 md:mb-0">
          <a href="/" class="flex items-center">
            <img class="h-20" :src="themeStore.logoSrc" alt="Realty Logo" />
          </a>
        </div>
        <p
          class="text-gray-600 dark:text-gray-400 text-sm text-center md:text-right"
        >
          © {{ new Date().getFullYear() }} Realty. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
