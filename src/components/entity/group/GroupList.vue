<template>
  <div>
    <h3 class="title is-4">Groups</h3>

    <table class="table is-fullwidth">
      <thead>
      <tr class="is-selected">
        <th class="id-col">#</th>
        <th class="name-col">Name</th>
        <th>Members</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ index + 1 }}</td>
        <td>
          <router-link :to="'/contacts/group/' + item.name" class="is-link">{{ item.name }}</router-link>
        </td>
        <td>
          <template v-for="(member, m_index) in item.config.members">
            <router-link class="is-link tag" :to="'/contacts/user/' + member" :key="m_index">
              {{ member }}
            </router-link>
          </template>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'GroupList',
  data: function () {
    return {
      'items': [],
    }
  },
  mounted() {
    axios
        .get('http://127.0.0.1:8000/contacts/api/groups')
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
