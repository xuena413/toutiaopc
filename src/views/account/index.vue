<template>
  <el-card>
      <!-- 账户信息的头部 -->
      <bread-crumb slot="header">
     <template slot="title">
         账户信息
     </template>
      </bread-crumb>
      <el-form label-width="100px">
          <!-- 表单域 -->
          <el-form-item label="用户名">
              <el-input style="width:30%"></el-input>
          </el-form-item>
          <el-form-item label="简介">
               <el-input style="width:30%"></el-input>
          </el-form-item>

          <el-form-item label="邮箱">
              <el-input style="width:30%"></el-input>
         </el-form-item>
          <el-form-item label="手机号">
              <!-- 手机号可以看但是手机号不能改 因为手机号是登录的必需字段-->
               <el-input disabled style="width:30%"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary"  >保存</el-button>
          </el-form-item>

      </el-form>
      <img class="head-upload" src="../../assets/img/user.jpg" alt="#">
  </el-card>
</template>

<script>
export default {

}
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
