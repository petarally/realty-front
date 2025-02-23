<template>
  <div class="mb-4">
    <!-- Language Selection Buttons -->
    <div class="flex mb-2 language-buttons">
      <button
        v-for="lang in languages"
        :key="lang"
        type="button"
        @click="currentLanguage = lang"
        :class="{
          active: currentLanguage === lang,
          'rounded-l': lang === 'hr',
          'rounded-r': lang === 'de',
          'py-2 px-4': true,
        }"
      >
        {{ lang.toUpperCase() }}
      </button>
    </div>

    <!-- Property Name Input -->
    <div class="relative mb-4">
      <input
        v-model="propertyName[currentLanguage]"
        :placeholder="placeholders[currentLanguage]"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { defineProps, defineEmits } from "vue";
import axios from "../../axios"; // Keep if translation API is used

// Define props
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

// Emit function to update the parent component
const emit = defineEmits(["update:modelValue"]);

// Local state
const currentLanguage = ref("hr");
const languages = ["hr", "en", "it", "de"];

// Localized placeholders for input fields
const placeholders = {
  hr: "Naziv nekretnine",
  en: "Enter property name",
  it: "Nome della proprietà",
  de: "Name der Immobilie",
};

// Computed property to sync with parent modelValue
const propertyName = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

// Translation function
const translatePropertyName = async () => {
  try {
    const requestData = {
      text: propertyName.value[currentLanguage.value], // Get current text
      targetLang: currentLanguage.value, // Target language
    };

    const response = await axios.post("/translate", requestData);
    propertyName.value[currentLanguage.value] = response.data.translatedText;
  } catch (error) {
    console.error("Translation failed", error);
  }
};
</script>

<style scoped>
.language-buttons {
  display: flex;
}

.language-buttons button {
  border: 1px solid #d1d5db;
  margin-right: 0.5rem;
}

.language-buttons button:last-child {
  margin-right: 0;
}

.language-buttons .active {
  background-color: #1d4ed8;
  color: white;
}
</style>
