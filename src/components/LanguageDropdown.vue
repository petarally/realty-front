<script setup>
import { ref, inject } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import router from "../router/index.js";

const isOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});

const { locale } = useI18n();
const languages = ref([
  { code: "en", name: "English (US)", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "hr", name: "Hrvatski", flag: "🇭🇷" },
]);

const selectedLanguage = inject("selectedLanguage");

const selectLanguage = (language) => {
  isOpen.value = false;
  localStorage.setItem("language", language.code);
  selectedLanguage.value = language;
  locale.value = language.code;

  const currentPath = router.currentRoute.value.fullPath;
  const parts = currentPath.split("/");
  parts[1] = language.code;
  router.push(parts.join("/")).then(() => {
    window.location.reload();
  });
};
</script>

<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="toggleDropdown"
      class="flex items-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <span class="mr-2 text-lg">{{ selectedLanguage.flag }}</span>
      {{ selectedLanguage.name }}
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-40 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700"
    >
      <ul class="py-2">
        <li
          v-for="(language, index) in languages"
          :key="index"
          @click="selectLanguage(language)"
          class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
        >
          <span class="mr-2">{{ language.flag }}</span>
          {{ language.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
