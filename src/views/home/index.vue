<template>
  <el-container>
    <el-aside >
         <!-- <h1>左侧导航区域</h1> -->
         <layout-aside>

         </layout-aside>
    </el-aside>
    <el-container>
      <el-header>
         <!-- <h1>顶部操作栏</h1> -->
         <layout-header>
顶部操作栏
         </layout-header>
      </el-header>
      <el-main>
         <!-- <h1>主要区域</h1> -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 引入左侧导航
// import LayoutAside from '@/components/home/layout-aside'
// import LayoutHeader from '@/components/home/layout-header'
export default {
  // components: {
  //   'layout-aside': LayoutAside,
  //   'layout-header': LayoutHeader
  // }

}
</script>

<style>

</style>
