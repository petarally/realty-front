<template>
  <div
    class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
    @click="handleClick"
  >
    <a href="#">
      <img
        class="rounded-t-lg w-full h-48 object-cover"
        :src="firstImage"
        alt="Property image"
      />
    </a>
    <div class="px-5 py-3">
      <a href="#">
        <h5
          class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white h-8 overflow-hidden"
        >
          {{ propertyName }}
        </h5>
      </a>
      <div class="flex gap-2 py-3">
        <span
          v-if="amenities.bedrooms !== undefined && amenities.bedrooms !== null"
          class="flex items-center justify-center p-2 rounded text-blue-600"
        >
          <i class="fas fa-bed"></i> {{ amenities.bedrooms }}
        </span>
        <span
          v-if="
            amenities.bathrooms !== undefined && amenities.bathrooms !== null
          "
          class="flex items-center justify-center p-2 rounded text-green-600"
        >
          <i class="fas fa-bath"></i> {{ amenities.bathrooms }}
        </span>
        <span
          v-if="amenities.parking !== undefined && amenities.parking !== null"
          class="flex items-center justify-center p-2 rounded text-yellow-600"
        >
          <i class="fas fa-car"></i>
        </span>
        <span
          v-if="amenities.garage !== undefined && amenities.garage !== null"
          class="flex items-center justify-center p-2 rounded text-red-600"
        >
          <i class="fas fa-warehouse"></i>
        </span>
        <span
          v-if="amenities.pool !== undefined && amenities.pool !== null"
          class="flex items-center justify-center p-2 rounded text-teal-600"
        >
          <i class="fas fa-swimming-pool"></i>
        </span>
      </div>
      <hr class="py-2" />
      <div class="flex items-center justify-end h-8">
        <span class="text-xl font-bold text-gray-900 dark:text-white">
          {{ formatPrice(post.price) }} €
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, defineEmits } from "vue";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const amenities = computed(() => props.post?.amenities || {});
const emits = defineEmits(["card-click"]);

const selectedLanguage = ref(localStorage.getItem("language") || "en");

const propertyName = computed(() => {
  return (
    props.post.propertyName?.[selectedLanguage.value] ||
    props.post.propertyName?.["en"] ||
    "Property Name Not Available"
  );
});

const formatPrice = (value) => {
  return new Intl.NumberFormat(selectedLanguage.value.code).format(value);
};

const firstImage = computed(() => {
  return props.post.images && props.post.images.length > 0
    ? props.post.images[0]
    : "https://via.placeholder.com/400x300";
});

const handleClick = () => {
  emits("card-click", props.post["_id"]);
  console.log("Card clicked", props.post["_id"]);
};
</script>

<style scoped>
img {
  width: 300px;
  height: 200px;
  object-fit: cover;
}
</style>
