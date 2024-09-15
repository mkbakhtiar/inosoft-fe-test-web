<template>
    <div class="dropdown-field">
      <select v-model="selectedValue" @change="$emit('change', selectedValue)">
        <option value="">{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DropdownField',
    props: {
      options: {
        type: Array,
        required: true
      },
      placeholder: {
        type: String,
        default: 'Select an option'
      },
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        selectedValue: this.value
      }
    },
    watch: {
      value(newValue) {
        this.selectedValue = newValue
      }
    }
  }
  </script>
  
  <style scoped>
  .dropdown-field select {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: white;
  }
  </style>