import axios from 'axios'
import Jsonp from 'jsonp'
import qs from 'qs'
import {baseURL} from './env'
axios.defaults.baseURL = baseURL

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
    data: bindqs(data)
  })
}
let get = (url, data) => {
  return axios({
    method: 'get',
    url,
    data
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
export default {post, get, jsonp}
