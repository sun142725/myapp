// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/index'
import App from './App'
import http from './api/api'
import router from './router'
import './comment.css'
import './iconfont/iconfont.css'
import { ToastPlugin, LoadingPlugin } from 'vux'
import components from './components'
Vue.use(components)
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
