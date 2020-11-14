import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueTimeago from 'vue-timeago'

import routes from '@/routes'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueTimeago, {
  locale: 'en-US',
})

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
