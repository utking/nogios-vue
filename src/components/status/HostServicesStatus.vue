<template>
  <div>
    <h3 class="title is-4">Host service status
      <span v-if="$route.params.host">for {{ $route.params.host }} (<router-link to="/status/services">all hosts</router-link>)</span>
    </h3>

    <ServiceStatusList :items="items" />
  </div>
</template>

<script>

import ServiceStatusList from '@/components/status/common/ServiceStatusList'

export default {
  name: 'HostServicesStatus',
  components: {ServiceStatusList},
  data: function () {
    return {
      'items': [],
    }
  },
  methods: {
    loadData: function () {
      this.$http
          .get(`${this.$apiBaseURL}/status/api/host-services/${this.$route.params.host}`)
          .then(response => {
            this.items = response.data.items
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
    }
  },
  beforeDestroy: function() {
    clearInterval(this.timer);
  },
  mounted() {
    this.items = [];
    this.loadData();
    this.timer = setInterval(function () {
      this.loadData();
    }.bind(this), 60000);
  }
}
</script>
