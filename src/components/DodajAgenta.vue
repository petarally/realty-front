<template>
  <div class="w-full bg-white rounded-lg shadow-md p-8">
    <h2 class="text-3xl font-bold mb-6 text-gray-800">Dodaj agenta</h2>
    <form @submit.prevent="addAgent">
      <div class="mb-4">
        <input
          id="name"
          v-model="form.ime_i_prezime"
          type="text"
          required
          class="block w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ime i prezime agenta"
        />
      </div>
      <div class="mb-4">
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="block w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Email za login agenta"
        />
      </div>
      <div class="mb-4">
        <input
          id="password"
          v-model="form.password"
          type="text"
          required
          class="block w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Unesite lozinku agenta za ulaz na portal"
        />
      </div>
      <div class="mb-4">
        <input
          id="sluzbeni_telefon"
          v-model="form.sluzbeni_telefon"
          type="text"
          required
          class="block w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Unesite službeni telefon agenta za ulaz na portal"
        />
      </div>
      <div class="mb-4">
        <input
          id="sluzbeni_email"
          v-model="form.sluzbeni_email"
          type="email"
          required
          class="block w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Unesite službeni email agenta"
        />
      </div>
      <div class="flex items-center justify-end">
        <button
          type="submit"
          class="add-button bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Dodaj agenta
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "../axios";

const form = ref({
  ime_i_prezime: "",
  email: "",
  password: "",
  sluzbeni_telefon: "",
  sluzbeni_email: "",
});

const authToken = JSON.parse(localStorage.getItem("user")).token;

const addAgent = async () => {
  try {
    await axios.post("users/createUser", form.value, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    form.value.ime_i_prezime = "";
    form.value.email = "";
    form.value.password = "";
    form.value.sluzbeni_telefon = "";
    form.value.sluzbeni_email = "";
    alert("Agent je uspješno dodan!");
  } catch (error) {
    alert("Došlo je do greške prilikom dodavanja agenta!");
  }
};
</script>
