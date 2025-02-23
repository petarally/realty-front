<template>
  <div>
    <!-- Address -->
    <div class="mb-4">
      <label
        for="address-input"
        class="block text-gray-700 text-sm font-bold mb-2"
      >
        Lokacija
      </label>
      <input
        id="address-input"
        type="text"
        :value="modelValue.address"
        @input="updateModel('address', $event.target.value)"
        placeholder="Unesite adresu"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <!-- Price -->
    <div class="mb-4">
      <label for="price" class="block text-gray-700 text-sm font-bold mb-2">
        Cijena
      </label>
      <input
        type="text"
        id="price"
        :value="modelValue.price"
        @input="updateModel('price', $event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="€"
      />
    </div>

    <!-- Livable Area -->
    <div class="mb-4">
      <label
        for="livable-area"
        class="block text-gray-700 text-sm font-bold mb-2"
      >
        Stambena površina
      </label>
      <input
        type="text"
        id="livable-area"
        :value="modelValue.livableArea"
        @input="updateModel('livableArea', $event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="m²"
      />
    </div>

    <!-- Bedrooms -->
    <div class="mb-4">
      <label for="bedrooms" class="block text-gray-700 text-sm font-bold mb-2">
        Broj Soba
      </label>
      <input
        type="number"
        id="bedrooms"
        :value="modelValue.bedrooms"
        @input="updateModel('bedrooms', $event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Unesite broj soba"
      />
    </div>

    <!-- Bathrooms -->
    <div class="mb-4">
      <label for="bathrooms" class="block text-gray-700 text-sm font-bold mb-2">
        Broj Kupaonica
      </label>
      <input
        type="number"
        id="bathrooms"
        :value="modelValue.bathrooms"
        @input="updateModel('bathrooms', $event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Unesite broj kupaonica"
      />
    </div>

    <!-- Garden Area -->
    <div class="mb-4">
      <label
        for="garden-area"
        class="block text-gray-700 text-sm font-bold mb-2"
      >
        Okućnica
      </label>
      <input
        type="text"
        id="garden-area"
        :value="modelValue.gardenArea"
        @input="updateModel('gardenArea', $event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="m²"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Define props for the component
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

// Define emits for the component
const emit = defineEmits(["update:modelValue"]);

// Update model function
const updateModel = (key, value) => {
  // Emit the update back to the parent
  emit("update:modelValue", { ...props.modelValue, [key]: value });
};
</script>
