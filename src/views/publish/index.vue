<template>
   <el-card>
       <bread-crumb slot="header">
       <template slot="title">发布文章</template>
       </bread-crumb>
       <el-form ref="myForm" :model="publishForm" :rules="publishRules" style="margin-left:50px"  label-width="100px" >
           <el-form-item label="标题" prop="title">
           <el-input v-model="publishForm.title"
           style="width:70%" placeholder="请输入您的标题"></el-input>
           </el-form-item>

            <el-form-item  label="内容" prop="content">
              <el-input v-model="publishForm.content" type='textarea' placeholder="请输入您的内容" :rows="4" ></el-input>
           </el-form-item>

            <el-form-item label="封面" prop="cover">
               <el-radio-group v-model="publishForm.cover.type">
                 <el-radio :label="1">单图</el-radio>
                 <el-radio :label="3">三图</el-radio>
                 <el-radio :label="0">无图</el-radio>
                 <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
           </el-form-item>
           <el-form-item label="频道" prop="channel_id">
                 <el-select  placeholder="请选择频道" v-model="publishForm.channel_id">
                     <!-- label是显示值 value是保存值 -->
                     <el-option v-for="item in channels" :key="item.id"
                     :value="item.id"
                     :label="item.name"></el-option>
                 </el-select>
           </el-form-item>
           <el-form-item>
               <!-- boolean代表是不是草稿 -->
                <el-button @click="publish(false)" type="primary">发表</el-button>
                <el-button @click="publish(true)">存入草稿</el-button>
           </el-form-item>
       </el-form>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数据
      publishForm: {
        title: '',
        content: '',
        cover: {
          type: 0, // 无图是0 单图是1 三图是3 -1是自动
          images: [] // 字符串数组 对应type 假如 type=1 images有一个值
        },
        channel_id: null // 频道的id
      },
      // 发布表单的校验规则
      publishRules: {
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' }, {
          min: 5, max: 30, message: '标题应该在5~30字符长度之间', trigger: 'blur'
        }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '文章频道不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getArticleById (id) {
      this.$axios({
        url: `/articles/${id}` // 请求地址
      }).then((result) => {
        this.publishForm = result.data // 将数据赋值给表单数据
      })
    },
    // 表单的手动校验
    publish (draft) {
      // this.$ref 来获取el-form实例 调用validate方法 自动校验
      // 方法一：校验通过就调用接口
    //   this.$ref.myForm.validate(function (isOK) {
    //     if (isOk) {
    //     }
    //   })

      this.$refs.myForm.validate().then(() => {
        const { articleId } = this.$route.params // id存在/不存在的时间执行不同的操作
        this.$axios({
          url: articleId ? `/articles/${articleId}` : '/articles',
          method: articleId ? 'put' : 'post', // 根据场景决定用什么类型
          params: { draft },
          data: this.publishForm// 请求体参数

        }).then(() => {
          this.$message.success('修改成功')
          // 发布成功后页面跳转
          this.$router.push('/home/articles')
        }).catch(() => {
          this.$message.error('修改失败')
        })
      })
      // if (articleId) {
      //   this.$axios({
      //     url: `/articles/${articleId}`,
      //     method: 'put',
      //     params: { draft },
      //     data: this.publishForm// 请求体参数

      //   }).then(() => {
      //     this.$message.success('修改成功')
      //     // 发布成功后页面跳转
      //     this.$router.push('/home/articles')
      //   }).catch(() => {
      //     this.$message.error('修改失败')
      //   })
      // } else {
      // //   进了then就是校验成功了
      //   this.$axios({
      //     url: '/articles', // 请求地址
      //     method: 'post', // 请求方式
      //     params: { draft: draft }, // query参数
      //     data: this.publishForm // body参数

      //   }).then(() => {
      //     this.$message.success('发布成功')
      //     // 发布成功后页面跳转
      //     this.$router.push('/home/articles')
      //   }).catch(() => {
      //     this.$message.error('发布失败')
      //   })
      // }
    },

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
    console.log(this.$route.params)
    const { articleId } = this.$route.params // 这里的这个解构函数不是很懂
    // if (articleId) {
    //   this.getArticleById(articleId)
    // }
    articleId && this.getArticleById(articleId) // &&前面为true才会执行后面的逻辑
  }

}
</script>

<style>

</style>
