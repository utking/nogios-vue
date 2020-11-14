<template>
  <div>
    <h3 class="title is-4">Hosts</h3>
    <HostList :items="items" />
  </div>
</template>

<script>

import axios from 'axios'
import HostList from '@/components/entity/host/common/HostList'

export default {
  name: 'HostsList',
  components: {HostList},
  data: function () {
    return {
      'items': [],
    }
  },
  mounted() {
    axios
        .get('http://127.0.0.1:8000/hosts/api')
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
