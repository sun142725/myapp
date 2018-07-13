import Vue from 'vue'
import store from '../store/store'
import Router from 'vue-router'
// import HelloWorld from '@/page/HelloWorld'
//  登陆注册
import Login from '@/page/login/login'
// 首页
import BHome from '@/page/Home'
import Home from '@/page/home/home'
//  音乐
import Music from '@/page/music/music'
import MusicList from '@/page/music/musicList'
import MusicPlay from '@/page/music/music_play'
import MusicSearch from '@/page/music/music_search'
//  聊天
import Chat from '@/page/chat/chat'
import Chatroom from '@/page/chat/chatRoom'
//  动态
import Trends from '@/page/trends/trends'
// 个人中心
import Personal from '@/page/personal/personal'
// 404
import Notfound from '@/page/404'

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
            requireAuth: false
          }
        },
        // 聊天
        {
          path: '/chat',
          name: 'chat',
          component: Chat,
          meta: {
            requireAuth: false
          }
        },
        //  动态
        {
          path: '/trends',
          name: 'trends',
          component: Trends,
          meta: {
            requireAuth: false
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
      component: Music
    },
    {
      path: '/musiclist',
      name: 'musiclist',
      component: MusicList
    },
    {
      path: '/music/search',
      name: 'mSearch',
      component: MusicSearch
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
        requireAuth: false
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
