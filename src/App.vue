<template>
  <div class="home-page">
    <Header />
    <HeroSection />
    <SearchSection />
    <!-- Add more sections as needed -->
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import HeroSection from '@/components/Hero.vue'
import SearchSection from '@/components/Search.vue'

export default {
  name: 'HomePage',
  components: {
    Header,
    HeroSection,
    SearchSection
  }
}
</script>