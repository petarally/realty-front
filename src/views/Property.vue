<template>
  <div>
    <Navbar />
    <div
      class="text-gray-100 py-5 dark:bg-gray-900 dark:text-gray-200 pt-32"
      style="background-color: #546dac"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div
          class="flex flex-col lg:flex-row justify-between items-center lg:items-start font-poppins"
        >
          <div class="text-left">
            <h1 class="text-3xl font-semibold">{{ propertyName }}</h1>
            <p class="text-xl mt-1" style="color: #fff00b">
              {{ formattedPrice }} €
            </p>
            <p class="text-xl mt-1 lg:hidden" style="color: #fff00b">
              {{ property?._id }}
            </p>
          </div>
          <p class="text-xl mt-1 hidden lg:block" style="color: #fff00b">
            {{ property?._id }}
          </p>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
      <ImageView :images="property?.images || []" />
      <!-- Property Info Bar -->
      <div class="bg-gray-100 dark:bg-gray-800 mt-5">
        <div class="flex justify-between items-center py-4 px-8">
          <p class="flex items-center">
            <i class="fas fa-ruler-combined mr-2"></i>
            {{ property?.livableArea }} m²
          </p>
          <p class="flex items-center">
            <i class="fas fa-bed mr-2"></i> {{ property?.bedrooms }}
          </p>
          <p class="flex items-center">
            <i class="fas fa-bath mr-2"></i> {{ property?.bathrooms }}
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-2">
      <div class="flex justify-center">
        <div class="grid grid-cols-2 gap-6">
          <div
            v-if="property.amenities?.accessToBeach"
            class="flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            <i class="fas fa-umbrella-beach text-blue-500 mr-3"></i>
            <span class="text-gray-900 dark:text-gray-100">{{
              $t("amenitiesLabels.accessToBeach")
            }}</span>
          </div>
          <div
            v-if="property.amenities?.garage"
            class="flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            <i class="fas fa-warehouse text-green-500 mr-3"></i>
            <span class="text-gray-900 dark:text-gray-100">{{
              $t("amenitiesLabels.garage")
            }}</span>
          </div>
          <div
            v-if="property.amenities?.parking"
            class="flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            <i class="fas fa-parking text-yellow-500 mr-3"></i>
            <span class="text-gray-900 dark:text-gray-100">{{
              $t("amenitiesLabels.parking")
            }}</span>
          </div>
          <div
            v-if="property.amenities?.pool"
            class="flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            <i class="fas fa-swimmer text-teal-500 mr-3"></i>
            <span class="text-gray-900 dark:text-gray-100">{{
              $t("amenitiesLabels.pool")
            }}</span>
          </div>
          <div
            v-if="property.amenities?.seaView"
            class="flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            <i class="fas fa-water text-blue-500 mr-3"></i>
            <span class="text-gray-900 dark:text-gray-100">{{
              $t("amenitiesLabels.seaView")
            }}</span>
          </div>
          <div
            v-if="property.amenities?.septicTank"
            class="flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            <i class="fas fa-toilet text-red-500 mr-3"></i>
            <span class="text-gray-900 dark:text-gray-100">{{
              $t("amenitiesLabels.septicTank")
            }}</span>
          </div>
          <div
            v-if="property.amenities?.sewageSystem"
            class="flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            <i class="fas fa-water text-blue-500 mr-3"></i>
            <span class="text-gray-900 dark:text-gray-100">{{
              $t("amenitiesLabels.sewageSystem")
            }}</span>
          </div>
          <div
            v-if="property.amenities?.wifi"
            class="flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            <i class="fas fa-wifi text-purple-500 mr-3"></i>
            <span class="text-gray-900 dark:text-gray-100">{{
              $t("amenitiesLabels.wifi")
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-2 section-desc-feat">
      <h2 class="text-2xl font-semibold text-[#556dac] mb-4">
        {{ $t("description").toUpperCase() }}
      </h2>
      <hr class="border-t border-black w-96 my-4" />
      <p
        class="text-base leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line"
      >
        {{ propertyDescription }}
      </p>
    </div>

    <ContactForm />
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "../components/NavbarComponent.vue";
import ImageView from "../components/ImageViewComponent.vue";
import ContactForm from "../components/ContactFormComponent.vue";
import Footer from "../components/FooterComponent.vue";
import axios from "../axios";

const route = useRoute();
const selectedLanguage = ref(localStorage.getItem("language") || "en");
const property = ref({});

const formatPrice = (value) => {
  return new Intl.NumberFormat(selectedLanguage.value.code).format(value);
};

const formattedPrice = computed(() => {
  return formatPrice(property.value?.price || 0);
});

const propertyName = computed(() => {
  return (
    property.value?.propertyName?.[selectedLanguage.value] ||
    property.value?.propertyName?.["en"] ||
    ""
  );
});

const propertyDescription = computed(() => {
  return (
    property.value?.description?.[selectedLanguage.value] ||
    property.value?.description?.["en"] ||
    ""
  );
});

onMounted(async () => {
  const propertyId = route.params.id;
  try {
    const response = await axios.get(`/nekretnine/${propertyId}`);
    property.value = response.data;
    console.log("Fetched property data:", property.value);
  } catch (error) {
    console.error("Error fetching property data:", error);
  }
});
</script>
