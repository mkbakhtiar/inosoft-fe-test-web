<template>
  <div class="dropdown-field">
    <select 
      v-model="selectedValue" 
      @change="$emit('change', selectedValue)"
      class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none"
    >
      <option value="">{{ placeholder }}</option>
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
        class="py-1"
      >
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