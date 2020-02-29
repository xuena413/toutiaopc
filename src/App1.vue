<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button @click="dianji" type="primary" round :loading="loading">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
      </el-row>
      <div>今日商品剩余数量：{{number}}  <el-button @click="add" type="success">增加1</el-button></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      number: 100,
      loading: false
    }
  },
  methods: {
    dianji () {
      console.log(1)
      this.loading = true
    },
    add () {
      this.number++
    }

  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
