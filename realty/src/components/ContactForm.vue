<template>
  <div class="max-w-lg mx-auto bg-white p-8 shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-6">Contact Us</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="name" class="block text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          class="mt-1 p-2 w-full border border-gray-300 rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          class="mt-1 p-2 w-full border border-gray-300 rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label for="message" class="block text-gray-700">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          class="mt-1 p-2 w-full border border-gray-300 rounded"
          rows="4"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ContactForm',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
    }
  },
  methods: {
    submitForm() {
      // Handle form submission logic here
      console.log('Form submitted:', this.form)
      // Reset form fields
      this.form.name = ''
      this.form.email = ''
      this.form.message = ''
    },
  },
}
</script>
