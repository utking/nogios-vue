<template>
  <div>
    <h3 class="title is-4">Host details</h3>

    <article class="panel is-primary">
      <p class="panel-heading">
        {{ item.host_name }}
      </p>

      <a class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
        IP: {{ item.address }}
      </a>

      <p class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-location-arrow" aria-hidden="true"></i>
            </span>
        Location:
        <router-link class="is-link tag" :to="'/hosts/location/' + item.location">
          {{ item.location }}
        </router-link>
      </p>

      <p class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-tags" aria-hidden="true"></i>
            </span>
        Tags:
        <template v-if="item.config.tags">
          <span v-for="(tag, t_index) in item.config.tags" :key="'tag' + t_index" class="tag is-warning">
            {{ tag }}
          </span>
        </template>
      </p>

      <p class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-users" aria-hidden="true"></i>
            </span>
        Contacts:
        <router-link class="is-primary tag" :to="'/contacts/user/' + user"
                     v-for="(user, u_index) in item.config.contacts.users" :key="'user' + u_index">
          {{ user }}
        </router-link>

        <router-link class="is-info tag" :to="'/contacts/group/' + group"
                     v-for="(group, g_index) in item.config.contacts.groups" :key="'group' + g_index">
          {{ group }}
        </router-link>
      </p>

      <p class="panel-block" v-if="item.config.help_url">
                <span class="panel-icon has-text-info">
                  <i class="fas fa-info-circle" aria-hidden="true"></i>
                </span>
        Help: <a class="tag" target="_blank"
                 :href="item.config.help_url">{{ item.config.help_url }}</a>
      </p>

      <p class="panel-block" v-if="item.config.action_url">
                <span class="panel-icon has-text-info">
                  <i class="fas fa-question-circle" aria-hidden="true"></i>
                </span>
        Action: <a class="tag" target="_blank"
                   :href="item.config.action_url">{{ item.config.action_url }}</a>
      </p>

      <p class="panel-block" v-if="item.config.monitoring_url">
                <span class="panel-icon has-text-info">
                  <i class="fas fa-poll" aria-hidden="true"></i>
                </span>
        Monitoring: <a class="tag" target="_blank"
                       :href="item.config.monitoring_url">{{ item.config.monitoring_url }}</a>
      </p>
    </article>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'CommandDetails',
  data: function () {
    return {
      'item': {
        config: {
          contacts: {}
        }
      },
    }
  },
  mounted() {
    axios
        .get('http://127.0.0.1:8000/hosts/api/view/' + this.$route.params.host)
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
