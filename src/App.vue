<template>
  <div>
    <router-view></router-view>
    <CookieConsent />
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from "vue";
import CookieConsent from "../src/components/CookieConsectComponent.vue";
import AOS from "aos";
import "aos/dist/aos.css";

const selectedLanguage = ref({ code: "hr", name: "Hrvatski", flag: "🇭🇷" });
provide("selectedLanguage", selectedLanguage);

onMounted(() => {
  AOS.init();
});
</script>
