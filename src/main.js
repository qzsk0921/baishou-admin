import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'

import '@/style/index.scss' // 全局css

import './permission' //权限控制

import * as filters from './filter' //全局过滤器

import './icons' // icon

// import console from './components/console'
import confirm from './components/Dialog/confirm'


// Vue.prototype.$console = console
// Vue.prototype.$confirm = confirm

Vue.use(ElementUI)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
