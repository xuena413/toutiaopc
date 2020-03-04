import router from '@/router'
router.beforeEach(function (to, from, next) {
  // next 不写死在守卫处

  //   next() // 表示放过
  // 首先应该判断 你需要拦截哪些页面 如果页面的地址以 /home为开头, 就需要进行token的判断
  // 判断你要去的页面是不是以 /home为开头

  // ---------------------------------------必须执行的三种场景
  if (to.path.startsWith('/home')) {
    //   表示你要去主页相关的页面 我要看看你有没有钥匙 你没有钥匙我把你一脚踢回 登录页
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next() // 有钥匙放过
    } else {
      next('/login') // 回登录页 去拿钥匙
    }
  } else {
    //   如果我不是去主页相关
    next() // 直接放过
  }
})
