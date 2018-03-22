import Vue from 'vue'
import store from '../store/store'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
//  登陆注册
import Login from '@/components/login/login'
// 首页
import BHome from '@/components/Home'
import Home from '@/components/home/home'
//  音乐
import Music from '@/components/music/music'
import MusicPlay from '@/components/music/music_play'
//  聊天
import Chat from '@/components/chat/chat'
import Chatroom from '@/components/chat/chatRoom'
//  动态
import Trends from '@/components/trends/trends'
// 个人中心
import Personal from '@/components/personal/personal'
// 404
import Notfound from '@/components/404'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 首页
    {
      path: '/',
      redirect: '/home',
      component: BHome,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: {
            requireAuth: true
          }
        },
        // 聊天
        {
          path: '/chat',
          name: 'chat',
          component: Chat,
          meta: {
            requireAuth: true
          }
        },
        //  动态
        {
          path: '/trends',
          name: 'trends',
          component: Trends,
          meta: {
            requireAuth: true
          }
        },
        //  个人中心
        {
          path: '/personal',
          name: 'personal',
          component: Personal
        }
      ]
    },
    //  音乐
    {
      path: '/music',
      name: 'music',
      component: Music,
      children: []
    },
    {
      path: '/music_play',
      name: 'music_play',
      component: MusicPlay
    },
    {
      path: '/chatroom',
      name: 'chatroom',
      component: Chatroom,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/*',
      name: '404',
      component: Notfound
    }
  ]
})

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('userPhone')) {
  store.commit('login', window.localStorage.getItem('userPhone'))
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.loginstate) {
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
