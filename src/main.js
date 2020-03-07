import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/permission' // 引入

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less' // 引入样式
import Components from '@/components'
// import axios from 'axios'  //封装请求时间 重构的
import axios from '@/utils/request'

Vue.use(ElementUI)
Vue.use(Components) // 注册开发自定义组件
Vue.config.productionTip = false

// 统一处理请求时间重新剪切走的
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
