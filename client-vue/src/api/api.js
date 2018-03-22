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
let ajax = {
  login (data) {
    return http.post('/login', data)
  },
  ranking (data) {
    return http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', Object.assign(data, PARAM), option)
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
