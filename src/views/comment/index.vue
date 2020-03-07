<template>
  <!-- <div>评论页面</div> -->
  <el-card>
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
          <!-- 可以放组件 -->
          <el-button type=text size='small'>修改</el-button>
            <el-button type=text size='small'>关闭评论</el-button>
        </el-table-column>
      </el-table>
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
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        // query是专门传get参数也就get参数get=> params
        // data传body参数也就是请求体参数post=>data
        params: {
          response_type: 'comment'
        }

      }).then(result => {
        console.log(result)
        this.list = result.data.results
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
    }
  },

  created () {
    this.getComment()
  }

}
</script>

<style>

</style>
