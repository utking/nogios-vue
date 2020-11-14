<template>
  <div id="app">
    <Navbar/>
    <section class="section">
      <div class="container">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
  }
}
</script>
