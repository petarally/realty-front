<template>
  <div class="filter-section bg-customBlue py-8 px-4 sm:px-6">
    <div class="grid lg:grid-cols-4 gap-4">
      <select v-model="filters.location" class="p-2 bg-gray-100 border border-gray-300 w-full">
        <option value="">{{ filterOptions.locationLabel }}</option>
        <option v-for="location in locations" :key="location" :value="location">
          {{ location }}
        </option>
      </select>

      <select v-model="filters.propertyType" class="p-2 bg-gray-100 border border-gray-300 w-full">
        <option value="">{{ filterOptions.propertyTypeLabel }}</option>
        <option v-for="type in propertyTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>

      <select v-model="filters.status" class="p-2 bg-gray-100 border border-gray-300 w-full">
        <option value="">{{ filterOptions.statusLabel }}</option>
        <option value="Novogradnja">{{ filterOptions.newConstruction }}</option>
        <option value="Starogradnja">{{ filterOptions.resale }}</option>
      </select>

      <button
        @click="applyFilter"
        class="p-2 hidden lg:block hover:bg-blue-700 w-full"
        :style="{ backgroundColor: '#556DAC', color: '#FFF000' }"
      >
        {{ filterOptions.searchButton }}
      </button>
    </div>

    <div class="grid lg:grid-cols-2 gap-4 mt-4">
      <input
        v-model="filters.price"
        type="number"
        :placeholder="filterOptions.maxPricePlaceholder"
        class="p-2 bg-gray-100 border border-gray-300 w-full"
      />

      <input
        v-model="filters.size"
        type="number"
        :placeholder="filterOptions.sizePlaceholder"
        class="p-2 bg-gray-100 border border-gray-300 w-full"
      />
    </div>

    <div class="mt-4 lg:hidden flex justify-end">
      <button
        @click="applyFilter"
        class="p-2 w-full md:w-auto hover:bg-blue-700"
        :style="{ backgroundColor: '#556DAC', color: '#FFF000' }"
      >
        {{ filterOptions.searchButton }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterComponent',
  props: {
    properties: Array,
    currentLang: String,
  },
  data() {
    return {
      filters: {
        location: '',
        propertyType: '',
        status: '',
        price: '',
        size: '',
      },
      locations: [],
      propertyTypes: [],
    }
  },
  computed: {
    filterOptions() {
      const options = {
        en: {
          locationLabel: 'Location',
          propertyTypeLabel: 'Property Type',
          statusLabel: 'New/Resale',
          newConstruction: 'New Construction',
          resale: 'Resale',
          maxPricePlaceholder: 'Max Price (€)',
          sizePlaceholder: 'Size (m2)',
          searchButton: 'Search',
          propertyTypes: ['Villa', 'Apartment', 'Land'],
        },
        hr: {
          locationLabel: 'Lokacija',
          propertyTypeLabel: 'Vrsta nekretnine',
          statusLabel: 'Novogradnja/Starogradnja',
          newConstruction: 'Novogradnja',
          resale: 'Starogradnja',
          maxPricePlaceholder: 'Max cijena (€)',
          sizePlaceholder: 'Površina (m2)',
          searchButton: 'Pretraživanje',
          propertyTypes: ['Vila', 'Stan', 'Zemljište'],
        },
        it: {
          locationLabel: 'Località',
          propertyTypeLabel: 'Tipo di proprietà',
          statusLabel: 'Nuova/Rivendita',
          newConstruction: 'Nuova costruzione',
          resale: 'Rivendita',
          maxPricePlaceholder: 'Prezzo massimo (€)',
          sizePlaceholder: 'Dimensione (m2)',
          searchButton: 'Cerca',
          propertyTypes: ['Villa', 'Appartamento', 'Terreno'],
        },
        de: {
          locationLabel: 'Ort',
          propertyTypeLabel: 'Immobilientyp',
          statusLabel: 'Neu/Wiederverkauf',
          newConstruction: 'Neubau',
          resale: 'Wiederverkauf',
          maxPricePlaceholder: 'Max Preis (€)',
          sizePlaceholder: 'Größe (m2)',
          searchButton: 'Suche',
          propertyTypes: ['Villa', 'Wohnung', 'Grundstück'],
        },
      }
      return options[this.currentLang] || options.en
    },
  },
  methods: {
    applyFilter() {
      const filteredProperties = this.properties.filter((property) => {
        return (
          (this.filters.location ? property.location.includes(this.filters.location) : true) &&
          (this.filters.propertyType ? property.type === this.filters.propertyType : true) &&
          (this.filters.status ? property.status === this.filters.status : true) &&
          (this.filters.price ? property.price <= parseInt(this.filters.price) : true) &&
          (this.filters.size ? this.filterBySize(property.size, this.filters.size) : true)
        )
      })

      this.$emit('filtered', filteredProperties)
    },
    filterBySize(size, selectedSize) {
      switch (selectedSize) {
        case 'small':
          return size < 50
        case 'medium':
          return size >= 50 && size <= 100
        case 'large':
          return size > 100
        default:
          return true
      }
    },
  },
  mounted() {
    this.locations = ['Location 1', 'Location 2', 'Location 3']
    this.propertyTypes = this.filterOptions.propertyTypes
  },
}
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>
