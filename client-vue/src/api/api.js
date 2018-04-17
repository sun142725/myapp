import http from '@/config/http'
// qq音乐接口配置
const PARAM = {
  format: 'jsonp',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0
}
const option = {
  param: 'jsonpCallback',
  prefix: 'callback'
}
const PARAML = {
  g_tk: 5381,
  ADTAG: 'myqq',
  from: 'myqq',
  channel: 10007100,
  type: 'top',
  format: 'jsonp',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  page: 'detail'
}
const paramlSong = {
  g_tk: 1278911659,
  hostUin: 0,
  platform: 'yqq',
  needNewCode: 0,
  cid: 205361747,
  uin: 0,
  guid: 3655047200
}
let ajax = {
  login (data) {
    return http.post('/login', data)
  },
  ranking (data) {
    return http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', Object.assign(data, PARAM), option)
  },
  musicList (data) {
    return http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', Object.assign(data, PARAML), option)
  },
  getSong (data) {
    return http.jsonp('https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg', Object.assign(data, paramlSong, PARAM), option)
  },
  musicBanner (data) {
    return http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', Object.assign(data || {}, PARAM), option)
  }
}
export default {
  install: function (Vue, option) {
    Vue.prototype.http = ajax
  }
}
/*
function bind(fn,context){
return function(){
return fn.apply(context,arguments)
}
}
*/
