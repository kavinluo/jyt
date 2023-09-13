import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/icon.css'
import VueCookie from 'vue-cookie'
import './styles/index.less'
import './styles/frame.css'
import './styles/message.css'
import './styles/handleExtraUi.css'
import './styles/daily.less'

import Util from './libs/mix'
// import Filters from './libs/filters'
import './permision'
import store from './store/index'
import './libs/filters/formDate.js' // 全局時間过滤器
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
// Filters(Vue)
// Vue.use(Filters)
Vue.use(iView)
Vue.use(ElementUI)
Vue.use(Util)
Vue.use(VueCookie)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
