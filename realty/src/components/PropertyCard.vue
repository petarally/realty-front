<template>
  <div
    class="max-w-sm bg-white shadow-md overflow-hidden cursor-pointer transition-transform transform hover:-translate-y-1"
    @click="showDetails"
  >
    <img
      :src="property.image ? property.image : '/path/to/placeholder.png'"
      alt="Property Image"
      class="w-full h-52 object-cover"
    />
    <div class="p-4 min-h-72 max-h-72 flex flex-col justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-800 mb-2">
          {{ property.title }}
        </h2>
        <p class="text-sm text-gray-600 mb-4">
          {{ truncatedDescription }}
        </p>
      </div>
      <div class="flex gap-2 mb-4">
        <span
          v-if="property.bedrooms"
          class="flex items-center justify-center bg-gray-100 p-2 rounded text-gray-600"
        >
          <font-awesome-icon icon="bed" /> {{ property.bedrooms }}
        </span>
        <span
          v-if="property.bathrooms"
          class="flex items-center justify-center bg-gray-100 p-2 rounded text-gray-600"
        >
          <font-awesome-icon icon="bath" /> {{ property.bathrooms }}
        </span>
        <span
          v-if="property.parking"
          class="flex items-center justify-center bg-gray-100 p-2 rounded text-gray-600"
        >
          <font-awesome-icon icon="car" />
        </span>
        <span
          v-if="property.garage"
          class="flex items-center justify-center bg-gray-100 p-2 rounded text-gray-600"
        >
          <font-awesome-icon icon="warehouse" />
        </span>
        <span
          v-if="property.pool"
          class="flex items-center justify-center bg-gray-100 p-2 rounded text-gray-600"
        >
          <font-awesome-icon icon="swimming-pool" />
        </span>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-xl font-bold text-gray-900">{{ formattedPrice }} €</p>
        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
          Details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    property: {
      type: Object,
      required: true,
    },
    currentLang: {
      type: String,
      required: true,
    },
  },
  computed: {
    formattedPrice() {
      return new Intl.NumberFormat().format(this.property.price)
    },
    truncatedDescription() {
      const fullDescription = this.property.description || ''
      const maxLength = 100
      return fullDescription.length > maxLength
        ? fullDescription.substring(0, maxLength) + '...'
        : fullDescription
    },
  },
  methods: {
    showDetails() {
      this.$router.push({
        name: 'propertyDetails',
        params: {
          lang: this.currentLang,
          propertyType: this.property.type,
          slug: this.property.slug,
        },
      })
    },
  },
}
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>
