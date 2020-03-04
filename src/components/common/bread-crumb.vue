 <template>
 <!-- 面包屑组件的代码 -->
 <!-- 使用面包屑 -->
 <!-- --------------------------3.设置分隔符 -->
  <el-breadcrumb separator=">">
      <!------------------------2.其中to相当于router-link标签 -->
  <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
  <!-- 内容是动态的 -->
   <el-breadcrumb-item>
       <!---------------------- 1.用插槽挖坑  谁用谁填-->
       <slot name="title"></slot>

   </el-breadcrumb-item>

</el-breadcrumb>
 </template>

<script>
export default {

}
</script>

 <style>

 </style>
