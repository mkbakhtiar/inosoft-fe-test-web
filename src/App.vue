<template>
  <div class="home-page">
    <Header />
    <HeroSection />
    <SearchSection />
    <div class="my-16">
      <DataTable :columns="columns" :data="allData" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Header from '@/components/Header.vue'
import HeroSection from '@/components/Hero.vue'
import SearchSection from '@/components/Search.vue'
import DataTable from '@/components/DataTable.vue'

import { API_ENDPOINTS } from '@/api/endpoints';

export default {
  name: 'HomePage',
  components: {
    Header,
    HeroSection,
    SearchSection,
    DataTable
  },
  data() {
    return {
      columns: [
        { key: 'id', label: 'ID' },
        { key: 'code', label: 'Code' },
        { key: 'qty', label: 'Qty' },
        { key: 'item_code', label: 'Item Code' },
        { key: 'country_name', label: 'Country' },
        { key: 'product_type', label: 'Product Type' },
        { key: 'size', label: 'Size' },
        { key: 'grade', label: 'Grade' },
        { key: 'connection', label: 'Connection' },
      ],
      filters: {
        product_type: '',
        size: '',
        grade: '',
        connection: ''
      },
      allData: []
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(API_ENDPOINTS.SEARCH_DATA_PIPES, {
          params: { ...this.filters }
        });
        
        this.allData = response.data;
      } catch (error) {
        this.error = 'An error occurred while fetching data. Please try again.';
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
  }
}
</script>