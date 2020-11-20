<template>
  <div>
    <h3 class="title is-4">Host history
      <span v-if="host_name">for {{ host_name }} (<router-link to="/status/hosts">all hosts</router-link>)</span>
    </h3>

    <ItemHistoryToolbar :host_name="host_name" service_name="host" :ack="ack" :down="down"/>

    <ServicesStatusHistory :items="items" hide_ret_code="true"/>
  </div>
</template>

<script>

import ServicesStatusHistory from '@/components/status/common/ServicesStatusHistory'
import ItemHistoryToolbar from '@/components/status/common/ItemHistoryToolbar'

export default {
  name: 'HostHistory',
  components: { ItemHistoryToolbar, ServicesStatusHistory },
  data: function () {
    return {
      'items': [],
      'host_name': '',
      'ack': false,
      'down': false,
    }
  },
  methods: {
    loadData: function () {
      this.$http
          .get(`${this.$apiBaseURL}/status/api/host/${this.$route.params.host}`)
          .then(response => {
            this.items = response.data.items;
            this.host_name = response.data.host_name;
            this.ack = response.data.ack;
            this.down = response.data.down;
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
    this.host_name = this.$route.params.host;
    this.ack = false;
    this.down = false;

    this.loadData();

    this.timer = setInterval(function () {
      this.loadData();
    }.bind(this), 60000);
  }
}
</script>

<style scoped>
table th.id-col {
  width: 3em;
}
table tr td.col-status-UP {
  /* background: #7FFF00; */
}
table tr td.col-status-DOWN {
  background: #f87a7a;
}
table tr td.col-hard-status-true {
  color: #e90d0d;
  font-weight: bold;
}
table tr td.col-status-PENDING,
table tr td.col-status-UNKNOWN {
  background: #b0abab;
}
table tr th.datetime-col {
  width: 12em;
}
table tr th.status-col {
  width: 10em;
}
.panel-icon {
  margin-right: 3px;
}
</style>
