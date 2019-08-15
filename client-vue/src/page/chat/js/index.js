
/**
 * 转换时间为 Unix时间
 */
export function formatUnixT (time) {
  return new Date(Date.parse(time.replace(/-/g, '/'))).getTime()
}
/**
 * T Array 收集每次记录的时间戳用于对比
 * h Object 缓存每次展示的时间 避免聊天列表数据新增引起的重新计算而使之前的时间消失
 * callback 参数time为Unix时间戳
 */
function cached (fn) {
  var T = [0]
  var h = Object.create(null)
  // eslint-disable-next-line
  return (function (str) {
    return h[str] ? h[str] : (rule(str, T[T.length - 1]) ? '' : ((T[T.length] = str) && (h[str] = fn(str)) && fn(str)))
  })
}
/**
 * cached的规则函数 计算两个时间戳的时间差  微信是5分钟  60*5
 * @params {Number} time - 当前时间
 * @params {Number} T - 比较时间
 */
function rule (time, T) {
  return time - T < 300
}

/**
 * 将时间转换为LocalTime
 */
function getLocalTime (nS) {
  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
}
/**
 * 输出时间转换format函数
 */
export var formatTime = cached(time => {
  return getLocalTime(time)
})

/**
 * 时间格式化为时分秒
 * @param { Number } time
 */
export function countUpData (time = 0) {
  var hour = Math.floor(time / (60 * 60 * 1000))
  var minute = Math.floor(time % (60 * 60 * 1000) / (60 * 1000))
  var second = Math.floor(time % (60 * 1000) / 1000)
  hour = hour < 10 ? '0' + hour : '' + hour
  minute = minute < 10 ? '0' + minute : '' + minute
  second = second < 10 ? '0' + second : '' + second
  return hour + ':' + minute + ':' + second
}

//  微信公众号 解决ios中 input键盘回弹失效的问题
function isWeiXinAndIos () {
  let ua = '' + window.navigator.userAgent.toLowerCase()
  let isWeixin = /MicroMessenger/i.test(ua)
  let isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua)
  return isWeixin && isIos
}
function weChatInputBug () {
  let myFunction
  let isWXAndIos = isWeiXinAndIos()
  if (isWXAndIos) {
    document.body.addEventListener('focusin', () => {
      clearTimeout(myFunction)
    })
    document.body.addEventListener('focusout', () => {
      clearTimeout(myFunction)
      myFunction = setTimeout(function () {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }, 200)
    })
  }
}
weChatInputBug()
