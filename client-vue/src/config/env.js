let baseURL
let imgURL = ''
if (process.env.NODE_ENV === 'development') { //  开发环境
  baseURL = 'http://192.168.1.155:666'
} else { //  生产环境
  baseURL = 'http://192.168.1.177:666'
}
export {
  baseURL,
  imgURL
}
