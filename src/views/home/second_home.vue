<template>
  <div class="second-home">home的二级组件
      <template>
  <el-carousel :interval="4000" type="card" height="500px">
    <el-carousel-item v-for="item in list" :key="item">
      <img :src="item" alt="" style="width:100%">
    </el-carousel-item>
  </el-carousel>
</template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=189058891,1491055887&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2355332879,4115290422&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2171073523,1991282945&fm=26&gp=0.jpg']
    }
  }

}
</script>

<style>

.second-home{
   /* calc 计算的意思 在css中计算数值 用法  calc ( 四则运算  ) 变量之间 和运算符之间一定要有空格 */
  height: calc(100vh - 100px);
  background-size: cover;
  /* background-image: url("https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4058434654,7580487&fm=26&gp=0.jpg"); */
}
</style>
