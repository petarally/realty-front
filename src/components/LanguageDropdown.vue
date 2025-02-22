<script setup>
import { ref, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import router from "../router/index.js";

// Dropdown state
const isOpen = ref(false);
const dropdownRef = ref(null);

// Toggle the dropdown visibility
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Close the dropdown when clicking outside
onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});

// Available languages
const languages = ref([
  { code: "en", name: "English (US)", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "hr", name: "Hrvatski", flag: "🇭🇷" },
]);

// Get the current language from localStorage or fallback to 'hr' (Croatian)
const savedLanguageCode = localStorage.getItem("language") || "hr";
const selectedLanguage = ref(
  languages.value.find((lang) => lang.code === savedLanguageCode) ||
    languages.value[0] // Default to first language if no match
);

// i18n locale binding
const { locale } = useI18n();

// Select language and update the app accordingly
const selectLanguage = (language) => {
  isOpen.value = false; // Close the dropdown
  localStorage.setItem("language", language.code); // Store the selected language in localStorage
  selectedLanguage.value = language; // Update the selected language
  locale.value = language.code; // Update the i18n locale

  // Update the route with the new language and refresh the page
  const currentPath = router.currentRoute.value.fullPath;
  const parts = currentPath.split("/");
  parts[1] = language.code; // Update the path with the new language code
  router.push(parts.join("/")).then(() => {
    window.location.reload(); // Refresh the page with the new language
  });
};

// Optionally, onMounted to ensure default selection if no language was set
onMounted(() => {
  // Set default language to Croatian if not set
  if (!localStorage.getItem("language")) {
    localStorage.setItem("language", "hr"); // Default to Croatian
  }

  // Get the current language from localStorage
  const savedLanguageCode = localStorage.getItem("language");

  // Find the language from the available languages or default to the first one
  selectedLanguage.value =
    languages.value.find((lang) => lang.code === savedLanguageCode) ||
    languages.value[0]; // Default to first language if no match

  // Set the locale for i18n
  locale.value = selectedLanguage.value.code;
});
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
