<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-4">Prodavatelji</h2>
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
            <th
              class="px-4 py-2 border-b bg-gray-100 text-left text-sm font-semibold text-gray-700"
            >
              Prodavateljeve nekretnine
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="seller in sellers"
            :key="seller.email"
            class="hover:bg-gray-100"
          >
            <td class="px-4 py-2 border-b">{{ seller.name }}</td>
            <td class="px-4 py-2 border-b">{{ seller.phone }}</td>
            <td class="px-4 py-2 border-b">{{ seller.email }}</td>
            <td class="px-4 py-2 border-b">
              <ul>
                <!-- Iterate over seller's matched properties -->
                <li v-for="property in seller.properties" :key="property._id">
                  <a
                    :href="`/hr/property/${property._id}`"
                    class="text-blue-500 hover:underline"
                  >
                    {{ property.propertyName?.hr || property._id }}
                  </a>
                </li>
              </ul>
            </td>
          </tr>
          <tr v-if="sellers.length === 0">
            <td colspan="4" class="px-4 py-2 text-center text-gray-500">
              Nema dostupnih prodavatelja
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "../axios";

const sellers = ref([]);
const properties = ref([]);

onMounted(async () => {
  try {
    const sellers_res = await axios.get("/sellers");
    const properties_res = await axios.get("/posts");

    properties.value = properties_res.data;
    sellers.value = sellers_res.data;

    sellers.value.forEach((seller) => {
      if (seller.propertyId && Array.isArray(seller.propertyId)) {
        seller.properties = seller.propertyId
          .map((propertyId) => {
            const matchedProperty = properties.value.find(
              (property) => property._id === propertyId
            );
            console.log(
              `Matched property for ${seller.name}:`,
              matchedProperty
            );
            return matchedProperty;
          })
          .filter(Boolean);
      } else {
        seller.properties = [];
      }
    });

    // Log each seller's properties to verify the mapping
    sellers.value.forEach((seller) => {
      console.log(`${seller.name}'s properties:`, seller.properties);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>
