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
            class="w-full p-2 pr-8 bg-gray-200 text-gray-700 border border-gray-300 rounded-lg cursor-pointer flex flex-col items-start justify-between relative"
          >
            <!-- Display filter name on top -->
            <span class="text-sm text-gray-500">{{ filter.name }}</span>

            <!-- Display selected value below the filter name -->
            <div class="w-full flex justify-between items-center">
              <span>{{ filter.selected || 'Select ' + filter.name }}</span>

              <!-- Clear button -->
              <button 
                v-if="filter.selected" 
                @click.stop="clearFilter(filter)" 
                class="ml-2 w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              
              <!-- Dropdown arrow -->
              <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          
          <!-- Custom dropdown for each filter -->
          <div v-if="filter.showList" class="bg-white border border-gray-300 rounded-lg shadow-sm py-4 absolute z-10 mt-2 w-full">
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
                :key="option" 
                @click="selectFilterOption(filter, option)"
                class="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-1 px-4 rounded"
              >
                <span class="text-gray-700">{{ option }}</span>
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
import axios from 'axios';
import { API_ENDPOINTS } from '@/api/endpoints'; // Adjust the path according to your project structure

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
      productTypes: [],
      sizes: [],
      grades: [],
      connections: [],
    };
  },
  mounted() {
    // Call the API to load the filter data with default filters (empty initially)
    this.loadFilterData();
  },
  methods: {
    async loadFilterData() {
      // Extract selected filter values to be sent as query parameters
      const params = {
        productType: this.filters[0].selected || '',  // Assuming 'Product Type' is the first filter
        size: this.filters[1].selected || '',         // Assuming 'Size' is the second filter
        grade: this.filters[2].selected || '',        // Assuming 'Grade' is the third filter
        connection: this.filters[3].selected || ''    // Assuming 'Connection' is the fourth filter
      };

      try {
        const response = await axios.get(API_ENDPOINTS.FILTER_DATA_PIPES, { params });

        const { product_type, size, grade, connection } = response.data.filters;

        this.productTypes = product_type;
        this.sizes = size;
        this.grades = grade;
        this.connections = connection;
      } catch (error) {
        console.error('Error loading filter data:', error);
      }
    },
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
        option.toLowerCase().includes(filter.search.toLowerCase())
      );
    },
    clearFilter(filter) {
      filter.selected = ''; // Clear the selected value
    },
    selectFilterOption(filter, option) {
      filter.selected = option;
      filter.showList = false;
      // Reload filter data when a new option is selected
      this.loadFilterData();
    },
  },
};
</script>

