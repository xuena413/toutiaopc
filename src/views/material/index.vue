<template>
  <el-card>
      <!-- 面包屑 -->
      <bread-crumb slot="header">
      <template slot="title">
          素材管理
      </template>
      <!-- 上传图片 -->

      </bread-crumb>
      <el-row type="flex" justify="end" style="margin-bottom:15px">
          <el-upload action="" :http-request="uploadImg">
      <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      </el-row>

<!-- {{activeName}} -->
 <el-tabs v-model="activeName" type="border-card" @tab-click="changeTab">
   <el-tab-pane label="全部素材" name='all'>
       <!-- 内容循环生成页面结构 -->
   <div class="img-list">
       <!-- 采用v-for对list数据进行循环 -->
       <el-card class="img-card" v-for="item in list" :key="item.id">
           <!-- 放置图片 并且赋值 图片地址 -->
           <img :src="item.url" alt="" @click="dialogVisible=true">
           <el-row class="operate" type="flex"  align="middle" justify="space-around">
           <!-- 3.7为收藏按钮和删除按钮增加事件  -->

              <i @click="collectOrCancel(item)" :style="{color: item.is_collected?'red':'black'}" class="el-icon-star-on"></i>
              <i @click="delMaterial(item)" class="el-icon-delete-solid"></i>
           </el-row>
       </el-card>
   </div>
   </el-tab-pane>
  <el-tab-pane label="收藏素材" name='collect'>
      <div class="img-list">
       <!-- 采用v-for对list数据进行循环 -->
       <el-card class="img-card" v-for="item in list" :key="item.id">
           <!-- 放置图片 并且赋值 图片地址 -->
           <img :src="item.url" alt="" @click="dialogVisible=true">

       </el-card>
   </div>
  </el-tab-pane>
</el-tabs>
<el-row type="flex" justify="center" style=" height:80px" align="middel">
<el-pagination background
:total="page.total"
:current-page="page.currentaPage"
:page-size="page.pageSize"
layout="prev,pager,next"
@current-change="changePage"
>
</el-pagination>
</el-row>
<!-- 3.7为了制造弹层  通过visible属性进行true false设置-->
<el-dialog :visible="dialogVisible" @close="dialogVisible=false">
  <!-- 放置一个走马灯组件 -->
 <el-carousel indicator-position="outside" height="400px">
   <!-- 放置幻灯片的循环项  循环当前页的list-->
    <el-carousel-item v-for="item in list" :key="item.id">
      <!-- <h3>{{ item }}</h3> -->
      <img style="width:100%;" :src="item.url" alt="">
    </el-carousel-item>
  </el-carousel>
</el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'collect',
      //   定义list接收全部素材的数据
      list: [],
      //   存放分页信息
      page: {

        currentPage: 1,
        total: 0,
        pageSize: 8
      },
      dialogVisible: false
    }
  },
  methods: {
    // 删除事件
    delMaterial (row) {
    // confirm也是promise格式
      this.$confirm('您确定要删除该图片吗？', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${row.id}`,
          data: {
            collect: !row.is_collected // true or false
          }
        }).then(() => {
        // 成功就重新加载
        // B端场景 可以拉取数据
        // c端场景 如果删除或者修改数据 不会重新拉取数据 只会在前端修改对应的一条数据
          this.getMaterial()
        }).catch(() => {
        // 失败提示消息
          this.$message.error('操作失败')
        })
      })
    },
    // 取消护着收藏
    collectOrCancel (row) {
      this.$axios({
        method: 'put',
        url: `/user/images/${row.id}`,
        data: {
          collect: !row.is_collected // true or false
        }
      }).then(() => {
        // 成功就重新加载
        this.getMaterial()
      }).catch(() => {
        // 失败提示消息
        this.$message.error('操作失败')
      })
    },

    //   上传
    uploadImg (params) {
      const data = new FormData()
      console.log(params)
      data.append('image', params.file)

      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.$message.success('上传成功')
      }).catch(() => {
        this.$message.error('上传失败')
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        method: 'get',
        params: {
        //   collect: false // 获取全部数据（因为collect为false为全部数据）
          // this.activeName === 'collect'成立就true，获取收藏 、反之是false获取全部
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }, // get参数 也就是query参数
        data: {// data参数，也就是body参数

        }
      }).then(result => {
        // debugger
        // 返回的数据赋值到data中
        this.list = result.data.results
        this.page.total = result.data.total_count // 根据页签变化而变化
      })
    },
    changeTab () {
      this.page.currentPage = 1
      // 切换事件中
      //   alert(this.activeName)
      // 根据activeName决定获取啥
      this.getMaterial() // 直接调用获取素材的方法
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
