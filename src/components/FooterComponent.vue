<script setup>
import { useThemeStore } from "../store/themeStore";
import NewslettersForm from "./NewslettersForm.vue";
const themeStore = useThemeStore();
</script>

<template>
  <footer
    class="bg-white dark:bg-gray-900 mt-20 py-4 border-t border-gray-200 dark:border-gray-700"
  >
    <div class="mx-auto w-full max-w-screen-xl px-6 lg:px-8">
      <!-- Footer Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <!-- Logo & Branding -->
        <div class="flex justify-center md:justify-start">
          <a href="/" class="flex items-center">
            <img
              class="h-16 md:h-20"
              :src="themeStore.logoSrc"
              alt="Realty Logo"
            />
          </a>
        </div>

        <!-- Newsletter Section -->
        <div class="text-center md:text-left">
          <NewslettersForm />
        </div>

        <!-- Copyright & Info -->
        <div class="text-center md:text-right">
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} Realty. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
