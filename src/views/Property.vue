<template>
  <div>
    <Navbar />
    <div
      class="bg-gray-800 text-gray-100 py-5 dark:bg-gray-900 dark:text-gray-200"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div class="flex justify-between items-center font-poppins">
          <div class="text-center lg:text-left">
            <h1 class="text-3xl font-semibold">Title</h1>
            <p class="text-xl text-yellow-300 mt-1">Price</p>
          </div>
          <p class="text-xl text-yellow-300 mt-1 lg:mt-0">Property ID</p>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
      <ImageView />
      <!-- Property Info Bar -->
      <div class="bg-gray-100 dark:bg-gray-800 mt-5">
        <div class="flex justify-between items-center py-4 px-8">
          <p class="flex items-center">
            <i class="fas fa-ruler-combined mr-2"></i> 100 m²
          </p>
          <p class="flex items-center"><i class="fas fa-bed mr-2"></i> 5</p>
          <p class="flex items-center"><i class="fas fa-bath mr-2"></i> 2</p>
        </div>
      </div>
    </div>

    <h3
      class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 my-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-2"
    >
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
      blanditiis cum nihil atque voluptatibus nostrum fugit. Aliquam officiis
      obcaecati sapiente. Earum cumque officia hic libero quidem error quos modi
      aspernatur.
    </h3>

    <ContactForm />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "../components/NavbarComponent.vue";
import ImageView from "../components/ImageViewComponent.vue";
import ContactForm from "../components/ContactFormComponent.vue";
import Footer from "../components/FooterComponent.vue";
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
