<template>
  <table class="table is-fullwidth is-bordered">
    <thead>
    <tr class="is-selected">
      <th>Host</th>
      <th>Service</th>
      <th>Attempts</th>
      <th class="status-col">Status</th>
      <th>Status information</th>
      <th class="duration-col">Duration</th>
      <th class="datetime-col">Last check</th>
      <th class="action-col">#</th>
    </tr>
    </thead>
    <tbody>
    <template v-for="(services, name) in items">
      <tr v-for="(service, index) in services" :key="name + index">
        <td :rowspan="services.length" v-if="index === 0">
          <router-link :to="'/status/host-services/' + name">{{ name }}</router-link>
        </td>
        <td>
          <router-link :to="'/status/service/' + name + '/' + service.name">{{ service.name }}</router-link>
          <span v-if="service.ack">
                          <span class="panel-icon ack-icon" title="Acknowledged">
                            <i class="fas fa-comment-slash" aria-hidden="true"></i>
                          </span>
            </span>
          <span v-if="service.down">
                          <span class="panel-icon down-icon" title="Maintenance">
                            <i class="fas fa-tools" aria-hidden="true"></i>
                          </span>
            </span>
          <a target="_blank" :href="service.config.help_url" title="Help URL" v-if="service.config.help_url">
                          <span class="panel-icon has-text-info">
                            <i class="fas fa-info-circle" aria-hidden="true"></i>
                          </span>
          </a>
          <a target="_blank" :href="service.config.action_url" title="Action URL" v-if="service.config.action_url">
                          <span class="panel-icon has-text-info">
                            <i class="fas fa-question-circle" aria-hidden="true"></i>
                          </span>
          </a>
          <a target="_blank" :href="service.config.monitoring_url" title="Monitoring URL" v-if="service.config.monitoring_url">
                          <span class="panel-icon has-text-info">
                            <i class="fas fa-poll" aria-hidden="true"></i>
                          </span>
          </a>
        </td>
        <td :class="'col-hard-status-' + service.hard_status">
          <span v-if="service.attempts > 0">{{ service.attempts }}/{{ service.retry_attempts }}</span>
        </td>
        <td :class="'col-status-' + service.current_status">
          {{ service.current_status }}
          <span class="icon is-medium" title="on pause" v-if="service.down || service.ack">
                          <i title="on pause" class="fas fa-pause-circle" aria-hidden="true"></i>
                        </span>
        </td>
        <td>
          <span :title="service.output">{{ service.output }}</span>
        </td>
        <td>
          <template v-if="service.failing_since">
            <timeago :datetime="service.failing_since" :auto-update="60" />
          </template>
        </td>
        <td>{{ service.executed_at }}</td>
        <td>
          <a class="refresh-button" :data-host-name="name"
             @click="check_service(name, service.name)"
             title="Re-check immediately">
            <span>
              <i class="fas fa-sync" aria-hidden="true"></i>
            </span>
          </a>
        </td>
      </tr>
    </template>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'ServiceStatusList',
  props: ['items'],
  methods: {
    check_service: function (host_name, service_name) {
      this.$http
          .post(`${this.$apiBaseURL}/runners/api/run-service-check`, {
            host_name,
            service_name
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

<style scoped >
table th.id-col {
  width: 3em;
}
table th.action-col {
  width: 2em;
}
table tr td.col-status-OK {
  /* background: #7FFF00; */
}
table tr td.col-status-WARNING {
  background: #fc994c;
}
table tr td.col-status-CRITICAL {
  background: #f87a7a;
}
table tr td.col-status-BLOCKER {
  background: #e90d0d;
}
table tr td.col-hard-status-true {
  color: #e90d0d;
  font-weight: bold;
}
table tr td.col-status-PENDING,
table tr td.col-status-UNKNOWN {
  background: #b0abab;
}

.panel-icon {
  margin-right: .25em;
}

table tr th.datetime-col {
  width: 12em;
}
table tr th.status-col {
  width: 10em;
}
</style>
