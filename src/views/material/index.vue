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
   <el-tab-pane label="全部素材" name='all'>
       <!-- 内容循环生成页面结构 -->
   <div class="img-list">
       <!-- 采用v-for对list数据进行循环 -->
       <el-card class="img-card" v-for="item in list" :key="item.id">
           <!-- 放置图片 并且赋值 图片地址 -->
           <img :src="item.url" alt="">
           <el-row class="operate" type="flex"  align="middle" justify="space-around">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
           </el-row>
       </el-card>
   </div>
   </el-tab-pane>
  <el-tab-pane label="收藏素材" name='collect'>收藏素材</el-tab-pane>
</el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'collect',
      //   定义list接收全部素材的数据
      list: []
    }
  },
  methods: {
    getMaterial () {
      this.$axios({
        url: '/user/images',
        method: 'get',
        params: {
          collect: false // 获取全部数据（因为collect为false为全部数据）
        }, // get参数 也就是query参数
        data: {// data参数，也就是body参数

        }
      }).then(result => {
        // debugger
        // 返回的数据赋值到data中
        this.list = result.data.results
      })
    }
  },
  //   钩子函数中调用
  created () {
  // 实例化之后，调用获取素材的数据
    this.getMaterial()
  }

}
</script>

<style lang="less" scoped>
.img-list{
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
    .img-card{
        width:220px;
        height:240px;
        margin:20px 40px;
        position:relative;
        img{
            width:100%;
            height:100%;
        }
        .operate{
            position:absolute;
            left:0;
            bottom:0;
            width:100%;
            background: #f4f5f6;
            height:30px;
            i{
                font-size:20px;
            }
        }
     }
}
</style>
