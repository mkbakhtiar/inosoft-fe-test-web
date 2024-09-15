<template>
  <button 
    :class="[
      'px-4 py-2 rounded font-bold cursor-pointer',
      type === 'primary' ? 'bg-orange-500 text-white' : '',
      type === 'secondary' ? 'bg-gray-800 text-white' : '',
      type === 'tertiary' ? 'bg-white text-gray-800 border border-gray-800' : ''
    ]"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'tertiary'].includes(value)
    }
  }
}
</script>
