<template>
  <div>
    <h3 class="title is-4">Group details</h3>

    <article class="panel is-primary">
      <p class="panel-heading">
        {{ item.name }}
      </p>

      <p class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-users" aria-hidden="true"></i>
            </span>
        Includes:
        <template v-for="(member, index) in item.config.members">
          <router-link class="is-link tag" :to="'/contacts/user/' + member" :key="index">
            {{ member }}
          </router-link>
        </template>
      </p>
    </article>
  </div>
</template>

<script>

export default {
  name: 'UserDetails',
  data: function () {
    return {
      'item': { config: {} },
    }
  },
  mounted() {
    this.$http
        .get(`${this.$apiBaseURL}/contacts/api/group/${this.$route.params.group}`)
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
