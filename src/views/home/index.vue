<template>
  <el-container>
    <el-aside style="background-color:pink">
         <h1>左侧导航区域</h1>
    </el-aside>
    <el-container>
      <el-header>
         <h1>顶部操作栏</h1>
      </el-header>
      <el-main>
         <h1>主要区域</h1>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
