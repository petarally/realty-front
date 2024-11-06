<template>
  <div class="container mx-auto p-4">
    <FilterComponent
      :properties="properties"
      :currentLang="$route.params.lang || 'en'"
      @filtered="updateFilteredProperties"
    />
    <p class="mb-4">{{ message }}</p>
    <div
      v-if="filteredProperties.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <PropertyCard
        v-for="property in filteredProperties"
        :key="property.id"
        :property="property"
        :currentLang="$route.params.lang || 'en'"
        @navigateToProperty="navigateToProperty"
      />
    </div>
    <div v-else>
      <p>No properties available.</p>
    </div>
  </div>
</template>

<script>
import { fetchHome } from '@/services/api.js'
import FilterComponent from '@/components/Filter.vue'
import PropertyCard from '@/components/PropertyCard.vue'

export default {
  components: {
    FilterComponent,
    PropertyCard,
  },
  data() {
    return {
      message: '',
      properties: [],
      filteredProperties: [],
    }
  },
  async created() {
    await this.fetchData()
  },
  watch: {
    '$route.params.lang': 'fetchData',
  },
  methods: {
    async fetchData() {
      const lang = this.$route.params.lang || 'en'
      console.log('Attempting to fetch data from backend...')
      try {
        const response = await fetchHome(lang)
        console.log('Data fetched successfully:', response)
        this.message = response.message
        // Mock properties data
        this.properties = [
          {
            id: 1,
            title: 'Beautiful Villa',
            description: 'A beautiful villa with a stunning view.',
            price: 1200000,
            image: 'https://via.placeholder.com/400x300',
            bedrooms: 3,
            bathrooms: 2,
            parking: true,
            garage: true,
            pool: true,
            type: 'villas',
            slug: 'beautiful-villa',
          },
          {
            id: 2,
            title: 'Modern Apartment',
            description: 'A modern apartment in the city center.',
            price: 850000,
            image: 'https://via.placeholder.com/400x300',
            bedrooms: 2,
            bathrooms: 1,
            parking: true,
            garage: false,
            pool: false,
            type: 'apartments',
            slug: 'modern-apartment',
          },
          {
            id: 3,
            title: 'Spacious Land',
            description: 'A spacious piece of land for development.',
            price: 500000,
            image: 'https://via.placeholder.com/400x300',
            bedrooms: 0,
            bathrooms: 0,
            parking: false,
            garage: false,
            pool: false,
            type: 'lands',
            slug: 'spacious-land',
          },
        ]
        this.filteredProperties = this.properties
      } catch (error) {
        console.error('Error fetching data:', error)
        this.message = 'Failed to load data'
      }
    },
    updateFilteredProperties(filteredProperties) {
      this.filteredProperties = filteredProperties
    },
    navigateToProperty(property) {
      const lang = this.$route.params.lang || 'en'
      this.$router.push({
        name: 'propertyDetails',
        params: {
          lang: lang,
          propertyType: property.type,
          slug: property.slug,
        },
      })
    },
  },
}
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>
