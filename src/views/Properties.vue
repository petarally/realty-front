<template>
  <div>
    <Navbar />
    <div class="px-4 md:px-8 lg:px-12 xl:px-16 mt-12 pt-24">
      <h2
        data-aos="fade-right"
        class="text-2xl font-semibold text-[#556dac] mb-4"
      >
        {{ $t("all_properties").toUpperCase() }}
      </h2>
      <hr data-aos="fade-right" class="border-t border-black w-96 my-4 mb-8" />
      <div class="flex justify-end items-center mb-4">
        <div class="flex space-x-4">
          <select
            id="sort"
            v-model="sortOption"
            @change="sortProperties"
            class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="price-asc">{{ $t("price_low_high") }}</option>
            <option value="price-desc">{{ $t("price_high_low") }}</option>
          </select>
        </div>
      </div>
      <!-- Properties list goes here -->
      <div class="flex justify-center mt-12">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PropertyCardComponent
            v-for="post in paginatedProperties"
            :key="post._id"
            :post="post"
            @card-click="handleCardClick"
            data-aos="fade-up"
            data-aos-duration="1000"
          />
        </div>
      </div>
      <nav
        v-if="totalPages > 1"
        aria-label="Page navigation example"
        class="pagination-container"
      >
        <ul class="flex items-center -space-x-px h-10 text-base mt-12">
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
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Navbar from "../components/NavbarComponent.vue";
import PropertyCardComponent from "../components/PropertyCardComponent.vue";
import Footer from "../components/FooterComponent.vue";
import axios from "../axios";

const route = useRoute();
const router = useRouter();
const responseData = ref([]);

const fetchData = async () => {
  try {
    const response = await axios.get("nekretnine/search", {
      params: route.query,
    });
    responseData.value = response.data.filter((property) => !property.delete);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchData();
});

const itemsPerPage = 12;
const currentPage = ref(1);
const sortOption = ref("price-asc");

const totalPages = computed(() =>
  Math.ceil(responseData.value.length / itemsPerPage)
);

const paginatedProperties = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedProperties.value.slice(start, end);
});

const sortedProperties = computed(() => {
  return [...responseData.value].sort((a, b) => {
    if (sortOption.value === "price-asc") {
      return a.price - b.price;
    } else if (sortOption.value === "price-desc") {
      return b.price - a.price;
    }
  });
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const sortProperties = () => {
  currentPage.value = 1; // Reset to the first page when sorting changes
};

const handleCardClick = (id) => {
  router.push({ name: "Property", params: { id } });
};
</script>

<style>
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
