<template>
  <div class="max-w-md mx-auto bg-white p-6">
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <input
          id="name"
          v-model="form.ime_prezime"
          type="text"
          required
          class="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Your Name"
        />
      </div>

      <div class="mb-4">
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Your Email"
        />
      </div>

      <button
        type="submit"
        class="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        :disabled="loading"
      >
        <span v-if="loading">Subscribing...</span>
        <span v-else>Subscribe</span>
      </button>
    </form>

    <!-- Success Message -->
    <div
      v-if="successMessage"
      class="mt-4 p-3 bg-green-100 text-green-800 rounded-md"
    >
      <p>{{ successMessage }}</p>
    </div>

    <!-- Error Message -->
    <div
      v-if="errorMessage"
      class="mt-4 p-3 bg-red-100 text-red-800 rounded-md"
    >
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "../axios";

const form = ref({
  ime_prezime: "",
  email: "",
});

const successMessage = ref("");
const errorMessage = ref("");
const loading = ref(false);

const submitForm = async () => {
  // Reset messages
  successMessage.value = "";
  errorMessage.value = "";

  loading.value = true;

  try {
    await axios.post("/pretplatnici", form.value);
    successMessage.value = "Thank you for subscribing to our newsletter!";
    form.value.ime_prezime = "";
    form.value.email = "";
  } catch (error) {
    errorMessage.value =
      "An error occurred while subscribing. Please try again later.";
  } finally {
    loading.value = false;
  }
};
</script>
