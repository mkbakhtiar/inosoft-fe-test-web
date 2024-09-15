<template>
  <div class="max-w-7xl flex items-center justify-center w-full" style="margin:-50px auto;">
    <div class="w-full shadow-xl mb-20">
      <!-- Main search bar -->
      <div class="relative w-full bg-blue-primary mb-4 w-80">
        <div class="bg-white absolute w-80 rounded-tl-md" style="bottom: 80%;
          border-bottom: 50px solid #FFFFFF;
          border-right: 50px solid #202d46;"></div>
        <h1 class="text-3xl w-auto px-4 absolute bottom-1">I'm looking for...</h1>
      </div>

      <!-- Filter dropdowns -->
      <div class="grid grid-cols-5 gap-4 py-4 px-4 rounded-r-lg bg-white -mt-4">
        <div v-for="filter in filters" :key="filter.name" class="relative">
          <div 
            @click="toggleFilterList(filter)"
            class="w-full p-2 pr-8 bg-white text-gray-700 border rounded-lg cursor-pointer flex justify-between items-center"
          >
            <span>{{ filter.selected || filter.name }}</span>
            <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
          
          <!-- Custom dropdown for each filter -->
          <div v-if="filter.showList" class="bg-white border rounded-lg shadow-sm py-4 absolute z-10 mt-2 w-full">
            <div class="px-4">
              <h3 class="text-gray-700 mb-2">Select a {{ filter.name }}</h3>
              <div class="relative">
                <input 
                  v-model="filter.search" 
                  type="text" 
                  :placeholder="`Search ${filter.name}`" 
                  class="w-full p-2 border border-gray-300 rounded-lg mb-2"
                >
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
              </div>
            </div>
            <ul class="space-y-2 max-h-60 overflow-y-auto">
              <li 
                v-for="option in getFilteredOptions(filter)" 
                :key="option.name" 
                @click="selectFilterOption(filter, option)"
                class="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-1 px-4 rounded"
              >
                <span class="text-gray-700">{{ option.name }}</span>
                <span v-if="option.count" class="text-orange-500">{{ option.count }}</span>
              </li>
            </ul>
          </div>
        </div>
        <button class="bg-orange-500 text-white font-bold py-2 px-4 rounded">
          <font-awesome-icon icon="search" size="xl" />
          Find
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedProduct: '',
      filters: [
        { name: 'Product Type', selected: '', showList: false, search: '' },
        { name: 'Size', selected: '', showList: false, search: '' },
        { name: 'Grade', selected: '', showList: false, search: '' },
        { name: 'Connection', selected: '', showList: false, search: '' },
      ],
      productTypes: [
        { name: 'Blast Joint', count: 96 },
        { name: 'Casing', count: 253 },
        { name: 'Conductor', count: 220 },
        { name: 'Coupling', count: 106 },
        { name: 'Coupling Stock', count: 142 },
        { name: 'Pup Joint', count: 113 },
      ],
      sizes: [
        { name: '2 3/8"', count: 150 },
        { name: '2 7/8"', count: 200 },
        { name: '3 1/2"', count: 180 },
        { name: '4 1/2"', count: 160 },
        { name: '5 1/2"', count: 140 },
        { name: '7"', count: 120 },
        { name: '9 5/8"', count: 100 },
      ],
      grades: [
        { name: 'J55', count: 250 },
        { name: 'K55', count: 200 },
        { name: 'N80', count: 180 },
        { name: 'L80', count: 160 },
        { name: 'C90', count: 140 },
        { name: 'T95', count: 120 },
        { name: 'P110', count: 100 },
      ],
      connections: [
        { name: 'BTC', count: 200 },
        { name: 'STC', count: 180 },
        { name: 'LTC', count: 160 },
        { name: 'Premium', count: 140 },
        { name: 'Tenaris Blue', count: 120 },
        { name: 'VAM TOP', count: 100 },
        { name: 'FOX', count: 80 },
      ],
    }
  },
  methods: {
    toggleFilterList(filter) {
      this.filters.forEach(f => {
        if (f !== filter) f.showList = false;
      });
      filter.showList = !filter.showList;
    },
    getFilteredOptions(filter) {
      let options;
      switch(filter.name) {
        case 'Product Type':
          options = this.productTypes;
          break;
        case 'Size':
          options = this.sizes;
          break;
        case 'Grade':
          options = this.grades;
          break;
        case 'Connection':
          options = this.connections;
          break;
        default:
          options = [];
      }
      return options.filter(option => 
        option.name.toLowerCase().includes(filter.search.toLowerCase())
      );
    },
    selectFilterOption(filter, option) {
      filter.selected = option.name;
      filter.showList = false;
    },
  }
}
</script>