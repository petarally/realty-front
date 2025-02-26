<template>
  <div>
    <div>
      <label for="sellerName">Ime i prezime prodavatelja</label>
      <input
        v-model="sellerName"
        @input="$emit('update:sellerName', sellerName)"
        type="text"
        placeholder="Unesite ime i prezime prodavatelja"
      />
    </div>
    <div>
      <label for="sellerEmail">Email prodavatelja</label>
      <input
        v-model="sellerEmail"
        @input="$emit('update:sellerEmail', sellerEmail)"
        type="email"
        placeholder="Unesite email prodavatelja"
      />
    </div>
    <div>
      <label for="sellerPhone">Broj telefona prodavatelja</label>
      <input
        v-model="sellerPhone"
        @input="$emit('update:sellerPhone', sellerPhone)"
        type="text"
        placeholder="Unesite broj telefona prodavatelja"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  "update:sellerName",
  "update:sellerEmail",
  "update:sellerPhone",
  "update:modelValue",
]);

const sellerName = ref(props.modelValue.sellerName);
const sellerEmail = ref(props.modelValue.sellerEmail);
const sellerPhone = ref(props.modelValue.sellerPhone);

watch([sellerName, sellerEmail, sellerPhone], () => {
  emit("update:modelValue", {
    sellerName: sellerName.value,
    sellerEmail: sellerEmail.value,
    sellerPhone: sellerPhone.value,
  });
});
</script>

<style scoped>
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
