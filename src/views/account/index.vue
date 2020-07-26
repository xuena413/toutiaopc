<template>
  <el-card>
      <!-- 账户信息的头部 -->
      <bread-crumb slot="header">
     <template slot="title">
         账户信息
     </template>
      </bread-crumb>
      <el-form ref="myForm" :model="formData" :rules="rules" label-width="100px">
          <!-- 表单域 -->
          <el-form-item prop="name" label="用户名">
              <el-input v-model="formData.name" style="width:30%"></el-input>
          </el-form-item>
          <el-form-item label="简介">
               <el-input v-model="formData.intro" style="width:30%"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email" style="width:30%"></el-input>
         </el-form-item>
          <el-form-item label="手机号">
              <!-- 手机号可以看但是手机号不能改 因为手机号是登录的必需字段-->
               <el-input v-model="formData.mobile" disabled style="width:30%"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="saveUser" >保存</el-button>
          </el-form-item>

      </el-form>
      <!-- <img class="head-upload" src="../../assets/img/user.jpg" alt="#"> -->
      <img class="head-upload" :src="formData.photo ? formData.photo:defaultImg" alt="#">
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 7, message: '用户名的长度为1-7位', trigger: 'blur' }
        ],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确', trigger: 'blur' }
        ]

      },
      defaultImg: require('../../assets/img/user.jpg') // 头像变量
    }
  },
  methods: {
    // --------------------------------- 获取用户个人信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data // 将数据赋值给表单数据
      })
    },
    // ----------------------------------保存用户
    saveUser () {
      // 手动校验表单结构   validate 校验form表单  回调模式和promise模式
      this.$refs.myForm.validate().then(() => {
        // 如果校验成功，会进入then
        // 调用保存接口
        this.$axios({
          url: '/user/profile',
          methods: 'patch', // 类型
          data: this.formData
        }).then(() => {
          this.$message.success('保存用户信息成功')
        }).catch(() => {
          this.$message.error('保存用户信息失败')
        })
      })// 调用方法
    }
  },
  created () {
    this.getUserInfo()
  }

}
// 定义数据 调取数据 赋值
</script>

<style>
.head-upload{
    position: absolute;
    right:500px;
    top:200px;
    width:200px;
    height:200px;
    border-radius: 50%;
}

</style>
