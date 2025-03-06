<template>
  <div>
    <Navbar />

    <div class="pt-20 relative">
      <div
        class="relative w-full h-[40vh] bg-cover bg-center hidden sm:block"
        :style="{ backgroundImage: `url(${officeImage})` }"
      >
        <div class="absolute inset-0 bg-black/20"></div>

        <div
          class="absolute inset-0 flex items-center justify-center hidden sm:flex"
        >
          <h1 class="text-4xl font-bold text-white text-center">
            {{ $t("welcome_to_realty") }}
          </h1>
        </div>
      </div>

      <div
        class="w-full px-4 pt-8 md:px-8 lg:px-12 xl:px-16 sm:pt-0 sm:absolute sm:left-0 sm:transform sm:-translate-y-1/2"
        style="top: calc(64vh - 50%)"
        data-aos="fade-down"
        data-aos-duration="500"
      >
        <Filter />
      </div>
    </div>

    <div class="px-4 md:px-8 lg:px-12 xl:px-16 md:pt-24 lg:pt-24">
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
        class="text-2xl font-semibold text-[#556dac] mb-4 py-6"
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
import { ref, onMounted, computed, watch, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import officeImage from "../assets/office.jpg";
import Filter from "../components/FilterComponent.vue";
import Navbar from "../components/NavbarComponent.vue";
import PropertyCard from "../components/PropertyCardComponent.vue";
import Footer from "../components/FooterComponent.vue";
import axios from "../axios";

const responseData = ref([]);
const router = useRouter();
const route = useRoute();


const fetchData = async () => {
  try {
    const response = await axios.get("/nekretnine");
    console.log(response);
    responseData.value = response.data.filter((property) => !property.delete);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


const handleCardClick = (id) => {
  router.push({ name: "Property", params: { id } });
};

const lastFourPosts = computed(() => responseData.value.slice(-4).slice().reverse());
const lastEightToFourPosts = computed(() => responseData.value.slice(-8, -4).slice().reverse());

onMounted(() => {
  fetchData();
});

watch(() => route.params.lang, () => {
  fetchData();
});

const selectedLanguage = computed(() => localStorage.getItem("language") || "hr");

const metaKeywords = {
  en: "Real estate, vacation, rental, property, Croatia, Istria",
  hr: "Nekretnine, odmor, najam, vlasništvo, Hrvatska, Istra",
  it: "Immobiliare, vacanza, affitto, proprietà, Croazia, Istria",
  de: "Immobilien, Urlaub, Miete, Eigentum, Kroatien, Istrien",
};

watchEffect(() => {
  useHead({
    meta: [
      {
        name: "keywords",
        content: metaKeywords[selectedLanguage.value],
      },
    ],
  });
});
</script>
