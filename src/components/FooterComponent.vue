<script setup>
import { useThemeStore } from "../store/themeStore";
const themeStore = useThemeStore();
</script>

<template>
  <footer class="bg-white dark:bg-gray-900 mt-20">
    <hr class="border-gray-300 dark:border-gray-700 mb-4" />
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
