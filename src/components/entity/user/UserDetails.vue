<template>
  <div>
    <h3 class="title is-4">User details</h3>

    <article class="panel is-primary">
      <p class="panel-heading">
        {{ item.name }}
      </p>

      <a class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-envelope" aria-hidden="true"></i>
            </span>
        Channel: <span class="tag is-link">{{ item.channel }}</span>
      </a>

      <p class="panel-block" v-if="item.channel === 'Email'">
            <span class="panel-icon">
              <i class="fas fa-envelope" aria-hidden="true"></i>
            </span>
        Email: <a class="tag" :href="'mailto:' + item.destination">{{ item.destination }}</a>
      </p>
    </article>
  </div>
</template>

<script>

export default {
  name: 'UserDetails',
  data: function () {
    return {
      'item': {},
    }
  },
  mounted() {
    this.$http
        .get(`${this.$apiBaseURL}/contacts/api/user/${this.$route.params.user}`)
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
