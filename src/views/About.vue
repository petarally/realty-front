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
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {{ $t("about_description") }}
        </p>
      </section>

      <!-- Hero Image -->
      <div class="my-8 flex justify-center">
        <img
          src="https://via.placeholder.com/1200x500"
          alt="Real Estate"
          class="rounded-lg shadow-lg w-full max-w-4xl"
        />
      </div>

      <!-- Our Mission -->
      <section class="my-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-3xl font-semibold text-gray-900 dark:text-white">
            {{ $t("our_mission") }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 mt-4">
            {{ $t("mission_description") }}
          </p>
        </div>
        <img
          src="https://via.placeholder.com/500x300"
          alt="Mission"
          class="rounded-lg shadow-lg w-full"
        />
      </section>

      <!-- Our Team -->
      <section class="my-16 text-center">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-white">
          {{ $t("meet_our_team") }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {{ $t("team_description") }}
        </p>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              class="rounded-full mx-auto shadow-md"
            />
            <h3 class="text-xl font-medium mt-4 text-gray-900 dark:text-white">
              {{ $t("team_member_1") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t("team_role_1") }}
            </p>
          </div>
          <div class="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              class="rounded-full mx-auto shadow-md"
            />
            <h3 class="text-xl font-medium mt-4 text-gray-900 dark:text-white">
              {{ $t("team_member_2") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t("team_role_2") }}
            </p>
          </div>
          <div class="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              class="rounded-full mx-auto shadow-md"
            />
            <h3 class="text-xl font-medium mt-4 text-gray-900 dark:text-white">
              {{ $t("team_member_3") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t("team_role_3") }}
            </p>
          </div>
        </div>
      </section>

      <!-- Contact Us -->
      <section
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
</script>
