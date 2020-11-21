<template>
  <div class="field is-grouped">
    <form id="ack-form" class="control" v-on:submit.prevent>
      <input type="hidden" ref="host_name" :value="host_name">
      <input type="hidden" ref="service" :value="service_name">
      <button class="button" :class="{'is-info': ack, 'is-primary': !ack}" @click="ackService">
          <span class="icon is-small">
            <i class="fas fa-comment"></i>
          </span>
        <span v-if="ack">Un-ack</span><span v-else>Ack</span>
      </button>
    </form>

    <form id="down-form" class="control" v-on:submit.prevent>
      <input type="hidden" ref="host_name" :value="host_name">
      <input type="hidden" ref="service" :value="service_name">
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
</template>

<script>

export default {
  name: 'ItemHistoryToolbar',
  props: ['host_name', 'service_name', 'ack', 'down'],
  methods: {
    ackService: function () {
      const formRefs = this.$refs
      const host_name = formRefs.host_name.value
      const name = formRefs.service.value
      let status_for = 'service'
      if (this.service_name === 'host') {
        status_for = 'host'
      }
      this.$http
          .post(`${this.$apiBaseURL}/status/api/${status_for}/ack`, {
            host_name,
            name
          })
          .then(() => {
            this.$emit('refreshItem');
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
    },
    downService: function () {
      const formRefs = this.$refs
      const host_name = formRefs.host_name.value
      const name = formRefs.service.value
      const info = formRefs.info.value
      const started_at = formRefs.started_at.value
      const expires_at = formRefs.expires_at.value
      let status_for = 'service'
      if (this.service_name === 'host') {
        status_for = 'host'
      }
      this.$http
          .post(`${this.$apiBaseURL}/status/api/${status_for}/down`, {
            host_name,
            name,
            info,
            started_at,
            expires_at
          })
          .then(() => {
            this.$emit('refreshItem');
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
    }
  }
}
</script>
