import Vue from 'vue'
import store from '../store/index'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/page/login/login'], resolve)
    },
    // 首页
    {
      path: '/',
      redirect: '/home',
      component: resolve => require(['@/page/Home'], resolve),
      children: [
        {
          path: '/home',
          name: 'home',
          component: resolve => require(['@/page/home/home'], resolve),
          meta: {
            requireAuth: false
          }
        },
        // 聊天
        {
          path: '/chat',
          name: 'chat',
          component: resolve => require(['@/page/chat/chat'], resolve),
          meta: {
            requireAuth: false
          }
        },
        //  动态
        {
          path: '/trends',
          name: 'trends',
          component: resolve => require(['@/page/trends/trends'], resolve),
          meta: {
            requireAuth: false
          }
        },
        //  个人中心
        {
          path: '/personal',
          name: 'personal',
          component: resolve => require(['@/page/personal/personal'], resolve)
        }
      ]
    },
    //  音乐
    {
      path: '/music',
      name: 'music',
      component: resolve => require(['@/page/music/music'], resolve)
    },
    {
      path: '/musiclist',
      name: 'musiclist',
      component: resolve => require(['@/page/music/musicList'], resolve)
    },
    {
      path: '/music/search',
      name: 'mSearch',
      component: resolve => require(['@/page/music/music_search'], resolve)
    },
    {
      path: '/music_play',
      name: 'music_play',
      component: resolve => require(['@/page/music/music_play'], resolve)
    },
    {
      path: '/chatroom',
      name: 'chatroom',
      component: resolve => require(['@/page/chat/chatRoom'], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/*',
      name: '404',
      component: resolve => require(['@/page/404'], resolve)
    }
  ]
})

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('userPhone')) {
  store.commit('login', window.localStorage.getItem('userPhone'))
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
export default router
