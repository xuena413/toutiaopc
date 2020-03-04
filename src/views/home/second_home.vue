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
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583344299440&di=a18fb1eb2471398b2821a808eaec7200&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180211%2F01%2F1518283330-lGzqShHxDA.jpg',
        'http://img4.imgtn.bdimg.com/it/u=2802527010,4286707352&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=472684110,560557193&fm=26&gp=0.jpg']
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
