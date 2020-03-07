<template>
  <!-- <div class="Layout-header">顶部操作栏</div> -->
  <el-row type="flex" class="Layout-header" align="middle">
      <!-- :的意思是变量 -->
  <el-col :span='12' class="left">
      <i class="el-icon-s-fold">萌宠动物乐园</i>
       </el-col>

  <el-col :span='12' class="right">
      <el-row type="flex" justify="end" align="middel">
          <img :src="userInfo.photo" alt="">
    <el-dropdown trigger="click" @command="clickMenu">
  <span class="name">
  {{userInfo.name}}
  </span>
  <el-dropdown-menu slot="dropdown" align="middel" >
    <el-dropdown-item command="info">个人信息</el-dropdown-item>
    <el-dropdown-item command="git">git地址</el-dropdown-item>
    <el-dropdown-item command="lgout">退出</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
    </el-row>

  </el-col>
</el-row>
</template>

<script>
export default {

  // 定义一个对象接收数据    获取数据显示数据 钩子函数+v-bind绑定
  data () {
    return {
      userInfo: { }
    }
  },
  methods: {
    clickMenu (command) {
    //   alert(111 + command)
      if (command === 'info') {
        // 点击个人信息
      } else if (command === 'git') {
        window.location.href = 'https://github.com/shuiruohanyu/94-heimatoutiaopc'
      } else {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  },
  created () {
    // const token = localStorage.getItem('user-token')
    // 获取用户的个人信息
    this.$axios({
      url: 'user/profile' // 请求地址
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).then(result => {
      // debugger
      this.userInfo = result.data
    })
  }

}
</script>

<style lang='less' scoped>

.Layout-header{
    height: 60px;
    // background-color: pink;
    .left{
        i{
            font-size: 20px;
        }
    }

    .right{
        img{
            width:50px;
            height:50px;
            border-radius: 50%;
            margin-right:20px;       }
        .name{
            // display:inline-block;
            // height:50px;
            line-height: 50px;
            margin-right:40px;
        }
    }
}
</style>
