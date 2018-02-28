<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  
  
  export default {
    name: 'app',
    data() {
      return {
      }
    },
    components: {
      
    },
    mounted(){
    //组件开始挂载时获取用户信息
    this.getUserInfo();
    },
    methods : {
      getUserInfo(){
        console.log("未登录!")
      }
    }
  }
</script>

<style>
  
 
</style>
