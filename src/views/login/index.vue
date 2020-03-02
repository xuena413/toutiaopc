<template>
  <div class="login">
      <!-- 表单 -->
      <el-card class="login-card">
      <!-- 表单内容 -->
      <div class="header">
          <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 表单 -->
      <el-form>
          <!-- 表单容器 -->
          <el-form-item>
              <!-- 表单域 -->
            <el-input placeholder="请输入手机号"></el-input>
          </el-form-item>
            <el-form-item>
              <!-- 表单域2-->
            <el-input style="width:60%" placeholder="验证码" class="yanzheng"></el-input>
             <el-button style="width:35% ;float:right" plain>验证码</el-button>
          </el-form-item>
           <el-form-item style="margin:10px 0">
                <el-checkbox v-model="checked" style="color:#FFF">同意阅读同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
            <el-form-item>
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
      checked: true

    }
  },
  methods: {
    jump () {
      this.$router.push('/home')
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
