<template>
  <div class="login">
      <!-- 表单 -->
      <el-card class="login-card">
      <!-- 表单内容 -->
      <div class="header">
          <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 表单 -->
      <el-form :model="loginForm" :rules="loginRules">
          <!-- 表单容器 -->
          <el-form-item prop="mobile">
              <!-- 表单域 -->
            <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
          </el-form-item>
            <el-form-item prop="code">
              <!-- 表单域2-->
            <el-input style="width:60%" placeholder="验证码" class="yanzheng" v-model="loginForm.code"></el-input>
             <el-button style="width:35% ;float:right" plain>验证码</el-button>
          </el-form-item>
           <el-form-item style="margin:10px 0">
                <el-checkbox  style="color:#FFF" v-model="loginForm.checked">同意阅读同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
            <el-form-item prop="checked">
                <el-button type="primary" style="width:100%" @click="jump">登录</el-button>
          </el-form-item>
      </el-form>
      </el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // checked: true
      // 1.登录表单的数据准备
      loginForm: {
        mobile: '',
        code: '',
        checked: false
      },
      loginRules: {
        mobile: [{ required: true, message: '您的手机号不能为空' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '你的手机号格式不正确'
          }],
        code: [{ required: true, message: '您的验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }],

        checked: [{
        // rule:当前的校验规则
        // value：当前要校验的字段的值
        // callback是一个回调函数，不论成功还是失败都要调用
          validator: function (rule, value, callback) {
            value ? callback() : callback(new Error('您必须同意我们的条约'))
          }
        }]
      }
    }
  },
  methods: {
    jump () {
      // this.$router.push('/home')
      // 方式1：回调函数
      // this.$refs.loginForm.validate(function (isOK) {
      //   if (isOK) {
      //     console.log('校验通过')
      //   } else {
      //     console.log('校验未通过')
      //   }
      // })
      // 方式2 promise
      this.$refs.loginForm.validate().then(() => {
        // 校验通过会执行then后面的语句
        // console.log(111)
        // this.$axios.get/post/delete/put
        this.$axios({
          url: '/authorizations',
          data: this.loginForm,
          method: 'post'
        }).then(result => {
          window.localStorage.aetItem('user-token', result.data.data.token)
          this.$router.push('/home')
        }).catch(() => {
          this.message.error('用户名或者密码错误')
        })
      })
    }
  }

}
</script>

<style lang="less" scoped>
.login{
    background-image: url('../../assets/img/timg.jpg');
    height:100vh;
    background-size: cover;

    //  filter: blur(1.3px);
     display: flex;
    justify-content:flex-end;
    align-items: center;

.login-card{
    //  opacity: 0.7;
    width: 440px;
    height: 320px;
    background-color:rgba(0,0,0,0.3);
    margin-right:28%;
    .header{
        text-align: center;
         margin-bottom:15px;
        img{
            height: 40px;
        }
    }

}

}

</style>
