<template>
  <div class="w-full bg-white rounded-lg shadow-md p-8">
    <h2 class="text-3xl font-bold mb-6 text-gray-800">Dodajte nekretninu</h2>
    <form @submit.prevent="addRealty">
      <DodajNazivNekretnine v-model="propertyName" />
      <OpciPodaci v-model="opciPodaci" />
      <Sadrzaji v-model="amenities" />
      <DodajOpisNekretnine v-model="description" />
      <OpciPodaciDva v-model="opciPodaciDva" />
      <SlikeNekretnine
        :images="images"
        :imagePreviews="imagePreviews"
        :modelValue="images"
        @update:images="images = $event"
        @update:imagePreviews="imagePreviews = $event"
        @previewImage="previewImage"
        @handleDrop="handleDrop"
        @handleDragOver="handleDragOver"
      />
      <Prodavatelji v-model="prodavatelji" />
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
import OpciPodaci from "./DodajNekretninuForma/OpciPodaci.vue";
import Sadrzaji from "./DodajNekretninuForma/Sadrzaji.vue";
import DodajOpisNekretnine from "./DodajNekretninuForma/DodajOpisNekretnine.vue";
import OpciPodaciDva from "./DodajNekretninuForma/OpciPodaciDva.vue";
import Prodavatelji from "./DodajNekretninuForma/Prodavatelji.vue";
import SlikeNekretnine from "./DodajNekretninuForma/SlikeNekretnine.vue";

const userEmail = JSON.parse(localStorage.getItem("user")).email;
console.log(userEmail);

const propertyName = ref({ en: "", hr: "", it: "", de: "" });
const opciPodaci = ref({
  address: "",
  price: "",
  livableArea: "",
  bedrooms: 0,
  bathrooms: 0,
  gardenArea: "",
});
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
const description = ref({ en: "", hr: "", it: "", de: "" });
const opciPodaciDva = ref({ buildType: "", buildYear: "", saleType: "" });
const prodavatelji = ref({ sellerName: "", sellerEmail: "", sellerPhone: "" });

// Image Upload Handling
const images = ref([]); // Holds File objects
const imagePreviews = ref(new Array(5).fill(null));

const previewImage = async (event, index) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviews.value[index] = e.target?.result;
    };
    reader.readAsDataURL(file);
    images.value[index] = file;
  }
};

const handleDrop = async (event, index) => {
  event.preventDefault();
  const file = event.dataTransfer?.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviews.value[index] = e.target?.result;
    };
    reader.readAsDataURL(file);
    images.value[index] = file;
  }
};

const handleDragOver = (event) => {
  event.preventDefault();
};

// Function to upload images and get URLs
const uploadImages = async () => {
  const formData = new FormData();
  images.value.forEach((image) => {
    if (image) formData.append("images", image);
  });

  try {
    const response = await axios.post("/upload-images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.imageUrls; // Server should return an array of image URLs
  } catch (error) {
    console.error("Error uploading images:", error);
    return [];
  }
};

// Function to prepare data for the database
const prepareDataForDatabase = (imageUrls) => {
  return {
    propertyName: { ...propertyName.value },
    address: opciPodaci.value.address,
    price: opciPodaci.value.price,
    livableArea: opciPodaci.value.livableArea,
    bedrooms: opciPodaci.value.bedrooms,
    bathrooms: opciPodaci.value.bathrooms,
    gardenArea: opciPodaci.value.gardenArea,
    amenities: { ...amenities.value },
    description: { ...description.value },
    buildType: opciPodaciDva.value.buildType,
    buildYear: opciPodaciDva.value.buildYear,
    saleType: opciPodaciDva.value.saleType,
    seller: { ...prodavatelji.value },
    images: imageUrls, // Store image URLs
  };
};

// Function to add realty (upload images first, then send property data)
const addRealty = async () => {
  console.log("Uploading images...");
  const imageUrls = await uploadImages();

  console.log("Sending property data...");
  const data = prepareDataForDatabase(imageUrls);

  try {
    await axios.post("/properties", data);
    console.log("Property added successfully!");
  } catch (error) {
    console.error("Error adding property:", error);
  }
};
</script>
