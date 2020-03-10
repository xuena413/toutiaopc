<template>
  <el-card>
     <bread-crumb slot="header">
     <template slot='title'>文章列表 </template>
     </bread-crumb>
     <!-- 表单容器 -->
         {{value}}
     <el-form>
<!-- {{searchForm}} {{channels}} -->
 {{searchForm}}
         <el-form-item label="文章状态：">
             <el-radio-group v-model="searchForm.status">
                 <!-- :label是后面的值不会加引号 =======？？？？？？-->
                <el-radio label="5">全部</el-radio>
                <el-radio label="0">草稿</el-radio>
                <el-radio label="1">待审核</el-radio>
                <el-radio label="2">审核通过</el-radio>
                <el-radio label="3">审核失败</el-radio>
             </el-radio-group>
         </el-form-item>
         <el-form-item label="频道列表：">
             <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
               <!-- 下拉选项 -->
               <!-- el-option是下拉的选项 label是显示值 value是绑定的值 -->
                <el-option v-for="item in channels" :key="item.id"
                 :label="item.name" :value="item.id">
                 </el-option>
             </el-select>
         </el-form-item>
         <el-form-item label="日期范围：">
             <el-date-picker  type="daterange" v-model="searchForm.dateRange">

             </el-date-picker>
         </el-form-item>
     </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
    //   value: '2'
    // 定义表单对象
      searchForm: {
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 / 先将 5 定义成 全部
        status: 5, // 默认为全部
        channel_id: null,
        dateRange: []
      },
      channels: []
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
        // 默认是get类型 所以不用写了
      }).then((result) => {
        this.channels = result.data.channels
      })
    }

  },
  created () {
    // 获取频道接口返回的数据
    this.getChannels() // 在钩子函数中调用
  }

}
</script>

<style>

</style>
