<template>
  <div>
    <Navbar />
    <div class="pt-20 px-4 md:px-8 lg:px-12 xl:px-16 pt-36">
      <h2
        data-aos="fade-right"
        class="text-2xl font-semibold text-[#556dac] mb-4"
      >
        {{ $t("about_us").toUpperCase() }}
      </h2>
      <hr data-aos="fade-right" class="border-t border-black w-96 my-4 mb-8" />
      <section class="text-center">
        <p
          data-aos="fade-up"
          class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          {{ $t("about_description") }}
        </p>
      </section>

      <!-- Our Mission -->
      <section
        data-aos="fade-up"
        class="my-16 grid md:grid-cols-2 gap-8 items-center bg-gray-100 dark:bg-gray-800 p-8 rounded-lg"
      >
        <div data-aos="fade-right">
          <h2 class="text-3xl font-semibold text-gray-900 dark:text-white">
            {{ $t("our_mission") }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 mt-4">
            {{ $t("mission_description") }}
          </p>
        </div>
        <img
          data-aos="fade-left"
          src="../assets/office.jpg"
          alt="office"
          class="rounded-lg shadow-lg w-full"
        />
      </section>

      <!-- Our Team -->
      <section class="my-16 text-center">
        <h2
          data-aos="fade-up"
          class="text-3xl font-semibold text-gray-900 dark:text-white"
        >
          {{ $t("meet_our_team") }}
        </h2>
        <p
          data-aos="fade-up"
          class="text-lg text-gray-600 dark:text-gray-300 mb-8"
        >
          {{ $t("team_description") }}
        </p>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center" data-aos="fade-up" data-aos-delay="100">
            <img
              src="../assets/davor.jpg"
              alt="Davor"
              class="rounded-full mx-auto shadow-md h-80"
            />
            <h3 class="text-xl font-medium mt-4 text-gray-900 dark:text-white">
              Davor Dadić
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t("davor_role") }}
            </p>
          </div>
          <div class="text-center" data-aos="fade-up" data-aos-delay="200">
            <img
              src="../assets/ivana.jpg"
              alt="Ivana"
              class="rounded-full mx-auto shadow-md h-80"
            />
            <h3 class="text-xl font-medium mt-4 text-gray-900 dark:text-white">
              Ivana Dadić
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t("ivana_role") }}
            </p>
          </div>
          <div class="text-center" data-aos="fade-up" data-aos-delay="300">
            <img
              src="../assets/lorena.jpg"
              alt="Lorena"
              class="rounded-full mx-auto shadow-md h-80"
            />
            <h3 class="text-xl font-medium mt-4 text-gray-900 dark:text-white">
              Lorena Tadić
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t("lorena_role") }}
            </p>
          </div>
        </div>
      </section>

      <!-- Contact Us -->
      <section
        data-aos="fade-up"
        class="my-16 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center"
      >
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-white">
          {{ $t("contact_us") }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-4">
          {{ $t("contact_description") }}
        </p>
        <a
          href="mailto:info@realty.com"
          class="text-blue-600 dark:text-blue-400 font-medium text-lg hover:underline"
        >
          info@realty.com
        </a>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "../components/NavbarComponent.vue";
import Footer from "../components/FooterComponent.vue";
import { onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
  });
});
</script>
