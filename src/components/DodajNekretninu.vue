<template>
  <div class="w-full bg-white rounded-lg shadow-md p-8">
    <h2 class="text-3xl font-bold mb-6 text-gray-800">Dodajte nekretninu</h2>
    <form @submit.prevent="addRealty">
      <!-- Property Name Section -->
      <DodajNazivNekretnine v-model="propertyName" />
      <OpciPodaci
        v-model="address"
        v-model:price="price"
        v-model:livableArea="livableArea"
        v-model:bedrooms="bedrooms"
      />

      <!-- Amenities -->
      <Sadrzaji v-model="amenities" />
      <DodajOpisNekretnine
        v-model="description"
        :descriptionLanguage="descriptionLanguage"
        @update:descriptionLanguage="updateDescriptionLanguage"
      />

      <OpciPodaciDva
        v-model:buildType="buildType"
        v-model:buildYear="buildYear"
        v-model:saleType="saleType"
      />

      <!-- Image Upload Section -->
      <SlikeNekretnine
        v-model="images"
        v-model:imagePreviews="imagePreviews"
        @previewImage="previewImage"
        @handleDrop="handleDrop"
        @handleDragOver="handleDragOver"
      />

      <!-- Name and surname of seller -->
      <Prodavatelji
        v-model:sellerName="sellerName"
        v-model:sellerEmail="sellerEmail"
        v-model:sellerPhone="sellerPhone"
      />

      <!-- Submit Button -->
      <div class="flex items-center justify-end">
        <button
          type="submit"
          class="add-button bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Dodajte nekretninu
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "../axios";
import DodajNazivNekretnine from "./DodajNekretninuForma/DodajNazivNekretnine.vue";
import DodajOpisNekretnine from "./DodajNekretninuForma/DodajOpisNekretnine.vue";
import OpciPodaci from "./DodajNekretninuForma/OpciPodaci.vue";
import OpciPodaciDva from "./DodajNekretninuForma/OpciPodaciDva.vue";
import Prodavatelji from "./DodajNekretninuForma/Prodavatelji.vue";
import Sadrzaji from "./DodajNekretninuForma/Sadrzaji.vue";
import SlikeNekretnine from "./DodajNekretninuForma/SlikeNekretnine.vue";

// Form state
const propertyName = ref({
  en: "",
  hr: "",
  it: "",
  de: "",
});
const address = ref("");
const price = ref("");
const livableArea = ref("");
const bedrooms = ref("");
const bathrooms = ref("");
const gardenArea = ref("");
const sellerName = ref("");
const sellerEmail = ref("");
const sellerPhone = ref("");
const amenities = ref({
  wifi: false,
  parking: false,
  pool: false,
  garage: false,
  seaView: false,
  accessToBeach: false,
  septicTank: false,
  sewageSystem: false,
});
const description = ref({
  en: "",
  hr: "",
  it: "",
  de: "",
});
const descriptionLanguage = ref("hr");
const buildType = ref("villa");
const buildYear = ref("new");
const saleType = ref("direct");

// Image state
const images = ref([]);
const imagePreviews = ref(new Array(5).fill(null));

// Handle image preview, drag-and-drop, and other events
const previewImage = async (event, index) => {
  const file = event.target.files?.[0];
  if (file) {
    try {
      // Convert to WebP and resize
      const webpImage = await convertImageToWebP(file, 800, 800);

      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviews.value[index] = e.target?.result;
      };
      reader.readAsDataURL(webpImage);
      images.value[index] = webpImage;
    } catch (error) {
      console.error("Error processing image: ", error);
    }
  }
};

const handleDrop = async (event, index) => {
  event.preventDefault();
  const file = event.dataTransfer?.files[0];
  if (file) {
    try {
      const webpImage = await convertImageToWebP(file, 800, 800);

      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviews.value[index] = e.target?.result;
      };
      reader.readAsDataURL(webpImage);
      images.value[index] = webpImage;
    } catch (error) {
      console.error("Error processing image: ", error);
    }
  }
};

const handleDragOver = (event) => {
  event.preventDefault();
};

const addRealty = async () => {
  try {
    const formData = new FormData();
    formData.append("propertyName", JSON.stringify(propertyName.value));
    formData.append("address", address.value);
    formData.append("price", price.value);
    formData.append("livableArea", livableArea.value);
    formData.append("bedrooms", bedrooms.value);
    formData.append("bathrooms", bathrooms.value);
    formData.append("gardenArea", gardenArea.value);
    formData.append("amenities", JSON.stringify(amenities.value));
    formData.append("description", JSON.stringify(description.value));
    formData.append("buildType", buildType.value);
    formData.append("buildYear", buildYear.value);
    formData.append("saleType", saleType.value);
    formData.append("sellerName", sellerName.value);
    formData.append("sellerEmail", sellerEmail.value);
    formData.append("sellerPhone", sellerPhone.value);

    for (let i = 0; i < images.value.length; i++) {
      if (images.value[i]) {
        formData.append("images", images.value[i]);
      }
    }

    const response = await axios.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Property added:", response.data);

    alert("Nekretnina je uspješno dodana u bazu!");

    // Reset form
    propertyName.value = {
      en: "",
      hr: "",
      it: "",
      de: "",
    };
    address.value = "";
    price.value = "";
    livableArea.value = "";
    bedrooms.value = "";
    bathrooms.value = "";
    gardenArea.value = "";
    amenities.value = {
      wifi: false,
      parking: false,
      pool: false,
      garage: false,
      seaView: false,
      accessToBeach: false,
      septicTank: false,
      sewageSystem: false,
    };
    description.value = {
      en: "",
      hr: "",
      it: "",
      de: "",
    };
    buildType.value = "villa";
    buildYear.value = "new";
    saleType.value = "direct";
    images.value = [];
    sellerName.value = "";
    sellerEmail.value = "";
    sellerPhone.value = "";
    imagePreviews.value = new Array(5).fill(null);
  } catch (e) {
    console.error("Error adding property:", e);
    alert("Error adding property. Please try again.");
  }
};

const updateDescriptionLanguage = (language) => {
  descriptionLanguage.value = language;
};
</script>

<style scoped>
.add-button {
  background-color: #1d4ed8;
  color: white;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.add-button:hover {
  background-color: #2563eb;
  transform: scale(1.05);
}

.add-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
}

.language-buttons {
  display: flex;
  margin-bottom: 1rem;
}

.language-buttons button {
  border: 1px solid #d1d5db;
  margin-right: 0.5rem;
}

.language-buttons button:last-child {
  margin-right: 0;
}

.language-buttons .active {
  background-color: #1d4ed8;
  color: white;
}
input,
textarea {
  margin-top: 0.5rem;
}

textarea {
  min-height: 100px;
}
</style>
