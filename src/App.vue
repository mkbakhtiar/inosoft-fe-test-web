<template>
  <div class="home-page">
    <Header />
    <HeroSection />
    <SearchSection />
    <div class="mb-24">
      <!-- <DataTable :columns="columns" :data="filteredData" /> -->
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

import Header from '@/components/Header.vue'
import HeroSection from '@/components/Hero.vue'
import SearchSection from '@/components/Search.vue'
// import DataTable from '@/components/DataTable.vue'

// import { API_ENDPOINTS } from '@/api/endpoints';

export default {
  name: 'HomePage',
  components: {
    Header,
    HeroSection,
    SearchSection
  },
  data() {
    return {
      columns: [
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
      }
    }
  },
  // methods: {
  //   async fetchData() {
  //     this.loading = true;
  //     this.error = null;
  //     try {
  //       const response = await axios.get(import.meta.env.VUE_APP_API_HOST + API_ENDPOINTS.FILTERED_DATA, {
  //         params: { ...this.filters }
  //       });
  //       this.data = response.data;
  //       console.log(response, 'response');
  //     } catch (error) {
  //       this.error = 'An error occurred while fetching data. Please try again.';
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       this.loading = false;
  //     }
  //   },
  // }
}
</script>