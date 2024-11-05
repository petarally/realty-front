<template>
  <div>
    <h1>Home Page</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { fetchHome } from '@/services/api.js'
import { useRoute, useRouter } from 'vue-router'

export default {
  data() {
    return {
      message: '',
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
      const route = useRoute()
      const lang = route.params.lang || 'en'
      console.log('Attempting to fetch data from backend...')
      try {
        const response = await fetchHome(lang)
        console.log('Data fetched successfully:', response)
        this.message = response
      } catch (error) {
        console.error('Error fetching data:', error)
        this.message = 'Failed to load data'
      }
    },
  },
}
</script>

<style scoped>
/* Add any styles you need */
</style>
