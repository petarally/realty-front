<template>
  <div>
    <!-- Property Gallery -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      <!-- Main Image -->
      <div class="lg:col-span-2" v-if="images.length > 0">
        <img
          :src="images[0]"
          alt="Main Image"
          @click="showImg(0)"
          class="w-full h-[24.5rem] object-cover cursor-pointer rounded-lg"
        />
      </div>

      <!-- Thumbnails -->
      <div class="grid grid-cols-2 gap-2">
        <img
          v-for="(img, idx) in images.slice(1)"
          :src="img"
          :key="idx"
          alt="Thumbnail"
          @click="showImg(idx + 1)"
          class="w-full h-48 object-cover cursor-pointer rounded-lg"
        />
      </div>

      <!-- VueEasyLightbox Component -->
      <VueEasyLightbox
        :visible="visibleRef"
        :imgs="images"
        :index="indexRef"
        @hide="onHide"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
import { defineProps } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const visibleRef = ref(false);
const indexRef = ref(0);

const showImg = (index) => {
  indexRef.value = index;
  visibleRef.value = true;
};

const onHide = () => {
  visibleRef.value = false;
};
</script>
