<template>
  <el-card class="articles">
     <bread-crumb slot="header">
     <template slot='title'>文章列表 </template>
     </bread-crumb>
     <!-- 表单容器 -->
         <!-- {{value}} -->
     <el-form>
<!-- {{searchForm}} {{channels}} -->
 <!-- {{searchForm}} -->
          <el-form-item label="文章状态：">
             <!--监听方式一： <el-radio-group  v-model="searchForm.status" @change="changeCondition"> -->
                 <el-radio-group  v-model="searchForm.status" >
                 <!-- :label是后面的值不会加引号 =======？？？？？？-->
                <el-radio :label="5">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核通过</el-radio>
                <el-radio :label="3">审核失败</el-radio>
             </el-radio-group>
         </el-form-item>
         <el-form-item label="频道列表：">
             <!-- <el-select @change="changeCondition"  placeholder="请选择频道" v-model="searchForm.channel_id"> -->
                 <el-select   placeholder="请选择频道" v-model="searchForm.channel_id">
               <!-- 下拉选项 -->
               <!-- el-option是下拉的选项 label是显示值 value是绑定的值 -->
                <el-option v-for="item in channels" :key="item.id"
                 :label="item.name" :value="item.id">
                 </el-option>
             </el-select>
         </el-form-item>
         <el-form-item label="日期范围：">
             <!-- <el-date-picker @change="changeCondition" type="daterange" value-format="yyyy-MM-dd" v-model="searchForm.dateRange"> -->
<el-date-picker   type="daterange" value-format="yyyy-MM-dd" v-model="searchForm.dateRange">

             </el-date-picker>
         </el-form-item>
     </el-form>
     <!-- 文章主体结构 -->
      <el-row class="total" type="flex" align="middle">
        <span class="t">共找到1000条符合条件的内容</span>
      </el-row>
      <!-- 作为一个循环项 -->
      <div class="article-item" v-for="item in list" :key="item.id.toString()">
         <div class="left"  >
              <img :src="item.cover.images.length? item.cover.images[0] : defaultImg " alt="">
              <div class="info">
                <span>{{item.title}}</span>
                   <!-- <el-tag :type="item.status" class="tag">{{item.status}}</el-tag> -->
                 <el-tag :type="item.status|filterType" class="tag">{{item.status | filterStatus}}</el-tag>
                <span class="date">{{item.pubdate}}</span>
              </div>
         </div>
          <div class="right"  >
            <!-- 事件绑方法的方法1 -->
           <!-- <span @click="toPublish"> <i class="el-icon-edit"></i>   修改</span> -->
             <!-- 事件绑方法的方法2-->
             <span @click="$router.push(`/home/publish/${item.id.toString()}`)"> <i class="el-icon-edit"></i>   修改</span>
           <span @click="delMaterial(item.id.toString())"> <i class="el-icon-delete"></i> 删除</span>
          </div>
      </div>
      <el-row type="flex" justify="center" style="height:80px" align="middel">
<el-pagination background :current-page="page.currentPage"
:page-size="page.pageSize"
:total="page.total"
   @current-change="changePage"
 layout="prev,pager,next">

</el-pagination>
      </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      //   value: '2'
      // 定义表单对象
      searchForm: {
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 / 先将 5 定义成 全部
        status: 5, // 默认为全部
        channel_id: null,
        dateRange: []
      },
      channels: [],
      list: [],
      defaultImg: require('../../assets/img/timg22.jpg')

    }
  },
  watch: {
    searchForm: {
      // 会深度检测
      deep: true, // 会深度检测
      // 当变化的时间会调用
      handler () {
        // alert(1111)  统一调用改变条件的方法
        this.page.currentPage = 1 // 只要条件变化就变成第一页
        this.changeCondition()
      }
    }
  },
  // mounted () {
  //   setInterval(() => {
  //     this.searchForm.status = 5
  //   }, 500)
  // },
  methods: {
    toPublish () {
      this.$router.push('/home/publish')
    },
    // 删除素材方法
    delMaterial (id) {
      this.$confirm('您确定删除此条数据吗', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `articles/${id}` // 地址是 /articles/:target target是文章的id

        }).then(() => {
          // this.getArticles() //舍弃了当前条件因此不可
          this.changeCondition() // 重新带条件删除
          // this.$message.success('删除文章成功')
        }).catch(() => {
          this.$message.error('删除文章失败')
        })
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      // const params = {
      //   page:this.page.currentPage,
      //   per_page:this.page.pageSize
      //   status: this.searchForm.status === 5 ? null : this.searchForm.status, // 5是前端虚构的
      //   channel_id: this.searchForm.channel_id,
      //   begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
      //   end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      // }
      this.changeCondition()
    },
    // changeCondition1 () {
    //   因为此方法里面填的和下面的一样因此不需要重复写
    // },
    // 改变了条件
    changeCondition () {
      // 当触发此方法的时候，表单数据已经变成最新的了
      // 组装条件
      // alert(this.searchForm.status)
      const params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status, // 5是前端虚构的
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }

      // this.$axios({
      //   url: '/articles',
      //   params
      // }).then(result => {
      //   this.list = result.data.results
      // })
      // 因为方法一样所以直接调用
      this.getArticles(params)
    },
    getChannels () {
      this.$axios({
        url: '/channels'
        // 默认是get类型 所以不用写了
      }).then((result) => {
        this.channels = result.data.channels
      })
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params: params
      }).then((result) => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }

  },
  created () {
    // 获取频道接口返回的数据
    this.getChannels() // 在钩子函数中调用
    this.getArticles()
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }

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
           width: 80px;
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
      padding-right:50px;
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
