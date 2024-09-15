<template>
  <header class="shadow-md">
    <div class="flex justify-between bg-neutral-200 py-1 px-6">
      <div class="flex items-center">
        <a href="#" class="text-gray-600 hover:text-gray-800 text-sm font-bold py-2">
          <font-awesome-icon icon="key" class="text-orange-500" /> Login
        </a>
      </div>
      <div class="flex items-center space-x-12">
        <a href="#" class="text-gray-600 hover:text-gray-800 text-xs font-bold gap-x-3 items-center flex py-2">
          <font-awesome-icon :icon="['far', 'heart']" size="lg" /> Wishlist
        </a>
        <a href="#" class="text-gray-600 hover:text-gray-800 text-xs font-bold gap-x-3 items-center flex py-2">
          <font-awesome-icon :icon="['fas', 'scale-balanced']" size="lg" /> Compare
        </a>
        <a href="#" class="text-gray-600 hover:text-gray-800 text-xs font-bold gap-x-3 items-center flex py-2">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" size="lg" /> My Cart
        </a>
      </div>
    </div>
    <div class="w-full flex items-center justify-between px-4 py-2">
      <div class="flex-1 items-center">
        <img src="@/assets/logo.svg" alt="PipeSales Logo" class="w-100">
      </div>
      <div class="flex justify-end items-center space-x-4">
        <nav class="hidden md:flex space-x-4">
          <a href="#" class="text-gray-600 hover:text-gray-800 border rounded-md text-sm px-4 py-2 hover:bg-gray-100">About Pipesales</a>
          <div class="relative group flex items-center">
            <a href="#" class="flex gap-x-1 items-center text-gray-600 hover:text-gray-800 border rounded-md  text-sm px-4 py-2 hover:bg-gray-100">
              OCTG Marketplace
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#FF6600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </a>
            <div class="absolute hidden group-hover:block top-1 pt-10 w-44">
              <div class="bg-white flex flex-col shadow-md rounded-md border-t">
                <a href="#" class="px-4 py-3 font-medium text-center border-b text-sm text-orange-500 hover:text-gray-500 hover:bg-gray-100">OCTG Tubing</a>
                <a href="#" class="px-4 py-3 font-medium text-center border-b text-sm text-orange-500 hover:text-gray-500 hover:bg-gray-100">OCTG Casing</a>
                <a href="#" class="px-4 py-3 font-medium text-center border-b text-sm text-orange-500 hover:text-gray-500 hover:bg-gray-100">OCTG Couplings</a>
                <a href="#" class="px-4 py-3 font-medium text-center border-b text-sm text-orange-500 hover:text-gray-500 hover:bg-gray-100">Pup Joints</a>
                <a href="#" class="px-4 py-3 font-medium text-center text-sm text-orange-500 hover:text-gray-500 hover:bg-gray-100">Conductor Casing & Conductor Pipe</a>
              </div>
            </div>
          </div>
          <a href="#" class="text-gray-600 hover:text-gray-800 border rounded-md text-sm px-4 py-2 hover:bg-gray-100">Blog</a>
        </nav>
        <div class="flex items-center space-x-2">
          <button class="bg-blue-primary text-white px-4 py-2 text-sm rounded-md hover:bg-gray-700">Search Pipesales</button>
          <button class="bg-blue-primary text-white px-4 py-2 text-sm rounded-md hover:bg-gray-700">Sell My Pipes</button>
          <button class="bg-orange-500 text-white px-4 py-2 text-sm rounded-md hover:bg-orange-600">Enquire Now</button>
        </div>
      </div>
      
      
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>