<template>
  <div>
    <h3 class="title is-4">
      <router-link :to="'/status/host-services/' + host">{{ host }}</router-link>::{{ service }} status history
    </h3>

    <ItemHistoryToolbar :host_name="host" :service_name="service"
                        :ack="ack" :down="down"  @refreshItem="loadData()" />

    <ServicesStatusHistory :items="items" />
  </div>
</template>

<script>
import ServicesStatusHistory from '@/components/status/common/ServicesStatusHistory'
import ItemHistoryToolbar from '@/components/status/common/ItemHistoryToolbar'

export default {
  name: 'ServicesStatus',
  components: { ItemHistoryToolbar, ServicesStatusHistory },
  data: function () {
    return {
      'items': [],
      'ack': false,
      'down': {},
      'host': '',
      'service': '',
    }
  },
  methods: {
    loadData: function () {
      this.$http
          .get(`${this.$apiBaseURL}/status/api/service/${this.$route.params.host}/${this.$route.params.service}`)
          .then(response => {
            this.items = response.data.items
            this.ack = response.data.ack
            this.down = response.data.down
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
    this.host = this.$route.params.host;
    this.service = this.$route.params.service;
    this.loadData();
    this.timer = setInterval(function () {
      this.loadData();
    }.bind(this), 60000);
  }
}
</script>
