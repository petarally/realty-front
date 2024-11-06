<template>
  <header class="bg-gray-800 text-white">
    <div class="container mx-auto p-4 flex justify-between items-center">
      <div class="text-lg font-bold">
        <RouterLink to="/" class="hover:underline">Realty</RouterLink>
      </div>
      <nav class="flex space-x-4">
        <RouterLink to="/en" class="hover:underline">EN</RouterLink>
        <RouterLink to="/hr" class="hover:underline">HR</RouterLink>
        <RouterLink to="/de" class="hover:underline">DE</RouterLink>
        <RouterLink to="/it" class="hover:underline">IT</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>
