<template>
  <div>
    <h3 class="title is-4">Time Period details</h3>

    <article class="panel is-primary">
      <p class="panel-heading">
        {{ item.name }}
      </p>

      <div class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-terminal" aria-hidden="true"></i>
            </span>
        Cmd:
        <span class="tag is-medium">{{ item.alias }}
          <span v-if="item.config.arguments">
            {{ item.config.arguments | join(' ') }}
          </span>
        </span>
      </div>

      <p class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
        Config:
      </p>
      <pre>{{ item.config.periods }}</pre>
    </article>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'CommandDetails',
  data: function () {
    return {
      'item': { config: { periods: [] } },
    }
  },
  mounted() {
    axios
        .get('http://127.0.0.1:8000/time_periods/api/view/' + this.$route.params.period)
        .then(response => {
          this.item = response.data.item
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
  }
}
</script>

<style scoped>
.tag {
  margin-left: 1em;
}
</style>
