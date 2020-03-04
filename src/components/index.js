// 需要使用Vue.use的方式去注册
// Vue.use会调用对象中的方法install方法，install方法的第一个参数是Vue的对象
import LayoutHeader from './home/layout-header'
import LayoutAside from './home/layout-aside'

import BreadCrumb from './common/bread-crumb'
export default {
  install: function (Vue) {
    // 注册全局组件  Vue
    // 注册后全部都可以使用
    Vue.component('layout-header', LayoutHeader)
    Vue.component('layout-aside', LayoutAside)
    Vue.component('bread-crumb', BreadCrumb)// 注册一个面包屑
  }
}
