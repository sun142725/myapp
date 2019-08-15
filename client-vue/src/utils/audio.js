const audio = {
  audioSrc2478: require('../../assets/audio/2478.mp3'),
  audio: new Audio(this.audioSrc2478),
  t: null,
  init: function (src) {
    this.stop()
    this.audio = new Audio(src || this.audioSrc2478)
  },
  play: function (src, isloop, repeatDuration) {
    //  src:string => 音频地址  isloop:boolean => 是否循环播放  repeatDuration:Int => 延时关闭时间设置/秒
    if (this.audio) {
      this.stop()
    }
    this.init(src)
    let _this = this
    _this.audio.loop = isloop || false
    // if(_this.audio.paused){
    //     _this.audio.play();
    // }else{
    //     _this.audio.pause();
    // }
    _this.audio.play()
      .then(res => {
        console.log('可以自动播放')
      })
      .catch(err => {
        console.log('不可以自动播放', err)
      })
    console.log('audio进来了audio进来了audio进来了', repeatDuration)
    repeatDuration && _this.loopPlay(repeatDuration)
  },
  loopPlay: function (repeatDuration) {
    console.log('audio进来了', this.audio)
    clearTimeout(this.t)
    this.t = setTimeout(() => {
      this.stop()
      if (this.t) {
        clearTimeout(this.t)
        this.t = null
      }
    }, repeatDuration || 0)
  },
  stop: function (audio) {
    console.log('触发stop触发stop触发stop触发stop')
    if (this.audio) {
      this.audio.loop = false
      this.audio.pause()
      this.destroy()
    }
  },
  destroy: function () {
    // this.audio.removeListener('canplaythrough', null)
    this.audio = null
  }
}
export default audio

function debounce(fn, delay) {
  var timer = null
  return function () {
    var that = this;
    var arg = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(that, arg)
    }, delay)
  }
}
