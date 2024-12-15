<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <div
        class="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse"
      >
        <button
          type="button"
          data-dropdown-toggle="language-dropdown-menu"
          class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <!-- Dynamically display the selected language's flag -->
          <span class="h-5 w-5 me-3">{{ selectedLanguage.flag }}</span>
          {{ selectedLanguage.name }}
        </button>
        <!-- Dropdown -->
        <div
          id="language-dropdown-menu"
          class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
        >
          <ul class="py-2 font-medium" role="none">
            <li
              v-for="(language, index) in languages"
              :key="index"
              @click="selectLanguage(language)"
            >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
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
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export default {
  name: "LanguageDropdown",
  setup() {
    const { locale } = useI18n();
    const languages = ref([
      { code: "en", name: "English (US)", flag: "🇺🇸" },
      { code: "de", name: "Deutsch", flag: "🇩🇪" },
      { code: "it", name: "Italiano", flag: "🇮🇹" },
      { code: "hr", name: "Hrvatski", flag: "🇭🇷" },
    ]);

    const selectedLanguage = ref({
      code: "en",
      name: "English (US)",
      flag: "🇺🇸",
    });

    const selectLanguage = (language) => {
      // Update selected language
      selectedLanguage.value = language;

      // Move the selected language to the top of the list
      const index = languages.value.findIndex(
        (lang) => lang.code === language.code
      );
      if (index > -1) {
        const [selected] = languages.value.splice(index, 1);
        languages.value.unshift(selected);
      }

      // Update app locale
      locale.value = language.code;
    };

    return {
      languages,
      selectedLanguage,
      selectLanguage,
    };
  },
};
</script>
