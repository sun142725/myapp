import http from '../config/http.js'

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
    paihangbang (data) {
        return http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', Object.assign(data, PARAM), option)
    },
    login (data) {
        return http.post('/admin_login', data)
    }
}
export default ajax