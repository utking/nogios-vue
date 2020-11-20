<template>
  <div>
    <h3 class="title is-4">Host status
      <span v-if="$route.params.host">for {{ $route.params.host }} (<router-link to="/status/hosts">all hosts</router-link>)</span>
    </h3>

    <table class="table is-fullwidth is-bordered">
      <thead>
      <tr class="is-selected">
        <th>Host</th>
        <th>Attempts</th>
        <th class="status-col">Status</th>
        <th>Output</th>
        <th class="datetime-col">Check Date/Time</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>
          <router-link :to="'/status/host/' + item.host_name">{{ item.host_name }}</router-link>
          <span v-if="item.ack">
                          <span class="panel-icon ack-icon" title="Acknowledged">
                            <i class="fas fa-comment-slash" aria-hidden="true"></i>
                          </span>
          </span>
          <span v-if="item.down">
                          <span class="panel-icon down-icon" title="Maintenance">
                            <i class="fas fa-tools" aria-hidden="true"></i>
                          </span>
          </span>
          <a target="_blank" :href="item.config.help_url" title="Help URL" v-if="item.config.help_url">
                          <span class="panel-icon has-text-info">
                            <i class="fas fa-info-circle" aria-hidden="true"></i>
                          </span>
          </a>
          <a target="_blank" :href="item.config.action_url" title="Action URL" v-if="item.config.action_url">
                          <span class="panel-icon has-text-info">
                            <i class="fas fa-question-circle" aria-hidden="true"></i>
                          </span>
          </a>
          <a target="_blank" :href="item.config.monitoring_url" title="Monitoring URL" v-if="item.config.monitoring_url">
                          <span class="panel-icon has-text-info">
                            <i class="fas fa-poll" aria-hidden="true"></i>
                          </span>
          </a>
        </td>
        <td :class="'col-hard-status-' + item.hard_status">
        <span v-if="item.attempts > 0">
          {{ item.attempts }}/{{ item.retry_attempts }}
        </span>
        </td>
        <td :class="'col-status-' + item.current_status">
          {{ item.current_status }}
          <span class="icon is-medium" title="on pause" v-if="item.down || item.ack">
                          <i title="on pause" class="fas fa-pause-circle" aria-hidden="true"></i>
                        </span>
        </td>
        <td>
          <span :title="item.output">{{ item.output }}</span>
        </td>
        <td>{{ item.executed_at }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'HostsStatus',
  data: function () {
    return {
      'items': [],
    }
  },
  methods: {
    loadData: function () {
      this.$http
          .get(`${this.$apiBaseURL}/status/api/hosts`)
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
