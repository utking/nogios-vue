<template>
  <div>
    <h3 class="title is-4">Time Periods</h3>

    <table class="table is-fullwidth">
      <thead>
      <tr class="is-selected">
        <th class="id-col">#</th>
        <th>Name</th>
        <th>Alias</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ index + 1 }}</td>
        <td>
          <router-link :to="'/time-periods/view/' + item.name" class="is-link">{{ item.name }}</router-link>
        </td>
        <td>
          <span class="tag is-medium">{{ item.alias }}</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'TimePeriodList',
  data: function () {
    return {
      'items': [],
    }
  },
  mounted() {
    this.$http
        .get(`${this.$apiBaseURL}/time_periods/api`)
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

<style scoped>
table th.id-col {
  width: 3em;
}
table th.name-col {
  min-width: 8em;
  width: 8em;
  max-width: 16em;
}
.tag {
  margin-left: .25em;
}
</style>
