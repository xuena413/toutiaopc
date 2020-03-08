<template>
  <!-- <div>评论页面</div> -->
  <el-card v-loading="loading">
      <!-- bread-crumb本身也有插槽 header是头部-->
      <bread-crumb slot="header">
      <!-- slot=title 表示评论管理给面包屑的chacao -->
     <template slot="title">
         评论管理
        </template>
      </bread-crumb>
      <el-table :data="list">
          <!-- prop表示显示的字段 -->
        <el-table-column prop="title" width="600" label="标题"></el-table-column>
        <!-- 给该列formatter属性用来格式化内容 -->

        <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="操作">
          <!-- 3.4 最后一点 作用域插槽    自定义列模板  传出slot-scope-->
          <!-- el-table-column 在插槽中传出了 row $index store column -->
          <!-- 可以放组件 -->
          <template slot-scope="obj">
          <!-- 3.4.1给按钮注册事件 -->
          <el-button type=text size='small'>修改</el-button>
          <!-- 根据评论状态决定其打开关闭 -->
            <el-button @click="openOrClose(obj.row)" size='small'>{{obj.row.comment_status?'close':'open'}}评论</el-button>
            </template>
        </el-table-column>
      </el-table>

      <!-- 加分页功能 -->
      <!-- 前按钮 页码 后按钮 -->
      <el-row style="height:80px" type='flex' align="middle" justify="center">
          <el-pagination
      :background="true"
    layout="prev, pager, next"
    :total="page.total"
    :current-page="page.currentPage"
    :page-size="page.pageSize"
@current-change=" changePage"
    >
  </el-pagination>
      </el-row>

  </el-card>
</template>

<script>
// 假数据
// export default {
//   data () {
//     return {
//       list: [{ id: 1, name: '望京', date: '2020年3月4日' },
//         { id: 1, name: '西二旗', date: '2020年3月4日' },
//         { id: 1, name: '中关村', date: '2020年3月4日' },
//         { id: 1, name: '国贸', date: '2020年3月4日' },
//         { id: 1, name: '丰台科技园', date: '2020年3月4日' }]
//     }
//   }

// }
export default {
  data () {
    return {
      // 分页组件的数据单独放置一个对象中
      page: {
        total: 0, // 默认0
        currentPage: 10,
        pageSize: 10
        // 决定页码的数量
      },
      list: [],
      loading: false
    }
  },
  methods: {
    changePage (nowPage) {
      // alert(nowPage)
      this.page.currentPage = nowPage
      this.getComment()
    },
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles',
        // query是专门传get参数也就get参数get=> params
        // data传body参数也就是请求体参数post=>data
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize

        }

      }).then(result => {
        // console.log(result)
        this.list = result.data.results
        this.page.total = result.data.total_count // 将总数赋值
        this.loading = false
      })
    },
    formatterBool (row, column, cellValue, index) {
    // ------------------------- 第一步
      // row代表一行数据
      // column代表当前的列信息
      // cellValue代表当前的单元格的值
      // index代表当前的索引
      // 根据bool值决定状态的显示打开或者关闭
      // ------------------------- 第2步
      // return '1111'
      return cellValue ? 'nomal' : 'close'
    },
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      // 3.1.2$confirm支持promise 点击确定会进入then，点击取消会进入到catch
      this.$confirm(`是否决定${mess}评论状态`, '提示').then(() => {
        this.$axios({
          url: '/comments/status', // 请求地址
          method: 'put',
          params: {
            article_id: row.id.toString() // 最后一步将大数字转化为字符串
          },
          data: {
            // body参数
            // allow_comment:    打开与关闭  此状态和评论的状态相反
            allow_comment: !row.comment_status
          }
        }).then(() => {
          // 成功 =》提示消息，重新拉取数据
          this.$message.success(`${mess}成功`)
          // 重新拉取数据
          this.getComment()
        }).catch(() => {
          // 失败
          this.$message.error(`${mess}失败`)
          // 改变状态时间 受到id的大数字问题影响
        })
      })
    }
  },

  created () {
    this.getComment()
  }

}
</script>

<style>

</style>
