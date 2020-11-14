<template>
  <div class="navbar-item" :class="menu_class" v-if="items !== undefined">
    <a class="navbar-link">
      {{ title }}
      <div class="navbar-dropdown" v-if="type === 'dropdown'">
        <template v-for="(menu_subitem, index) in items">
          <hr v-if="menu_subitem.title === undefined" class="navbar-divider" :key="index">
          <router-link v-else class="navbar-item" :to="menu_subitem.uri" :key="menu_subitem.title">
            {{ menu_subitem.title }}
          </router-link>
        </template>

      </div>
    </a>
  </div>
  <router-link class="navbar-item" :to="uri" v-else>
    About
  </router-link>
</template>

<script>
export default {
  name: 'TopMenuItem',
  props: ['title', 'items', 'type', 'menu_class', 'uri']
}
</script>
