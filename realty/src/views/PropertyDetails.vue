<template>
  <div>
    <h1>Property Details</h1>
    <p>Language: {{ lang }}</p>
    <p>Property Type: {{ propertyType }}</p>
    <p>Property Slug: {{ slug }}</p>
  </div>
</template>

<script>
export default {
  name: 'PropertyDetails',
  props: {
    lang: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
}
</script>
