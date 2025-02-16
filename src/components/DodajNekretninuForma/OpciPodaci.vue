<template>
  <!-- Address -->
  <div class="mb-4">
    <label
      for="address-input"
      class="block text-gray-700 text-sm font-bold mb-2"
    >
      Adresa
    </label>
    <input
      id="address-input"
      type="text"
      v-model="inputAddress"
      placeholder="Unesite adresu"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <!-- Price -->
  <div class="mb-4">
    <label for="price" class="block text-gray-700 text-sm font-bold mb-2">
      Cijena
    </label>
    <input
      type="number"
      id="price"
      v-model="price"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="€"
    />
  </div>

  <!-- Livable Area -->
  <div class="mb-4">
    <label
      for="livable-area"
      class="block text-gray-700 text-sm font-bold mb-2"
    >
      Stambena površina
    </label>
    <input
      type="number"
      id="livable-area"
      v-model="livableArea"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="m²"
    />
  </div>

  <!-- Bedrooms -->
  <div class="mb-4">
    <label for="bedrooms" class="block text-gray-700 text-sm font-bold mb-2">
      Broj Soba
    </label>
    <input
      type="number"
      id="bedrooms"
      v-model="bedrooms"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="Unesite broj soba"
    />
  </div>

  <!-- Bathrooms -->
  <div class="mb-4">
    <label for="bathrooms" class="block text-gray-700 text-sm font-bold mb-2">
      Broj Kupaonica
    </label>
    <input
      type="number"
      id="bathrooms"
      v-model="bathrooms"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="Unesite broj kupaonica"
    />
  </div>

  <!-- Garden Area -->
  <div class="mb-4">
    <label for="garden-area" class="block text-gray-700 text-sm font-bold mb-2">
      Okućnica
    </label>
    <input
      type="number"
      id="garden-area"
      v-model="gardenArea"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="m²"
    />
  </div>
</template>
<script setup></script>
