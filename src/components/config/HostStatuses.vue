<template>
  <div>
    <h3 class="title is-4">Host statuses</h3>
    <StatusList :items="items" />
  </div>
</template>

<script>

import StatusList from '@/components/config/common/StatuseList'

export default {
  name: 'HostStatuses',
  components: {StatusList},
  data: function () {
    return {
      'items': [],
    }
  },
  mounted() {
    this.$http
        .get(`${this.$apiBaseURL}/hosts/api/statuses`)
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
