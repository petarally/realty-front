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
const authToken = JSON.parse(localStorage.getItem("user")).token;

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

// Upload slika početak
const images = ref([]);
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

const uploadImages = async () => {
  const formData = new FormData();
  images.value.forEach((image, index) => {
    if (image) formData.append("images", image);
  });

  try {
    const response = await axios.post("/upload-images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const totalImages = images.value.length;
        const uploadedImages = Math.round(
          (progressEvent.loaded * totalImages) / progressEvent.total
        );
        alert(`${uploadedImages}/${totalImages} images uploaded`);
      },
    });
    return response.data.imageUrls; // Vraća niz URL-ova slika
  } catch (error) {
    console.error("Error uploading images:", error);
    return [];
  }
};
// Upload slika kraj

// Funkcija za dodavanje nekretnine (prvo upload slika, zatim slanje podataka o nekretnini)
const prepareData = async () => {
  const imageUrls = await uploadImages();
  const data = {
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
    images: imageUrls,
    userEmail: userEmail,
    date: new Date().toISOString(),
  };
  return data;
};

const addRealty = async () => {
  const nekretnina = await prepareData();
  try {
    const response = await axios.post("/nekretnine", nekretnina, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const nekretninaId = response.data.id;
    console.log("Nekretnina je uspješno dodana u bazu!");
    alert("Nekretnina je uspješno dodana u bazu!");
    const prodavatelj = {
      ...prodavatelji.value,
      nekretninaId,
    };
    await axios.post("/nekretnine/prodavatelji", prodavatelj, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log("Prodavatelj je uspješno dodan u bazu!");
    alert("Prodavatelj je uspješno dodan u bazu!");
  } catch (error) {
    console.error("Greška prilikom dodavanja nekretnine:", error);
  }
};
</script>
