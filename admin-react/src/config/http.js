import Jsonp from 'jsonp'
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://192.168.1.177:666'
// http request 拦截
axios.interceptors.request.use(
    config => {
        return config
    },
    err => {
        return Promise.reject(err)
    }
)
// http response 拦截
axios.interceptors.response.use(
    response => {
        return response
    },
    err => {
        return Promise.reject(err)
    }
)
function bindqs(data) {
    if(JSON.stringify(data).indexOf('{') === 0){
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
export default {jsonp, get, post}