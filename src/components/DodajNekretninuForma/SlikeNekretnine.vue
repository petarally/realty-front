<template>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Dodajte fotografije (Drag & Drop ili Click)
    </label>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <!-- Main Image -->
      <div class="col-span-2 row-span-2 relative">
        <div
          @drop="handleDrop($event, 0)"
          @dragover="handleDragOver"
          class="image-dropzone border-2 border-dashed border-gray-300 p-2 flex items-center justify-center cursor-pointer"
          style="height: 100%"
        >
          <img
            v-if="imagePreviews[0]"
            :src="imagePreviews[0]"
            alt="Main Image Preview"
            class="w-full h-full object-cover"
          />
          <input
            type="file"
            class="absolute inset-0 opacity-0 cursor-pointer"
            @change="(event) => previewImage(event, 0)"
          />
          <p v-if="!imagePreviews[0]" class="text-gray-500">Glavna slika</p>
        </div>
      </div>
      <!-- Other Images -->
      <div
        v-for="(preview, index) in imagePreviews.slice(1, 5)"
        :key="index"
        class="relative"
      >
        <div
          @drop="handleDrop($event, index + 1)"
          @dragover="handleDragOver"
          class="image-dropzone border-2 border-dashed border-gray-300 p-2 flex items-center justify-center cursor-pointer"
        >
          <img
            v-if="preview"
            :src="preview"
            alt="Image Preview"
            class="w-full h-full object-cover"
          />
          <input
            type="file"
            class="absolute inset-0 opacity-0 cursor-pointer"
            @change="(event) => previewImage(event, index + 1)"
          />
          <p v-if="!preview" class="text-gray-500">Foto {{ index + 2 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Define props
const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  imagePreviews: {
    type: Array,
    required: true,
  },
});

// Define emit events
const emit = defineEmits([
  "update:images",
  "update:imagePreviews",
  "previewImage",
  "handleDrop",
  "handleDragOver",
]);

const { modelValue, imagePreviews } = props;

// Convert image to WebP format and resize it
const convertImageToWebP = async (file, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      // Adjust the quality setting for better clarity
      const dataUrl = canvas.toDataURL("image/webp", 0.9); // Adjusted quality to 0.9
      resolve(dataUrlToBlob(dataUrl));
    };

    img.onerror = (err) => reject(err);
    img.src = URL.createObjectURL(file);
  });
};

// Utility function to convert data URL to Blob
const dataUrlToBlob = (dataUrl) => {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};

const previewImage = async (event, index) => {
  const file = event.target.files?.[0];
  if (file) {
    try {
      const webpImage = await convertImageToWebP(file, 800, 800);

      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviews[index] = e.target?.result;
        emit("update:imagePreviews", [...imagePreviews]);
      };
      reader.readAsDataURL(webpImage);
      modelValue[index] = webpImage;
      emit("update:images", [...modelValue]);
    } catch (error) {
      console.error("Error processing image: ", error);
    }
  }
};

const handleDrop = async (event, index) => {
  event.preventDefault();
  const file = event.dataTransfer?.files[0];
  if (file) {
    try {
      const webpImage = await convertImageToWebP(file, 800, 800);

      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviews[index] = e.target?.result;
        emit("update:imagePreviews", [...imagePreviews]);
      };
      reader.readAsDataURL(webpImage);
      modelValue[index] = webpImage;
      emit("update:images", [...modelValue]);
    } catch (error) {
      console.error("Error processing image: ", error);
    }
  }
};

const handleDragOver = (event) => {
  event.preventDefault();
};
</script>
