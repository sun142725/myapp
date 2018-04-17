// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/store'
import App from './App'
import http from './api/api'
import router from './router'
import './comment.css'
import { ToastPlugin, LoadingPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

Vue.use(http)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
