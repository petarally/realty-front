<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <!-- Use a relatively positioned container for the button and dropdown -->
      <div
        class="relative flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse"
      >
        <button
          @click="toggleDropdown"
          class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span class="h-5 w-5 me-3">{{ selectedLanguage.flag }}</span>
          {{ selectedLanguage.name }}
        </button>

        <!-- Dropdown (absolute to avoid expanding nav) -->
        <div
          v-if="isOpen"
          class="absolute top-full right-0 z-50 my-2 w-40 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
        >
          <ul class="py-2 font-medium">
            <li
              v-for="(language, index) in languages"
              :key="index"
              @click="selectLanguage(language)"
            >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <div class="inline-flex items-center">
                  <span class="h-3.5 w-3.5 me-2">{{ language.flag }}</span>
                  {{ language.name }}
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, inject } from "vue";
import { useI18n } from "vue-i18n";
import router from "../router/index.js";

export default {
  name: "LanguageDropdown",
  setup() {
    const isOpen = ref(false);
    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const { locale } = useI18n();
    const languages = ref([
      { code: "en", name: "English (US)", flag: "🇺🇸" },
      { code: "de", name: "Deutsch", flag: "🇩🇪" },
      { code: "it", name: "Italiano", flag: "🇮🇹" },
      { code: "hr", name: "Hrvatski", flag: "🇭🇷" },
    ]);

    const selectedLanguage = inject("selectedLanguage");

    const selectLanguage = (language) => {
      // close dropdown immediately
      isOpen.value = false;

      // set language in localStorage
      localStorage.setItem("language", language.code);

      // update reactive language objects
      selectedLanguage.value = language;
      locale.value = language.code;

      // keep the rest of the path, only replace the language segment
      const currentPath = router.currentRoute.value.fullPath;
      const parts = currentPath.split("/");
      parts[1] = language.code;
      const newPath = parts.join("/");
      router.push(newPath).then(() => {
        // refresh the page
        window.location.reload();
      });
    };

    return {
      isOpen,
      toggleDropdown,
      languages,
      selectedLanguage,
      selectLanguage,
    };
  },
};
</script>
