import Vue from 'vue'
import App from './App'
import api from './http'
import store from './store'
import i18n from './i18n'
import global from '@/utils/global'
import * as permission from '@/utils/permission'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import fullscreen from 'vue-fullscreen'
import qs from 'qs'     //QueryString转换
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/iconfont/iconfont.css'
import router from './router'


Vue.use(ElementUI)
Vue.use(api)
Vue.use(fullscreen)

Vue.config.productionTip = false
Vue.prototype.global = global
Vue.prototype.$echarts = echarts
Vue.prototype.$qs = qs

/**
 * 自定义指令：v-has
 */
Vue.directive('has', {
  inserted: function(el, binding) {
    if (permission.hasApiPerms && !permission.hasApiPerms(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
