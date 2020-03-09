<template>
  <el-card>
     <bread-crumb slot="header">
     <template slot='title'>文章列表 </template>
     </bread-crumb>
     <!-- 表单容器 -->
         {{value}}
     <el-form>

         <el-form-item label="文章状态：">
             <el-radio-group v-model="value">
                <el-radio label="1">全部</el-radio>
                <el-radio label="2">草稿</el-radio>
                <el-radio label="3">待审核</el-radio>
                <el-radio label="4">审核通过</el-radio>
                <el-radio label="5">审核失败</el-radio>
             </el-radio-group>
         </el-form-item>
         <el-form-item label="频道列表：">
             <el-select placeholder="请选择频道">

             </el-select>
         </el-form-item>
         <el-form-item label="日期范围：">
             <el-date-picker  type="daterange">

             </el-date-picker>
         </el-form-item>
     </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      value: '2'
    }
  }

}
</script>

<style>

</style>
