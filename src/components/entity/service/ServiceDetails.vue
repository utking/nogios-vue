<template>
  <div>
    <h3 class="title is-4">Service details</h3>

    <article class="panel is-primary">
      <p class="panel-heading">
        {{ item.name }}
      </p>

      <p class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
        Type: <router-link class="is-link tag" :to="'/services/type/' + item.type">{{ item.type }}</router-link>
      </p>

      <p class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
        Check command:
        <span class="tag is-medium">
          {{ item.command }} <span v-if="item.command_arguments">{{ item.command_arguments.join(' ') }}</span>
        </span>
      </p>

      <p class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
        Hosts:
        <router-link class="is-link tag" v-if="item.hosts !== ''"
           :to="'/services/hosts/' + item.name">{{ item.hosts }}
        </router-link>
      </p>

      <p class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
        Exclude hosts:
        <router-link class="is-link tag" v-if="item.excluded_hosts !== ''"
           :to="'/services/hosts/' + item.name">{{ item.excluded_hosts }}
        </router-link>
      </p>

      <p class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-location-arrow" aria-hidden="true"></i>
            </span>
        Location:
        <router-link class="is-link tag" :to="'/services/location/'+ item.location">
          {{ item.location }}
        </router-link>
      </p>

      <p class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-tags" aria-hidden="true"></i>
            </span>
        Tags:
        <template v-if="item.config.tags">
          <span class="tag is-warning" v-for="(tag, t_index) in item.config.tags" :key="'tag' + t_index">
            {{ tag }}
          </span>
        </template>
      </p>

      <p class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-users" aria-hidden="true"></i>
            </span>
        Contacts:
        <router-link class="is-primary tag" v-for="(user, u_index) in item.config.contacts.users"
                     :key="'user' + u_index" :to="'/contacts/user/' + user">
          {{ user }}
        </router-link>

        <router-link class="is-info tag" v-for="(group, g_index) in item.config.contacts.groups"
                     :key="'group' + g_index" :to="'/contacts/group/' + group">
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

      <p class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-list" aria-hidden="true"></i>
            </span>
        Config:
      </p>

      <pre>{{ item.config }}</pre>

    </article>
  </div>
</template>

<script>

export default {
  name: 'ServiceDetails',
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
    this.$http
        .get(`${this.$apiBaseURL}/services/api/view/${this.$route.params.service}`)
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
