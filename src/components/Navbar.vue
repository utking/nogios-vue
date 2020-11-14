<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <span class="navbar-item tag is-info is-large">{{ app_title }}</span>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
         data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <TopMenuItem v-for="top_menu_item in top_menu" :key="top_menu_item.title"
                     :items="top_menu_item.items" :type="top_menu_item.type" :uri="top_menu_item.uri"
                     :menu_class="top_menu_item.class" :title="top_menu_item.title" />
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons"></div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

import TopMenuItem from '@/components/MenuItem'

export default {
  name: 'Navbar',
  components: {
    TopMenuItem
  },
  props: {},
  data: function () {
    return {
      app_title: 'NOGIOS',
      top_menu: [
        {
          'title': 'Status',
          'type': 'dropdown',
          'class': 'has-dropdown is-hoverable',
          'items': [
            {'title': 'Hosts', 'uri': '/status/hosts'},
            {'title': 'Services', 'uri': '/status/services'},
            {'title': undefined},
            {'title': 'Unhandled', 'uri': '/status/unhandled'},
          ]
        },
        {
          'title': 'Entities',
          'type': 'dropdown',
          'class': 'has-dropdown is-hoverable',
          'items': [
            {'title': 'Hosts', 'uri': '/hosts'},
            {'title': 'Services', 'uri': '/services'},
            {'title': 'Commands', 'uri': '/commands'},
            {'title': 'Users', 'uri': '/contacts'},
            {'title': 'Groups', 'uri': '/contacts/groups'},
            {'title': 'Time Periods', 'uri': '/time-periods'},
          ]
        },
        {
          'title': 'Config',
          'type': 'dropdown',
          'class': 'has-dropdown is-hoverable',
          'items': [
            {'title': 'Host statuses', 'uri': '/hosts/statuses'},
            {'title': 'Service statuses', 'uri': '/services/statuses'},
            {'title': undefined},
            {'title': 'Reload...', 'uri': '/config/entities'},
          ]
        },
        // {
        //   'title': 'More',
        //   'type': 'dropdown',
        //   'class': 'has-dropdown is-hoverable',
        //   'items': [
        //     {'title': 'Admin panel', 'uri': '/admin'},
        //   ]
        // },
        {
          'title': 'About',
          'uri': '/about',
        },
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
