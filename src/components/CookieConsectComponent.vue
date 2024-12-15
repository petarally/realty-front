<template>
  <div
    v-if="isVisible"
    class="fixed bottom-0 p-6 w-full flex justify-center z-[2000] bg-gray-800 bg-opacity-75"
  >
    <div
      class="bg-white bg-opacity-95 text-sm rounded-lg shadow-lg w-full max-w-screen-lg mx-4"
    >
      <div
        class="p-6 flex items-center justify-between rounded border border-gray-300"
      >
        <p class="text-gray-700">
          By using XYZ, you agree to our
          <a class="underline font-bold text-blue-600" href="#" target="_blank"
            >Cookies Policy</a
          >.
        </p>
        <button
          @click="acceptCookies"
          type="button"
          class="px-5 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 ml-4"
        >
          Accept
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isVisible = ref(true);
const COOKIE_CONSENT_KEY = "cookie_consent_accepted";

const checkCookieConsent = () => {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (consent) {
    isVisible.value = false;
  }
};

const acceptCookies = () => {
  localStorage.setItem(COOKIE_CONSENT_KEY, "true");
  isVisible.value = false;
};

onMounted(() => {
  checkCookieConsent();
});
</script>
