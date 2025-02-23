<template>
  <div>
    <div>
      <label for="sellerName">Seller Name</label>
      <input
        v-model="sellerName"
        @input="$emit('update:sellerName', sellerName)"
        type="text"
        placeholder="Seller Name"
      />
    </div>
    <div>
      <label for="sellerEmail">Seller Email</label>
      <input
        v-model="sellerEmail"
        @input="$emit('update:sellerEmail', sellerEmail)"
        type="email"
        placeholder="Seller Email"
      />
    </div>
    <div>
      <label for="sellerPhone">Seller Phone</label>
      <input
        v-model="sellerPhone"
        @input="$emit('update:sellerPhone', sellerPhone)"
        type="text"
        placeholder="Seller Phone"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

// Define props for parent component to pass down values
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

// Define emits to explicitly declare custom events
const emit = defineEmits([
  "update:sellerName",
  "update:sellerEmail",
  "update:sellerPhone",
  "update:modelValue", // Added this line to declare update:modelValue event
]);

// Reactive values for form fields
const sellerName = ref(props.modelValue.sellerName);
const sellerEmail = ref(props.modelValue.sellerEmail);
const sellerPhone = ref(props.modelValue.sellerPhone);

// Watch for changes to sync them back to the parent
watch([sellerName, sellerEmail, sellerPhone], () => {
  emit("update:modelValue", {
    sellerName: sellerName.value,
    sellerEmail: sellerEmail.value,
    sellerPhone: sellerPhone.value,
  });
});
</script>

<style scoped>
/* Style for the seller form section */
div {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
}
</style>
