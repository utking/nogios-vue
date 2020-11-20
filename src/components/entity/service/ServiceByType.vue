<template>
  <div>
    <h3 class="title is-4">Services of {{ $route.params.type }} type</h3>
    <ServiceList :items="items" />
  </div>
</template>

<script>

import ServiceList from '@/components/entity/service/common/ServiceList'

export default {
  name: 'ServiceByType',
  components: {ServiceList},
  data: function () {
    return {
      'items': [],
    }
  },
  mounted() {
    this.$http
        .get(`${this.$apiBaseURL}/services/api/type/${this.$route.params.type}`)
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
