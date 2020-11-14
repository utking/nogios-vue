<template>
  <div>
    <h3 class="title is-4">Users</h3>

    <table class="table is-fullwidth">
      <thead>
      <tr class="is-selected">
        <th class="id-col">#</th>
        <th>Name</th>
        <th>Channel</th>
        <th>Destination</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ index + 1 }}</td>
        <td>
          <router-link :to="'/contacts/user/' + item.name" class="is-link">{{ item.name }}</router-link>
        </td>
        <td>
          {{ item.channel }}
        </td>
        <td>
          <a class="is-link">{{ item.destination }}</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'UserList',
  data: function () {
    return {
      'items': [],
    }
  },
  mounted() {
    axios
        .get('http://127.0.0.1:8000/contacts/api/users')
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
</style>
