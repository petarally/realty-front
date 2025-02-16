<template>
  <div class="mb-10">
    <label class="block text-gray-700 text-sm font-bold mb-2"> Sadržaji </label>
    <div class="flex flex-wrap gap-4">
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="amenities.wifi"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2">Wi-Fi</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="amenities.parking"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2">Parking</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="amenities.pool"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2">Bazen</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="amenities.garage"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2">Garaža</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="amenities.seaView"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2">Pogled more</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="amenities.accessToBeach"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2">Prilaz plaži</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="amenities.septicTank"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2">Septička</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="amenities.sewageSystem"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2">Kanalizacija</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps } from "vue";

const amenities = ref({
  wifi: false,
  parking: false,
  pool: false,
  garage: false,
  seaView: false,
  accessToBeach: false,
  septicTank: false,
  sewageSystem: false,
});

// Define props
const props = defineProps({
  amenities: {
    type: Object,
    required: true,
  },
});
</script>
