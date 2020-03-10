<template>
  <el-card class="articles">
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
     <!-- 文章主体结构 -->
      <el-row class="total" type="flex" align="middle">
        <span class="t">共找到1000条符合条件的内容</span>
      </el-row>
      <!-- 作为一个循环项 -->
      <div class="article-item" v-for="item in 100" :key="item">
         <div class="left" style="background:pink">
              <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1376392996,3689681512&fm=26&gp=0.jpg" alt="">
              <div class="info">
                <span>标题</span>
                 <el-tag class="tag">已发表</el-tag>
                <span class="date">时间</span>
              </div>
         </div>
          <div class="right" style="background:green">
          <span> <i class="el-icon-edit"></i>   修改</span>
           <span> <i class="el-icon-delete"></i> 删除</span>
          </div>
      </div>
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

<style lang="less" scoped>
.articles{
   .total {

     height:50px;
     border-bottom:1px dashed #ccc;

   }
   .article-item{
     display: flex;
     justify-content: space-between;
     padding:20px 0;
     border-bottom:1px solid #ccc;
     .left{
       display: flex;
       img{
         height: 100px;
         width: 160px;
         border-radius: 5px;
       }
       .info{
         display: flex;
         flex-direction: column;
         height: 100px;
         justify-content: space-around;
         margin-left:10px;
         .tag{
           width: 60px;
           text-align: center;
         }
         .date{
           color:#999;
           font-size:12px;
         }
       }
     }
     .right{
      //  margin:0 auto;
      padding-top:30px;
       span{
         font-size: 14px;
         margin-right:8px;
         cursor: pointer;
         user-select: none;
       }
     }
   }
}
</style>
