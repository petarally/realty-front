<template>
  <div class="mb-4">
    <label
      for="seller-name-input"
      class="block text-gray-700 text-sm font-bold mb-2"
    >
      Ime i prezime prodavatelja
    </label>
    <input
      id="seller-name-input"
      type="text"
      v-model="sellerName"
      placeholder="Unesite ime i prezime prodavatelja"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <!-- Phone of seller -->
  <div class="mb-4">
    <label
      for="seller-phone-input"
      class="block text-gray-700 text-sm font-bold mb-2"
    >
      Telefon prodavatelja
    </label>
    <input
      id="seller-phone-input"
      type="tel"
      v-model="sellerPhone"
      placeholder="Unesite telefon prodavatelja"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <!-- Email of seller -->
  <div class="mb-4">
    <label
      for="seller-email-input"
      class="block text-gray-700 text-sm font-bold mb-2"
    >
      Email prodavatelja
    </label>
    <input
      id="seller-email-input"
      type="email"
      v-model="sellerEmail"
      placeholder="Unesite email prodavatelja"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
</template>

<script setup>
import { defineProps, toRefs } from "vue";

// Define props
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

// Create local references to the modelValue prop
const { sellerName, sellerEmail, sellerPhone } = toRefs(props);
</script>
