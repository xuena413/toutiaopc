<template>
   <div class='layout-aside' >
   <div class="title">
      <img src="../../assets/img/logo_admin.png" alt="">
   </div>
   <!-- 第一步：开启路由模式 :router="true"-->
      <el-menu router background-color="#323745" text-color="#adafb5">
        <el-menu-item index="1">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
        <!-- 二级菜单 -->
          <!-- 两个给同一个具名插槽 -->
      <el-submenu index="2">
        <template slot="title">
            <i  class="el-icon-s-grid"></i>
          <span>内容管理</span>
        </template>

          <el-menu-item>发布文章</el-menu-item>
          <el-menu-item>内容列表</el-menu-item>
          <el-menu-item>评论列表</el-menu-item>
           <el-menu-item>素材管理</el-menu-item>
      </el-submenu>

       <el-submenu index="3">
        <template slot="title">
           <i  class="el-icon-s-custom"></i>
          <span>粉丝管理</span>
        </template>

          <el-menu-item>图文数据</el-menu-item>
          <el-menu-item>粉丝概况</el-menu-item>
          <el-menu-item>粉丝画像</el-menu-item>
          <el-menu-item>粉丝列表</el-menu-item>
      </el-submenu>

            <!-- 插槽 slot-->

       <el-menu-item index="4">
        <i class="el-icon-user-solid"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
      </el-menu>

  </div>
</template>

<script>
// 实现导航组件
export default {

}
</script>

<style lang='less' scoped>
.layout-aside{

    background-color: black;
  height:100vh;
  width: 240px;
  .title{
      text-align: center;
      img{
          height: 32px;
          margin:10px 0;
      }
  }

.el-menu{
border-right:none;
}
}

</style>
