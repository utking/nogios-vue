<template>
  <div>
    <h3 class="title is-4">Hosts in {{ $route.params.location }}</h3>
    <HostList :items="items"/>
  </div>
</template>

<script>

import HostList from '@/components/entity/host/common/HostList'

export default {
  name: 'HostByLocation',
  components: {HostList},
  data: function () {
    return {
      'items': [],
    }
  },
  mounted() {
    this.$http
        .get(`${this.$apiBaseURL}/hosts/api/location/${this.$route.params.location}`)
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
