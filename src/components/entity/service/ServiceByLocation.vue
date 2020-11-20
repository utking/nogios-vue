<template>
  <div>
    <h3 class="title is-4">Services for {{ $route.params.location }}</h3>
    <ServiceList :items="items" />
  </div>
</template>

<script>

import ServiceList from '@/components/entity/service/common/ServiceList'

export default {
  name: 'ServiceByLocation',
  components: {ServiceList},
  data: function () {
    return {
      'items': [],
    }
  },
  mounted() {
    this.$http
        .get(`${this.$apiBaseURL}/services/api/location/${this.$route.params.location}`)
        .then(response => {
          this.items = response.data.items
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
  }
}
</script>
