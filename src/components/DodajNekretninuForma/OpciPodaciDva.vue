<template>
  <div>
    <div class="mb-4">
      <label
        for="build-type"
        class="block text-gray-700 text-sm font-bold mb-2"
      >
        Tip Građevine
      </label>
      <select
        id="build-type"
        v-model="buildType"
        :value="buildType"
        @change="updateBuildType($event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="" disabled selected hidden>
          Odaberite tip građevine
        </option>
        <option value="villa">Vila</option>
        <option value="houses">Kuća</option>
        <option value="apartment">Stan</option>
        <option value="lands">Zemljište</option>
      </select>
    </div>

    <div class="mb-4">
      <label
        for="build-year"
        class="block text-gray-700 text-sm font-bold mb-2"
      >
        Novogradnja/Starogradnja
      </label>
      <select
        id="build-year"
        v-model="buildYear"
        :value="buildYear"
        @change="updateBuildYear($event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="" disabled selected hidden>
          Odaberite vrstu gradnje
        </option>
        <option value="new">Novogradnja</option>
        <option value="old">Starogradnja</option>
      </select>
    </div>

    <div class="mb-4">
      <label for="sale-type" class="block text-gray-700 text-sm font-bold mb-2">
        Vrsta Prodaje
      </label>
      <select
        id="sale-type"
        v-model="saleType"
        :value="saleType"
        @change="updateSaleType($event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="" disabled selected hidden>
          Odaberite vrstu prodaje
        </option>
        <option value="direct">Direktna prodaja</option>
        <option value="resell">Resell</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch } from "vue";

// Define props to accept the whole object
const props = defineProps({
  modelValue: Object,
});

const emit = defineEmits(["update:modelValue"]);

// Destructure the props into individual properties for easier use
const { buildType, buildYear, saleType } = props.modelValue;

// Define methods to handle the updates
const updateBuildType = (value) => {
  emit("update:modelValue", { ...props.modelValue, buildType: value });
};

const updateBuildYear = (value) => {
  emit("update:modelValue", { ...props.modelValue, buildYear: value });
};

const updateSaleType = (value) => {
  emit("update:modelValue", { ...props.modelValue, saleType: value });
};

// Watch for changes to the model values and emit updates to the parent
watch([buildType, buildYear, saleType], () => {
  emit("update:modelValue", { buildType, buildYear, saleType });
});
</script>
