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
    <el-dropdown trigger="click">
  <span class="name">
  {{userInfo.name}}
  </span>
  <el-dropdown-menu slot="dropdown" align="middel" >
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头</el-dropdown-item>
    <el-dropdown-item>螺蛳粉</el-dropdown-item>
    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
    </el-row>

  </el-col>
</el-row>
</template>

<script>
export default {

  // 定义一个对象接收数据    获取数据显示数据
  data () {
    return {
      userInfo: { }
    }
  },
  created () {
    const token = localStorage.getItem('user-token')
    // 获取用户的个人信息
    this.$axios({
      url: 'user/profile', // 请求地址
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      // debugger
      this.userInfo = result.data.data
    })
  }

}
</script>

<style lang='less' scoped>

.Layout-header{
    height: 60px;
    background-color: pink;
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
