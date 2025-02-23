<template>
  <div class="container mx-auto mt-8">
    <h1 class="text-2xl font-bold mb-4">Newsletters Pretplatnici</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full table-auto border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 text-left">Ime i Prezime</th>
            <th class="px-4 py-2 text-left">Email</th>
            <th class="px-4 py-2 text-left">Datum Privole</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="subscriber in subscribers"
            :key="subscriber._id"
            class="border-b hover:bg-gray-50"
          >
            <td class="px-4 py-2">{{ subscriber.ime_prezime }}</td>
            <td class="px-4 py-2">{{ subscriber.email }}</td>
            <td class="px-4 py-2">{{ subscriber.datum_privole }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "../axios";

const subscribers = ref([]);

const fetchSubscribers = async () => {
  try {
    const response = await axios.get("/pretplatnici");
    subscribers.value = response.data;
  } catch (error) {
    console.error("Error fetching subscribers:", error);
  }
};

onMounted(() => {
  fetchSubscribers();
});
</script>
