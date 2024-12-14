<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900"
  >
    <div
      class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
    >
      <h1
        class="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100"
      >
        Login Form
      </h1>
      <form @submit.prevent="login">
        <div class="relative mb-4">
          <input
            type="text"
            id="email"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            for="email"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >Email</label
          >
        </div>
        <div class="relative mb-4">
          <input
            type="text"
            id="password"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            for="password"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >Password</label
          >
        </div>
        <div v-if="error" class="mb-4 text-red-500 text-sm">{{ error }}</div>
        <div class="relative mb-4">
          <button
            type="button"
            class="block w-full px-2.5 pb-2.5 pt-4 text-sm text-white bg-blue-700 rounded-lg border border-blue-700 appearance-none dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-0 focus:border-blue-800 peer"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const error = ref("");

const login = () => {
  // Mock login function
  if (email.value === "admin@example.com" && password.value === "password") {
    localStorage.setItem("auth", "true");
    window.location.href = "/admin";
  } else {
    error.value = "Invalid email or password";
  }
};
</script>
