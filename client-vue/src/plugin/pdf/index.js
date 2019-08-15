// import PDF from './index.vue'
import PDF from './pdf2.vue'
import Vue from 'vue'
let instance = null
//  item String
export default (item = '', option = {}) => {
  if (!instance) {
    const PDFPlugin = Vue.extend(PDF)
    instance = new PDFPlugin().$mount()
    document.body.appendChild(instance.$el)
  }
  if (item.length) {
    instance.showPDF(item)
  } else {
    instance.closePdf()
  }
}
