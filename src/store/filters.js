import axios from 'axios';
import { API_ENDPOINTS } from '@/api/endpoints';

export default {
  namespaced: true,
  state: {
    productTypes: [],
    sizes: [],
    grades: [],
    connections: [],
    selectedFilters: {
      productType: '',
      size: '',
      grade: '',
      connection: ''
    }
  },
  mutations: {
    SET_FILTER_DATA(state, { filterType, data }) {
      state[filterType] = data;
    },
    SET_SELECTED_FILTER(state, { filterType, value }) {
      state.selectedFilters[filterType] = value;
    }
  },
  actions: {
    async loadFilterData({ commit, state }) {
      try {
        const response = await axios.get(API_ENDPOINTS.FILTER_DATA_PIPES, {
          params: state.selectedFilters
        });

        const { product_type, size, grade, connection } = response.data.filters;

        // Call mutations
        commit('SET_FILTER_DATA', { filterType: 'productTypes', data: product_type });
        commit('SET_FILTER_DATA', { filterType: 'sizes', data: size });
        commit('SET_FILTER_DATA', { filterType: 'grades', data: grade });
        commit('SET_FILTER_DATA', { filterType: 'connections', data: connection });
      } catch (error) {
        console.error('Error loading filter data:', error);
      }
    },
    updateSelectedFilter({ commit, dispatch }, { filterType, value }) {
      commit('SET_SELECTED_FILTER', { filterType, value });
      
      // Trigger call loadFilterData
      dispatch('loadFilterData');
    }
  },
  getters: {
    getFilterOptions: (state) => (filterType) => {
      return state[filterType];
    }
  }
};