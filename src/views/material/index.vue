<template>
  <el-card>
      <!-- 面包屑 -->
      <bread-crumb slot="header">
      <template slot="title">
          素材管理
      </template>
      </bread-crumb>
<!-- {{activeName}} -->
 <el-tabs v-model="activeName" type="border-card">
   <el-tab-pane label="全部素材" name='all'>全部素材</el-tab-pane>
  <el-tab-pane label="收藏素材" name='collect'>收藏素材</el-tab-pane>
</el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'collect'
    }
  }
}
</script>

<style>

</style>
