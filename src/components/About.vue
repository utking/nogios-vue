<template>
  <section class="hero is-info is-medium">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          About Nogios
        </h1>
        <p class="subtitle">
          Nogios is an attempt to rewrite Nagios, using Python and VueJS
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',
  props: ['version']
}
</script>
