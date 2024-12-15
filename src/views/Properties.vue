<template>
  <div>
    <Navbar />
    <div class="px-4 md:px-8 lg:px-12 xl:px-16">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">{{ $t("all_properties") }}</h1>
        <div class="flex space-x-4">
          <select
            id="sort"
            v-model="sortOption"
            @change="sortProperties"
            class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="likes-asc">Likes: Low to High</option>
            <option value="likes-desc">Likes: High to Low</option>
          </select>
        </div>
      </div>
      <!-- Properties list goes here -->
      <div class="flex justify-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PropertyCard
            v-for="property in paginatedProperties"
            :key="property.id"
          />
        </div>
      </div>
      <nav
        v-if="totalPages > 1"
        aria-label="Page navigation example"
        class="pagination-container"
      >
        <ul class="flex items-center -space-x-px h-10 text-base">
          <li>
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span class="sr-only">Previous</span>
              <svg
                class="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          <li v-for="page in totalPages" :key="page">
            <button
              @click="goToPage(page)"
              :class="[
                'flex items-center justify-center px-4 h-10 leading-tight',
                {
                  'text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white':
                    currentPage === page,
                  'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white':
                    currentPage !== page,
                },
              ]"
            >
              {{ page }}
            </button>
          </li>
          <li>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span class="sr-only">Next</span>
              <svg
                class="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Navbar from "../components/NavbarComponent.vue";
import PropertyCard from "../components/PropertyCardComponent.vue";
import Footer from "../components/FooterComponent.vue";

const properties = ref([
  { id: 1, name: "Property 1", price: 100000, likes: 10 },
  { id: 2, name: "Property 2", price: 200000, likes: 20 },
  { id: 3, name: "Property 3", price: 300000, likes: 30 },
  { id: 4, name: "Property 4", price: 400000, likes: 40 },
  { id: 5, name: "Property 5", price: 500000, likes: 50 },
  { id: 6, name: "Property 6", price: 600000, likes: 60 },
  { id: 7, name: "Property 7", price: 700000, likes: 70 },
  { id: 8, name: "Property 8", price: 800000, likes: 80 },
  { id: 9, name: "Property 9", price: 900000, likes: 90 },
  { id: 10, name: "Property 10", price: 1000000, likes: 100 },
  { id: 11, name: "Property 11", price: 1100000, likes: 110 },
  { id: 12, name: "Property 12", price: 1200000, likes: 120 },
  { id: 13, name: "Property 13", price: 1300000, likes: 130 },
  { id: 14, name: "Property 14", price: 1400000, likes: 140 },
  { id: 15, name: "Property 15", price: 1500000, likes: 150 },
]);

const itemsPerPage = 12;
const currentPage = ref(1);
const sortOption = ref("price-asc");

const totalPages = computed(() =>
  Math.ceil(properties.value.length / itemsPerPage)
);

const paginatedProperties = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedProperties.value.slice(start, end);
});

const sortedProperties = computed(() => {
  return [...properties.value].sort((a, b) => {
    if (sortOption.value === "price-asc") {
      return a.price - b.price;
    } else if (sortOption.value === "price-desc") {
      return b.price - a.price;
    } else if (sortOption.value === "likes-asc") {
      return a.likes - b.likes;
    } else if (sortOption.value === "likes-desc") {
      return b.likes - a.likes;
    }
  });
});

const emptySlots = computed(() => {
  return itemsPerPage - paginatedProperties.value.length;
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const sortProperties = () => {
  currentPage.value = 1; // Reset to the first page when sorting changes
};
</script>

<style>
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
