import axios from 'axios'
import router from '@/router'

import JSONBig from 'json-bigint' // 引入第三方处理大数字的包
// 在axios的返回数据进行自定义处理，用json-bigint替代原来的json
axios.defaults.transformResponse = [function (data) {
  // const result = JSON.parse(data)
  // return result

  // 用大数字技术做
  // const result = JSONBig.parse(data)
  // return result

  return data ? JSONBig.parse(data) : {}
}]
// 等同于this.$router 组件上面用
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 对所有的接口进行请求注入
axios.interceptors.request.use(function (config) {
  //   debugger
  // 还可以在此处干很多事
  const token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}` // 统一注入token
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // 成功执行
  // 返回数据
  return response.data ? response.data : {}
}, function (error) {
  // 失败执行
  // 401是钥匙的问题
// 导航守卫已经检验了钥匙 有没有
// 报401时间会返回登录页 重新拿钥匙 + 清除旧钥匙
  if (error.response.status === 401) {
    localStorage.removeItem('user-token')
    router.push('/login')
  }
  //   console.log(error)
  return Promise.reject(error)
})
export default axios
