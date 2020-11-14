<template>
  <table class="table is-fullwidth">
    <thead>
    <tr class="is-selected">
      <th class="id-col">#</th>
      <th>Name</th>
      <th>Type</th>
      <th>Command</th>
      <th>Location</th>
      <th>Contacts</th>
      <th>Tags</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in items" :key="index">
      <td>{{ index + 1 }}</td>
      <td>
        <router-link :to="'/services/view/' + item.name" class="is-link">{{ item.name }}</router-link>
      </td>
      <td>
        <router-link :to="'/services/type/' + item.type" class="is-link">{{ item.type }}</router-link>
      </td>
      <td>
        <router-link :to="'/commands/view/' + item.command" class="is-link">{{ item.command }}</router-link>
      </td>
      <td>
        <router-link :to="'/services/location/' + item.location" class="is-link">{{ item.location }}</router-link>
      </td>
      <td>
        <router-link class="tag is-primary" :to="'/contacts/user/' + user"
                     v-for="(user, u_index) in item.config.contacts.users" :key="'user' + u_index">
          {{ user }}
        </router-link>

        <router-link class="tag is-info" :to="'/contacts/group/' + group"
                     v-for="(group, g_index) in item.config.contacts.groups" :key="'group' + g_index">
          {{ group }}
        </router-link>

      </td>
      <td>
        <template v-if="item.config.tags">
            <span class="tag is-warning" v-for="(tag, t_index) in item.config.tags" :key="'tag' + t_index">
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
  name: 'ServiceList',
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
