<script setup>
import { onMounted, nextTick, computed, ref, getCurrentInstance } from "vue";
import { useThemeStore } from "../store/themeStore";
import { initFlowbite } from "flowbite";
import LanguageDropdown from "./LanguageDropdown.vue";

const themeStore = useThemeStore();
const { proxy } = getCurrentInstance(); // Access global properties like $i18n
const baseRoute = computed(() => `/${proxy.$i18n.locale}`);

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

onMounted(async () => {
  await nextTick();
  initFlowbite();
  themeStore.setInitialTheme();
});
</script>

<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900 shadow-md">
    <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
      <!-- Logo -->
      <a href="/" class="flex items-center">
        <img :src="themeStore.logoSrc" alt="realty-logo" class="w-40" />
      </a>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMobileMenu"
        class="md:hidden text-gray-500 dark:text-gray-400 focus:outline-none"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <!-- Navigation Links (Desktop) -->
      <div class="hidden md:flex items-center space-x-6">
        <router-link
          :to="`${baseRoute}/`"
          class="block py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          exact-active-class="text-blue-700 dark:text-blue-500"
        >
          {{ $t("home") }}
        </router-link>
        <router-link
          :to="`${baseRoute}/about`"
          class="block py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          active-class="text-blue-700 dark:text-blue-500"
        >
          {{ $t("about") }}
        </router-link>
        <router-link
          :to="`${baseRoute}/properties`"
          class="block py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          active-class="text-blue-700 dark:text-blue-500"
        >
          {{ $t("properties") }}
        </router-link>
      </div>

      <!-- Language Dropdown & Theme Toggle -->
      <div class="flex items-center space-x-4">
        <LanguageDropdown />
        <button @click="themeStore.toggleTheme()" class="p-2">
          <span v-if="themeStore.theme === 'dark'">🌙</span>
          <span v-else>☀️</span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden bg-white dark:bg-gray-900 shadow-md p-4"
    >
      <router-link
        :to="`${baseRoute}/`"
        class="block py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        exact-active-class="text-blue-700 dark:text-blue-500"
      >
        {{ $t("home") }}
      </router-link>
      <router-link
        :to="`${baseRoute}/about`"
        class="block py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        active-class="text-blue-700 dark:text-blue-500"
      >
        {{ $t("about") }}
      </router-link>
      <router-link
        :to="`${baseRoute}/properties`"
        class="block py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        active-class="text-blue-700 dark:text-blue-500"
      >
        {{ $t("properties") }}
      </router-link>
    </div>
  </nav>
</template>
