<template>
  <div>
    <Navbar />
    <div class="px-4 md:px-8 lg:px-12 xl:px-16">
      <h1
        class="text-4xl font-bold text-center my-8 text-gray-900 dark:text-white"
      >
        Welcome to Realty
      </h1>
      <Filter />
      <h2
        class="text-2xl font-semibold text-center my-4 text-gray-700 dark:text-gray-300"
      >
        Find Your Dream Home with Us
      </h2>
      <h2
        class="text-xl font-medium text-center my-4 text-gray-600 dark:text-gray-400"
      >
        Explore our wide range of properties and find the perfect place to call
        home.
      </h2>
      <div class="flex justify-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Filter from "../components/FilterComponent.vue";
import Navbar from "../components/NavbarComponent.vue";
import PropertyCard from "../components/PropertyCardComponent.vue";
import Footer from "../components/FooterComponent.vue";
</script>
