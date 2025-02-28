<script setup>
import { ref, shallowRef, onMounted, markRaw } from "vue";
import axios from "../axios";
import EditPropertyModal from "../components/EditPropertyModal.vue";

// State for properties and loading
const properties = ref([]);
const loading = ref(true);

// Fetch properties from the backend
const fetchProperties = async () => {
  loading.value = true;
  try {
    const response = await axios.get("/nekretnine");
    properties.value = response.data.filter((property) => !property.delete);
    console.log("Properties fetched:", properties.value);
    console.log(properties.value[0]?.images?.[0]); // Added optional chaining to prevent errors
  } catch (error) {
    console.error("Error fetching properties:", error);
  } finally {
    loading.value = false;
  }
};

const selectedProperty = shallowRef(null);
const isEditModalOpen = ref(false);

const openEditModal = (property) => {
  selectedProperty.value = markRaw({ ...property }); // Clone property
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  selectedProperty.value = null; // Reset selectedProperty when modal is closed
};

// Handle deletion of a property
const deleteProperty = async (propertyId) => {
  const authToken = JSON.parse(localStorage.getItem("user")).token;

  if (confirm("Jeste li sigurni da želite izbrisati ovu nekretninu?")) {
    try {
      // Delete the property document from the backend
      const response = await axios.delete(`/delete/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Check if the response was successful
      if (response.status === 200) {
        // Refresh the property list
        await fetchProperties();
        alert("Nekretnina je uspješno izbrisana!");
      } else {
        alert("Greška pri brisanju nekretnine.");
      }
    } catch (error) {
      console.error("Error deleting property: ", error);
      alert("Došlo je do greške pri brisanju nekretnine.");
    }
  }
};

const formatPrice = (value) => {
  return new Intl.NumberFormat("hr-HR").format(value);
};

// Fetch properties on component mount
onMounted(() => {
  fetchProperties();
});
</script>

<template>
  <div class="flex">
    <!-- Main Content -->
    <main class="flex-1 p-4 sm:p-8 bg-white rounded-lg shadow-lg overflow-auto">
      <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
        Moje nekretnine
      </h2>

      <!-- Show loading spinner if data is being fetched -->
      <div v-if="loading" class="flex justify-center items-center h-48">
        <svg
          class="animate-spin h-12 w-12 text-blue-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4V1M12 23v-3m8.657-2.657l2.121-2.121M3.343 20.657l2.121-2.121M21 12h3m-24 0h3m15.657-5.657l2.121-2.121M5.657 18.657l2.121-2.121M21 12a9 9 0 0 1-18 0"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <!-- Show table with properties -->
      <div v-else>
        <table class="min-w-full bg-white divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th
                class="px-4 sm:px-6 py-3 text-left text-sm sm:text-lg font-semibold text-gray-700"
              >
                Foto
              </th>
              <th
                class="px-4 sm:px-6 py-3 text-left text-sm sm:text-lg font-semibold text-gray-700"
              >
                Naziv nekretnine
              </th>
              <th
                class="px-4 sm:px-6 py-3 text-left text-sm sm:text-lg font-semibold text-gray-700"
              >
                Adresa
              </th>
              <th
                class="px-4 sm:px-6 py-3 text-left text-sm sm:text-lg font-semibold text-gray-700"
              >
                Cijena
              </th>
              <th
                class="px-4 sm:px-6 py-3 text-left text-sm sm:text-lg font-semibold text-gray-700"
              >
                Radnja
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-300">
            <tr v-for="property in properties" :key="property.id">
              <td class="px-4 sm:px-6 py-3 text-sm font-medium text-gray-900">
                <img
                  v-if="property.images && property.images.length > 0"
                  :src="property.images[0]"
                  alt="Main Image"
                  class="w-24 h-16 sm:w-32 sm:h-24 object-cover"
                />
              </td>

              <td class="px-4 sm:px-6 py-3 text-sm font-medium text-gray-900">
                {{ property.propertyName?.hr }}
              </td>
              <td class="px-4 sm:px-6 py-3 text-sm font-medium text-gray-900">
                {{ property.address }}
              </td>
              <td class="px-4 sm:px-6 py-3 text-sm font-medium text-gray-900">
                {{ formatPrice(property.price) }} €
              </td>
              <td class="px-4 sm:px-6 py-3 text-sm font-medium text-gray-900">
                <div class="flex space-x-2">
                  <button
                    @click="openEditModal(property)"
                    class="bg-blue-500 text-white px-4 py-2 rounded-lg flex-1"
                  >
                    Uredi
                  </button>
                  <button
                    @click="deleteProperty(property._id)"
                    class="bg-red-500 text-white px-4 py-2 rounded-lg flex-1"
                  >
                    Izbriši
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <!-- Edit Property Modal -->
    <EditPropertyModal
      v-if="isEditModalOpen"
      :isOpen="isEditModalOpen"
      :property="markRaw(selectedProperty)"
      @close="closeEditModal"
      @propertyUpdated="fetchProperties"
    />
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px 15px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

button.bg-red-500:hover {
  background-color: #c53030;
}
</style>
