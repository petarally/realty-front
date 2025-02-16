<template>
  <div class="mb-4">
    <div class="flex mb-2 language-buttons">
      <button
        type="button"
        @click="updateDescriptionLanguage('hr')"
        :class="{ active: descriptionLanguage === 'hr' }"
        class="py-2 px-4 rounded-l"
      >
        HR
      </button>
      <button
        type="button"
        @click="updateDescriptionLanguage('en')"
        :class="{ active: descriptionLanguage === 'en' }"
        class="py-2 px-4"
      >
        EN
      </button>
      <button
        type="button"
        @click="updateDescriptionLanguage('it')"
        :class="{ active: descriptionLanguage === 'it' }"
        class="py-2 px-4"
      >
        IT
      </button>
      <button
        type="button"
        @click="updateDescriptionLanguage('de')"
        :class="{ active: descriptionLanguage === 'de' }"
        class="py-2 px-4 rounded-r"
      >
        DE
      </button>
    </div>

    <!-- Description Input Fields -->
    <div class="relative mb-4">
      <textarea
        v-if="descriptionLanguage === 'hr'"
        v-model="localDescription.hr"
        @input="updateDescription"
        placeholder="Opis nekretnine"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      ></textarea>
      <textarea
        v-if="descriptionLanguage === 'en'"
        v-model="localDescription.en"
        @input="updateDescription"
        placeholder="Property description"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      ></textarea>
      <textarea
        v-if="descriptionLanguage === 'it'"
        v-model="localDescription.it"
        @input="updateDescription"
        placeholder="Descrizione della proprietà"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      ></textarea>
      <textarea
        v-if="descriptionLanguage === 'de'"
        v-model="localDescription.de"
        @input="updateDescription"
        placeholder="Immobilienbeschreibung"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from "vue";
import { defineProps, defineEmits } from "vue";

// Define props
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  descriptionLanguage: {
    type: String,
    required: true,
  },
});

// Define emits
const emit = defineEmits(["update:modelValue", "update:descriptionLanguage"]);

// Create local references to the props
const { modelValue, descriptionLanguage } = toRefs(props);

// Local state for description
const localDescription = ref({ ...modelValue.value });

// Watch for changes in modelValue and update localDescription
watch(modelValue, (newValue) => {
  localDescription.value = { ...newValue };
});

// Emit updates to the parent component
const updateDescription = () => {
  emit("update:modelValue", localDescription.value);
};

const updateDescriptionLanguage = (language) => {
  emit("update:descriptionLanguage", language);
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
