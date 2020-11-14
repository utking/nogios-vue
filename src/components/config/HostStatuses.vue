<template>
  <div>
    <h3 class="title is-4">Host statuses</h3>
    <StatusList :items="items" />
  </div>
</template>

<script>

import axios from 'axios'
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
    axios
        .get('http://127.0.0.1:8000/hosts/api/statuses')
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
