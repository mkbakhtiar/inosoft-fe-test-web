<template>
  <div class="max-w-7xl flex items-center justify-center w-full" style="margin:-80px auto;">
    <div class="w-full shadow-xl mb-20">
      <!-- Main search bar -->
      <div class="relative w-full bg-blue-primary mb-4 w-80">
        <div class="bg-white absolute w-80 rounded-tl-md" style="bottom: 80%;
          border-bottom: 50px solid #FFFFFF;
          border-right: 50px solid #1B273F;"></div>
        <h1 class="text-3xl text-gray-700 w-auto px-6 absolute bottom-1">I'm looking for...</h1>
      </div>

      <div class="flex justify-between bg-white rounded-r-lg px-6 py-6 -mt-4">
        <!-- Filter dropdowns -->
        <div class="w-full mr-4 grid grid-cols-4 gap-4 rounded-r-lg bg-white">
          <div v-for="filter in filters" :key="filter.name" class="relative">
            <div 
              @click="toggleFilterList(filter)"
              class="w-full p-4 pr-5 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-lg cursor-pointer flex flex-col items-start justify-between relative"
            >
              <!-- Display filter name on top -->
              <span class="text-xs text-gray-500 mb-2">{{ filter.name }}</span>

              <!-- Display selected value below the filter name -->
              <div class="w-full flex justify-between items-center">
                <span class="text-orange-500 text-sm font-bold">{{ getSelectedFilter(filter.type) || 'ALL' }}</span>
                <div class="flex items-center gap-x-1">
                  <!-- Clear button -->
                  <button 
                    v-if="getSelectedFilter(filter.type)" 
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
        </div>
        <button @click="findProducts" class="bg-orange-500 hover:bg-orange-600 w-24 text-white font-bold py-2 px-4 rounded-lg flex flex-col block justify-center items-center">
          <font-awesome-icon icon="search" size="xl" />
          Find
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  data() {
    return {
      filters: [
        { name: 'Product Type', type: 'productType', showList: false, search: '' },
        { name: 'Size', type: 'size', showList: false, search: '' },
        { name: 'Grade', type: 'grade', showList: false, search: '' },
        { name: 'Connection', type: 'connection', showList: false, search: '' },
      ],
    };
  },
  computed: {
    ...mapState('filters', ['selectedFilters']),
    ...mapGetters('filters', ['getFilterOptions']),
  },
  created() {
    // Check Store Vuex is working or not
    if (this.loadFilterData) {
      this.loadFilterData();
    } else {
      console.log('loadFilterData is not defined');
    }
  },
  methods: {
    ...mapActions('filters', ['loadFilterData', 'updateSelectedFilter']),
    toggleFilterList(filter) {
      this.filters.forEach(f => {
        if (f !== filter) f.showList = false;
      });
      filter.showList = !filter.showList;
    },
    getFilteredOptions(filter) {
      const options = this.getFilterOptions(filter.type + 's');
      return options.filter(option => 
        option.name.toLowerCase().includes(filter.search.toLowerCase())
      );
    },
    emitFilterChange() {
      this.$emit('filters-changed', this.selectedFilters);
    },
    selectFilterOption(filter, option) {
      this.updateSelectedFilter({ filterType: filter.type, value: option.name });
      filter.showList = false;
      this.emitFilterChange();
    },
    clearFilter(filter) {
      this.updateSelectedFilter({ filterType: filter.type, value: '' });
      filter.showList = false;
      this.emitFilterChange();
    },
    getSelectedFilter(filterType) {
      return this.selectedFilters[filterType] || '';
    },
    findProducts() {
      this.emitFilterChange();
    }
  },
};
</script>