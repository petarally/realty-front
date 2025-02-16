<template>
  <div class="mb-4">
    <label for="build-type" class="block text-gray-700 text-sm font-bold mb-2">
      Tip Građevine
    </label>
    <select
      id="build-type"
      v-model="buildType"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="villa">Vila</option>
      <option value="apartment">Stan</option>
      <option value="field">Zemljište</option>
    </select>
  </div>

  <div class="mb-4">
    <label for="build-year" class="block text-gray-700 text-sm font-bold mb-2">
      Novogradnja/Starogradnja
    </label>
    <select
      id="build-year"
      v-model="buildYear"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="new">Novogradnja</option>
      <option value="old">Starogradnja</option>
    </select>
  </div>

  <!-- Sale Type -->
  <div class="mb-4">
    <label for="sale-type" class="block text-gray-700 text-sm font-bold mb-2">
      Vrsta Prodaje
    </label>
    <select
      id="sale-type"
      v-model="saleType"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="direct">Direktna prodaja</option>
      <option value="resell">Resell</option>
    </select>
  </div>
</template>
<script setup></script>
