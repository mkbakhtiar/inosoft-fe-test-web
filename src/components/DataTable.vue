<template>
    <div class="vue-datatable max-w-7xl flex flex-col items-center justify-center w-full">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th 
                v-for="column in columns" 
                :key="column.key"
                @click="sort(column.key)"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div class="flex items-center">
                  {{ column.label }}
                  <span v-if="sortKey === column.key" class="ml-1">
                    <svg v-if="sortOrder === 'asc'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in paginatedData" :key="item.id" class="hover:bg-gray-50">
              <td 
                v-for="column in columns" 
                :key="column.key"
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                {{ item[column.key] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="mt-4 flex justify-between items-center">
        <div class="flex items-center">
          <span class="mr-2 text-sm text-gray-700">Rows per page:</span>
          <select v-model="perPage" @change="updatePagination" class="border-gray-300 rounded-md text-gray-700 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option v-for="option in perPageOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="flex items-center">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          >
            Previous
          </button>
          <span class="px-4 text-sm text-gray-700">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="ml-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VueDataTable',
    props: {
      columns: {
        type: Array,
        required: true
      },
      data: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        sortKey: '',
        sortOrder: 'asc',
        currentPage: 1,
        perPage: 10,
        perPageOptions: [5, 10, 20, 50, 100]
      }
    },
    computed: {
      sortedData() {
        const data = [...this.data]
        if (this.sortKey) {
          data.sort((a, b) => {
            let valueA = a[this.sortKey]
            let valueB = b[this.sortKey]
            
            if (typeof valueA === 'string') valueA = valueA.toLowerCase()
            if (typeof valueB === 'string') valueB = valueB.toLowerCase()
            
            if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1
            if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1
            return 0
          })
        }
        return data
      },
      paginatedData() {
        const start = (this.currentPage - 1) * this.perPage
        const end = start + this.perPage
        return this.sortedData.slice(start, end)
      },
      totalPages() {
        return Math.ceil(this.data.length / this.perPage)
      }
    },
    methods: {
      sort(key) {
        if (this.sortKey === key) {
          this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
        } else {
          this.sortKey = key
          this.sortOrder = 'asc'
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--
        }
      },
      updatePagination() {
        this.currentPage = 1
      }
    }
  }
  </script>