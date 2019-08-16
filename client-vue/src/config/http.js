import axios from 'axios'
import Jsonp from 'jsonp'
import qs from 'qs'
import {baseURL} from './env'
axios.defaults.baseURL = baseURL
axios.defaults.crossDomain = true
// axios.defaults.withCredentials = true // 设置cross跨域 并设置访问权限 允许跨域携带cookie信息
// http request 拦截
axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response => {
    return response
  },
  err => {
    return Promise.reject(err)
  }
)

function bindqs (data) {
  if (JSON.stringify(data).indexOf('{') === 0) {
    return qs.stringify(data)
  } else {
    return data
  }
}
let post = (url, data) => {
  return axios({
    method: 'post',
    url,
    headers: {
      // 'Content-Type': 'application/x-www-form-unlencoded; charset=utf-8'
    },
    data: bindqs(data)
  })
}
let postJson = (url, data) => {
  return axios({
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
      // 'access_Token': sessionStorage.access_Token || ''
    },
    data: data
  })
}
let get = (url, data) => {
  return axios({
    method: 'get',
    url,
    data,
    params: data
  })
}

//  处理jsonp url canshu
function buildUrl (url, data) {
  let params = []
  for (var k in data) {
    params.push(`${k}=${data[k]}`)
  }
  let param = params.join('&')
  if (url.indexOf('?') === -1) {
    url += '?' + param
  } else {
    url += '&' + param
  }
  return url
}
let jsonp = (url, data, option) => {
  return new Promise((resolve, reject) => {
    Jsonp(buildUrl(url, data), option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
export default {post, get, jsonp, postJson}
