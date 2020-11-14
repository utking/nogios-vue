<template>
  <table class="table is-fullwidth">
    <thead>
    <tr class="is-selected">
      <th class="id-col">#</th>
      <th>Name</th>
      <th>IP</th>
      <th>Location</th>
      <th>Contacts</th>
      <th>Tags</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in items" :key="index">
      <td>{{ index + 1 }}</td>
      <td>
        <router-link :to="'/hosts/view/' + item.host_name" class="is-link">
          {{ item.host_name }}
        </router-link>
      </td>
      <td>{{ item.address }}</td>
      <td>
        <router-link :to="'/hosts/location/' + item.location" class="is-link">
          {{ item.location }}
        </router-link>
      </td>
      <td>
        <template v-for="(user, u_index) in item.config.contacts.users">
          <router-link class="tag is-primary" :to="'/contacts/user/' + user" :key="'user' + u_index">
            {{ user }}
          </router-link>
        </template>
        <template v-for="(group, g_index) in item.config.contacts.groups">
          <router-link class="tag is-info" :to="'/contacts/group/' + group" :key="'group' + g_index">
            {{ group }}
          </router-link>
        </template>
      </td>
      <td>
        <template v-if="item.config.tags">
            <span v-for="(tag, t_index) in item.config.tags" :key="t_index" class="tag is-warning" >
              {{ tag }}
            </span>
        </template>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'HostList',
  props: ['items'],
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
