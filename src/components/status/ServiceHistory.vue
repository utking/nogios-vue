<template>
  <div>
    <h3 class="title is-4">
      <router-link :to="'/status/host-services/' + host">{{ host }}</router-link>::{{ service }} status history
    </h3>

    <div class="field is-grouped">
      <form id="ack-form" class="control" v-on:submit.prevent>
        <input type="hidden" ref="host_name" :value="host">
        <input type="hidden" ref="service" :value="service">
        <button class="button" :class="{'is-info': ack, 'is-primary': !ack}" @click="ackService">
          <span class="icon is-small">
            <i class="fas fa-comment"></i>
          </span>
          <span v-if="ack">Un-ack</span><span v-else>Ack</span>
        </button>
      </form>

      <form id="down-form" class="control" v-on:submit.prevent>
        <input type="hidden" ref="host_name" :value="host">
        <input type="hidden" ref="service" :value="service">
        <div class="field is-grouped">
          <p class="control">
            <button class="button" :class="{'is-info': down, 'is-primary': !down}" @click="downService">
              <span class="icon is-small">
                <i class="fas fa-tools"></i>
              </span>
              <span v-if="down">Un-Maint</span><span v-else>Maint</span>
            </button>
          </p>
          <template v-if="down">
            <p class="control">
              <input type="hidden" ref="started_at">
              <input type="hidden" ref="expires_at">
              <input type="text" disabled="disabled" class="input"
                     :title="(new Date(down.started_at).toLocaleString())
                      + ' to ' + (new Date(down.expires_at).toLocaleString())"
                     :value="(new Date(down.started_at).toLocaleString())
                      + ' to ' + (new Date(down.expires_at).toLocaleString())">
            </p>
            <p class="control">
              <input type="text" disabled="disabled" class="input" :value="down.info" ref="info">
            </p>
          </template>
          <template v-else>
            <p class="control">
              <input title="From" type="datetime-local" class="input" :value="down.started_at" ref="started_at">
            </p>
            <p class="control">
              <input title="To" type="datetime-local" class="input" :value="down.expires_at" ref="expires_at">
            </p>
            <p class="control">
              <input type="text" class="input" :value="down.info" ref="info" placeholder="Comment">
            </p>
          </template>
        </div>
      </form>

  </div>

    <ServicesStatusHistory :items="items" />
  </div>
</template>

<script>
import axios from 'axios'
import ServicesStatusHistory from '@/components/status/common/ServicesStatusHistory'

export default {
  name: 'ServicesStatus',
  components: {ServicesStatusHistory},
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
    ackService: function () {
      const formRefs = this.$refs
      const host_name = formRefs.host_name.value
      const name = formRefs.service.value
      axios
          .post('http://127.0.0.1:8000/status/api/service/ack', {
            host_name,
            name
          })
          .then(response => {
            this.ack = response.data.ack
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
    },
    downService: function () {
      const formRefs = this.$refs
      console.log(formRefs, formRefs.host_name, formRefs.service, formRefs.info, formRefs.started_at, formRefs.expires_at)
      const host_name = formRefs.host_name.value
      const name = formRefs.service.value
      const info = formRefs.info.value
      const started_at = formRefs.started_at.value
      const expires_at = formRefs.expires_at.value
      axios
          .post('http://127.0.0.1:8000/status/api/service/down', {
            host_name,
            name,
            info,
            started_at,
            expires_at
          })
          .then(response => {
            this.down = response.data.down
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
    },
    loadData: function () {
      axios
          .get('http://127.0.0.1:8000/status/api/service/' + this.$route.params.host +
              '/' + this.$route.params.service)
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
