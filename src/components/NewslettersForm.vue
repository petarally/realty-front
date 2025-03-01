<template>
  <div class="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg">
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <input
          id="name"
          v-model="form.ime_prezime"
          type="text"
          required
          class="block w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :placeholder="$t('newslettersForm.placeholder_name')"
        />
      </div>

      <div class="mb-4">
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="block w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :placeholder="$t('newslettersForm.placeholder_email')"
        />
      </div>

      <button
        type="submit"
        class="w-full py-2 bg-[#34519D] dark:bg-[#0056b3] text-white font-semibold rounded-md hover:bg-[#0056b3] dark:hover:bg-[#003f80] focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
        :disabled="loading"
      >
        <span v-if="loading">{{ $t("newslettersForm.subscribeLoading") }}</span>
        <span v-else>{{ $t("newslettersForm.subscribeBtn") }}</span>
      </button>
    </form>

    <!-- Success Message -->
    <div
      v-if="successMessage"
      class="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-md"
    >
      <p>{{ successMessage }}</p>
    </div>

    <!-- Error Message -->
    <div
      v-if="errorMessage"
      class="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded-md"
    >
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "../axios";
import { useI18n } from "vue-i18n";

const form = ref({
  ime_prezime: "",
  email: "",
});

const { t } = useI18n();

const successMessage = ref("");
const errorMessage = ref("");
const loading = ref(false);

const submitForm = async () => {
  successMessage.value = "";
  errorMessage.value = "";

  loading.value = true;

  try {
    await axios.post("/pretplatnici", form.value);
    successMessage.value = t("newslettersForm.subscribed");
    form.value.ime_prezime = "";
    form.value.email = "";
  } catch (error) {
    errorMessage.value = t("newslettersForm.subscribeErr");
  } finally {
    loading.value = false;
  }
};
</script>
