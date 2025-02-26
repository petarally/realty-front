<template>
  <div>
    <Navbar />
    <div class="px-4 md:px-8 lg:px-12 xl:px-16 pt-20">
      <h1
        class="text-4xl font-bold text-center my-8 text-gray-900 dark:text-white"
        aria-labelledby="page-title"
      >
        <span id="page-title" class="sr-only">Welcome to Realty</span>
        Welcome to Realty
      </h1>

      <Filter data-aos="fade-down" data-aos-duration="500" />

      <h2
        data-aos="fade-down"
        data-aos-duration="500"
        class="text-2xl font-semibold text-center my-4 text-gray-700 dark:text-gray-300"
        aria-labelledby="main-title"
      >
        <span id="main-title" class="sr-only">{{ $t("main_title") }}</span>
        {{ $t("main_title") }}
      </h2>

      <h2
        class="text-xl font-medium text-center my-4 text-gray-600 dark:text-gray-400"
        aria-labelledby="subtitle"
      >
        <span id="subtitle" class="sr-only">{{ $t("subtitle") }}</span>
        {{ $t("subtitle") }}
      </h2>

      <h2
        data-aos="fade-right"
        class="text-2xl font-semibold text-[#556dac] mb-4"
        aria-labelledby="featured-properties-title"
      >
        <span id="featured-properties-title" class="sr-only">
          {{ $t("featured_properties").toUpperCase() }}
        </span>
        {{ $t("featured_properties").toUpperCase() }}
      </h2>
      <hr
        data-aos="fade-right"
        class="border-t border-black w-96 my-4 mb-8"
        aria-hidden="true"
      />

      <div class="flex justify-center">
        <div
          data-aos="fade-left"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          role="region"
          aria-labelledby="featured-properties-section"
        >
          <span id="featured-properties-section" class="sr-only"
            >Featured Properties</span
          >
          <PropertyCard
            v-for="post in lastFourPosts"
            :key="post.id"
            :post="post"
            @card-click="handleCardClick"
            aria-label="Property card"
          />
        </div>
      </div>

      <div
        data-aos="fade-right"
        data-aos-offset="200"
        data-aos-duration="2000"
        data-aos-easing="ease-in-out"
        class="flex justify-center my-4"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PropertyCard
            v-for="post in lastEightToFourPosts"
            :key="post.id"
            :post="post"
            @card-click="handleCardClick"
            aria-label="Property card"
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useHead } from "@vueuse/head";
import Filter from "../components/FilterComponent.vue";
import Navbar from "../components/NavbarComponent.vue";
import PropertyCard from "../components/PropertyCardComponent.vue";
import Footer from "../components/FooterComponent.vue";
import axios from "../axios";

const responseData = ref([]);
const router = useRouter();

const fetchData = async () => {
  try {
    const response = await axios.get("/nekretnine");
    responseData.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const handleCardClick = (id) => {
  router.push({ name: "Property", params: { id } });
};

const lastFourPosts = computed(() => {
  return responseData.value.slice(-4).reverse();
});

const lastEightToFourPosts = computed(() => {
  return responseData.value.slice(-8, -4).reverse();
});

onMounted(() => {
  fetchData();
});

const selectedLanguage = localStorage.getItem("language") || "hr";

const metaKeywords = {
  en: "Istrian Villa, vacation, rental, property, Croatia, Istria",
  hr: "Istarska Vila, odmor, najam, nekretnina, Hrvatska, Istra",
  it: "Villa Istriana, vacanza, affitto, proprietà, Croazia, Istria",
  de: "Istrische Villa, Urlaub, Vermietung, Immobilie, Kroatien, Istrien",
};

useHead({
  meta: [
    {
      name: "keywords",
      content: metaKeywords[selectedLanguage],
    },
  ],
});
</script>
