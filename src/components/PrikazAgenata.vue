<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-4">Agenti</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th
              class="px-4 py-2 border-b bg-gray-100 text-left text-sm font-semibold text-gray-700"
            >
              Ime i prezime
            </th>
            <th
              class="px-4 py-2 border-b bg-gray-100 text-left text-sm font-semibold text-gray-700"
            >
              Telefon
            </th>
            <th
              class="px-4 py-2 border-b bg-gray-100 text-left text-sm font-semibold text-gray-700"
            >
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="agent in agents"
            :key="agent.sluzbeni_email"
            class="hover:bg-gray-100"
          >
            <td class="px-4 py-2 border-b">{{ agent.ime_i_prezime }}</td>
            <td class="px-4 py-2 border-b">{{ agent.sluzbeni_telefon }}</td>
            <td class="px-4 py-2 border-b">{{ agent.sluzbeni_email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "../axios";

const agents = ref([]);
const authToken = JSON.parse(localStorage.getItem("user")).token;

onMounted(async () => {
  try {
    const response = await axios.get("/users", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    agents.value = response.data
      .filter((agent) => agent.rola === "agent")
      .map((agent) => ({
        ime_i_prezime: agent.ime_i_prezime,
        sluzbeni_telefon: agent.sluzbeni_telefon,
        sluzbeni_email: agent.sluzbeni_email,
      }));
  } catch (error) {
    console.error("Greška pri dohvaćanju podataka:", error);
  }
});
</script>
