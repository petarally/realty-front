<template>
  <div class="mb-10">
    <label class="block text-gray-700 text-sm font-bold mb-2"> Sadržaji </label>
    <div class="flex flex-wrap gap-4">
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="modelValue.wifi"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2">Wi-Fi</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="modelValue.parking"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2">Parking</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="modelValue.pool"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2">Bazen</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="modelValue.garage"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2">Garaža</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="modelValue.seaView"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2">Pogled more</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="modelValue.accessToBeach"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2">Prilaz plaži</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="modelValue.septicTank"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2">Septička</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="modelValue.sewageSystem"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2">Kanalizacija</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Define props
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

// Define emits
const emit = defineEmits(["update:modelValue"]);

// Emit updates when the value changes
const updateAmenities = () => {
  emit("update:modelValue", props.modelValue);
};
</script>
