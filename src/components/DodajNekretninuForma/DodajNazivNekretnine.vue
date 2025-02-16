<template>
  <div class="mb-4">
    <div class="flex mb-2 language-buttons">
      <button
        type="button"
        @click="currentLanguage = 'hr'"
        :class="{ active: currentLanguage === 'hr' }"
        class="py-2 px-4 rounded-l"
      >
        HR
      </button>
      <button
        type="button"
        @click="currentLanguage = 'en'"
        :class="{ active: currentLanguage === 'en' }"
        class="py-2 px-4"
      >
        EN
      </button>
      <button
        type="button"
        @click="currentLanguage = 'it'"
        :class="{ active: currentLanguage === 'it' }"
        class="py-2 px-4"
      >
        IT
      </button>
      <button
        type="button"
        @click="currentLanguage = 'de'"
        :class="{ active: currentLanguage === 'de' }"
        class="py-2 px-4 rounded-r"
      >
        DE
      </button>
    </div>
    <!-- Property Name Input Fields -->
    <div class="relative mb-4">
      <input
        v-if="currentLanguage === 'hr'"
        v-model="propertyName.hr"
        placeholder="Naziv nekretnine"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <input
        v-if="currentLanguage === 'en'"
        v-model="propertyName.en"
        placeholder="Enter property name"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <input
        v-if="currentLanguage === 'it'"
        v-model="propertyName.it"
        placeholder="Nome della proprietà"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <input
        v-if="currentLanguage === 'de'"
        v-model="propertyName.de"
        placeholder="Name der Immobilie"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, computed } from "vue";
import { defineProps } from "vue";
import axios from "../../axios";

// Define props
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

// Create a local reference to the modelValue prop
const { modelValue } = toRefs(props);

// Define local state
const currentLanguage = ref("hr");

// Create a computed property to bind the modelValue to the local state
const propertyName = computed({
  get: () => modelValue.value,
  set: (value) => {
    modelValue.value = value;
  },
});

const translatePropertyName = async () => {
  try {
    const requestData = {
      text: propertyName.value[currentLanguage.value],
      targetLang: currentLanguage.value,
    };

    console.log("Request data:", requestData); // Debugging line

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
  margin-bottom: 1rem;
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
