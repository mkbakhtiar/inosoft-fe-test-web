<template>
    <section class="search-section">
      <div class="search-container">
        <DropdownField
          :options="mainOptions"
          placeholder="I'm looking for..."
          v-model="selectedMainOption"
        />
        <div class="filter-dropdowns">
          <DropdownField
            v-for="filter in filters"
            :key="filter.name"
            :options="filter.options"
            :placeholder="filter.placeholder"
            v-model="selectedFilters[filter.name]"
          />
        </div>
        <Button type="primary" @click="handleSearch">Find</Button>
      </div>
    </section>
  </template>
  
  <script>
  import DropdownField from './DropdownField.vue'
  import Button from './Button.vue'
  
  export default {
    name: 'SearchSection',
    components: {
      DropdownField,
      Button
    },
    data() {
      return {
        selectedMainOption: '',
        selectedFilters: {
          productType: '',
          size: '',
          grade: '',
          connection: ''
        },
        mainOptions: [
          { value: 'oilCountry', label: 'Oil Country Tubular Goods' },
          // Add more options as needed
        ],
        filters: [
          { name: 'productType', placeholder: 'Product Type', options: [{ value: 'all', label: 'ALL' }] },
          { name: 'size', placeholder: 'Size', options: [{ value: 'all', label: 'ALL' }] },
          { name: 'grade', placeholder: 'Grade', options: [{ value: 'all', label: 'ALL' }] },
          { name: 'connection', placeholder: 'Connection', options: [{ value: 'all', label: 'ALL' }] }
        ]
      }
    },
    methods: {
      handleSearch() {
        // Implement search functionality
        console.log('Searching with:', this.selectedMainOption, this.selectedFilters)
      }
    }
  }
  </script>
  
  <style scoped>
  .search-section {
    background-color: #f5f5f5;
    padding: 20px;
  }
  .search-container {
    display: flex;
    gap: 10px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .filter-dropdowns {
    display: flex;
    gap: 10px;
    flex-grow: 1;
  }
  </style>