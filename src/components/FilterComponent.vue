<template>
  <div
    class="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md"
    :style="{ backgroundColor: '#3951a5' }"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-full items-center">
      <div class="relative">
        <input
          v-model="filters.address"
          type="text"
          id="address"
          class="block px-2.5 pt-4 pb-2.5 w-full text-sm text-gray-900 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="address"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >{{ $t("location") }}</label
        >
      </div>

      <div class="relative">
        <select
          v-model="filters.type"
          id="property-type"
          class="block px-2.5 pt-4 pb-2.5 w-full text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        >
          <option value="">{{ $t("property_type") }}</option>
          <option value="houses">{{ $t("filterComponent.houses") }}</option>
          <option value="apartment">
            {{ $t("filterComponent.apartments") }}
          </option>
          <option value="villa">{{ $t("filterComponent.villas") }}</option>
          <option value="lands">{{ $t("filterComponent.lands") }}</option>
        </select>
      </div>

      <div class="relative">
        <input
          v-model="filters.maxPrice"
          type="text"
          id="max-price"
          class="block px-2.5 pt-4 pb-2.5 w-full text-sm text-gray-900 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="max-price"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >{{ $t("max_price") }}</label
        >
      </div>

      <div class="relative">
        <input
          v-model="filters.maxArea"
          type="text"
          id="max-area"
          class="block px-2.5 pt-4 pb-2.5 w-full text-sm text-gray-900 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="max-area"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >{{ $t("max_area") }}</label
        >
      </div>

      <div class="relative">
        <input
          v-model="filters.propertyId"
          type="text"
          id="property-id"
          class="block px-2.5 pt-4 pb-2.5 w-full text-sm text-gray-900 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="property-id"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >{{ $t("property_id") }}</label
        >
      </div>

      <div class="relative">
        <button
          @click="searchProperties"
          type="button"
          class="block w-full px-2.5 pt-4 pb-2.5 text-sm text-white rounded-lg border appearance-none bg-[#546dac] border-[#546dac] hover:bg-[#34519D] focus:border-[#FFED0B] hover:text-[#FFED0B]"
        >
          {{ $t("search") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "../axios";

const selectedLanguage = inject("selectedLanguage", ref({ code: "en" }));
const router = useRouter();

const filters = ref({
  address: "",
  maxPrice: "",
  maxArea: "",
  type: "",
  propertyId: "",
});

const searchProperties = async () => {
  if (!selectedLanguage?.value?.code) return;
  if (filters.value.maxArea) {
    filters.value.maxArea = parseFloat(filters.value.maxArea);
  }
  if (filters.value.maxPrice) {
    filters.value.maxPrice = parseFloat(filters.value.maxPrice);
  }
  const query = Object.fromEntries(
    Object.entries(filters.value).filter(([_, value]) => value)
  );
  const queryString = new URLSearchParams(query).toString();
  console.log("Query String:", queryString);
  try {
    const { data } = await axios.get(`nekretnine/search?${queryString}`);
    console.log("Search Results:", data);
  } catch (error) {
    console.error("Error fetching properties:", error);
  }
  router.push(`/${selectedLanguage.value.code}/properties?${queryString}`);
};
</script>
