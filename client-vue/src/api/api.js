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
// Request URL:https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&nobase64=1&musicid=213266098&songtype=0&_=1523952436577&jsonpCallback=jsonp1
const paramlysic = {
  g_tk: 5381,
  uin: 0,
  notice: 0,
  platform: 'h5',
  needNewCode: 1,
  musicid: 213266098,
  songtype: 0,
  nobase64: 1
}
const musicSearch = {
  g_tk: 5381,
  uin: 0,
  platform: 'h5',
  needNewCode: 1,
  notice: 0,
  zhidaqu: 1,
  catZhida: 1,
  t: 0,
  flag: 1,
  ie: 'utf-8',
  sem: 1,
  aggr: 0,
  perpage: 20,
  n: 20,
  p: 1,
  remoteplace: 'txt.mqq.all',
  _: new Date().getTime()
}
let ajax = {
  login (data) {
    return http.post('/login', data)
  },
  register (data) {
    return http.post('/register', data)
  },
  forget (data) {
    return http.post('/forget', data)
  },
  ranking (data) {
    return http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', Object.assign(data, PARAM), option)
  },
  musicList (data) {
    return http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', Object.assign(data, PARAML), option)
  },
  musicSearch (data) {
    return http.jsonp('https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp', Object.assign(data, musicSearch, PARAM), option)
  },
  getLyric (data) {
    return http.jsonp('https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg', Object.assign(data, paramlysic, PARAM), option)
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
