import photoSwipe from './photoSwipe'
import Vue from 'vue'
var PhotoSwipes = Vue.extend(photoSwipe)
let instance = null
export default (item, options) => {
  instance || (instance = new PhotoSwipes({
    el: document.createElement('div')
  }))
  setTimeout(() => {
    instance.openPhotoSwipe(item, options)
  })
  document.body.appendChild(instance.$el)
}
