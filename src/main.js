import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueTimeago from 'vue-timeago'
import axios from 'axios'

import routes from '@/routes'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

Vue.prototype.$http = axios;
Vue.prototype.$apiBaseURL = 'http://127.0.0.1:8000';
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
