<template>
  <div>
    <h3 class="title is-4">Hosts for {{ $route.params.service }}</h3>
    <HostList :items="items" />
  </div>
</template>

<script>

import HostList from '@/components/entity/host/common/HostList'

export default {
  name: 'ServiceHosts',
  components: {HostList},
  data: function () {
    return {
      'items': [],
    }
  },
  mounted() {
    this.$http
        .get(`${this.$apiBaseURL}/services/api/hosts/${this.$route.params.service}`)
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
