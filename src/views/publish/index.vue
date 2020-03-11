<template>
   <el-card>
       <bread-crumb slot="header">
       <template slot="title">发布文章</template>
       </bread-crumb>
       <el-form style="margin-left:50px"  label-width="100px">
           <el-form-item label="标题">
           <el-input style="width:70%" placeholder="请输入您的标题"></el-input>
           </el-form-item>
            <el-form-item label="内容">
              <el-input type="textarea" placeholder="请输入您的内容" :rows="4" style="width:70%"></el-input>
           </el-form-item>
            <el-form-item label="封面">
               <el-radio-group>
                 <el-radio>单图</el-radio>
                 <el-radio>三图</el-radio>
                 <el-radio>无图</el-radio>
                 <el-radio>自动</el-radio>
              </el-radio-group>
           </el-form-item>
           <el-form-item label="频道">
                 <el-select  placeholder="请选择频道">
                     <!-- label是显示值 value是保存值 -->
                     <el-option v-for="item in channels" :key="item.id"
                     :value="item.id"
                     :label="item.name"></el-option>
                 </el-select>
           </el-form-item>
           <el-form-item>
                <el-button type="primary">发表</el-button>
                <el-button>存入草稿</el-button>
           </el-form-item>
       </el-form>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [] // 接收频道数据
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels' // 获取频道数据
      }).then((result) => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>

</style>
