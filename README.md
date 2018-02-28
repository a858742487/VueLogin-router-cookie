
### [基于Vue.js登录页面的过程（vue-router+cookie）简单版](https://juejin.im/post/5a9511ecf265da4e95190f3b)
基于Vue.js登录页面的过程（vue-router+cookie）简单版
> *   技术栈：
> *   vue.js 主框架
> *   vuex 状态管理
> *   vue-router 路由管理

## 一般过程
在一般的登录过程中，一种前端方案是：    
- [ ] 1、检查状态：进入页面时或者路由变化时先判断是否有登录状态(保存在cookie或者本地存储的值)；
- [ ] 2、如果有登录态则查询登录信息(uid，头像等...)并保存起来；如果没有则跳转到登录页；

># 如果未登录的话
- [ ]  1、在登录页面（或者登录框），校检用户输入信息是否合法；（检测表单正则是否合法）

- [ ] 2、校检成功后发送登录请求；校检不成功则反馈给用户；

- [ ] 3、登录成功则从后端数据中取出session信息保存登录状态(可能需要跳转);登录不成功则提示用户不成功；

> 用户做出注销操作时删除登录状态。（判断cookie是否存在）
- [ ] 1、在此之前已经写好了两个页面，假设登录页面路由为/login，登录后的路由为/userinfo。这样只需要在App.vue放好router-view用于存放和渲染这两个路由。

```python
// App.vue

<template>  
   <div id="app">    
       <router-view/>  
   </div>
</template>
```
并做好vue-router配置:  

```python
// router/index.js

import Vue from 'vue'import Router from 'vue-router'import login from '@/components/login'import UserInfo from '@/components/userinfo'

Vue.use(Router)
export default new Router({
//设置两个页面,未登录跳转login  登录后跳转 user_info
//靠本地cookie来判断是否登录    routes: [{      path: '/login',      component: login    }, {      path: '/user_info',      component: UserInfo    }]
})

```
 
## 1.检查状态与跳转 (已经登录)
怎么来判断是否登录过呢?就是靠 main.js 里面的 checkLogin() 方法

我们需要检查状态：

1.用户打开页面时；
2.路由发生变化时；
首先需要写好一个检查登录态的方法checkLogin：

```python
// main.js

Vue.prototype.getCookie = getCookie;/* eslint-disable no-new */new Vue({  el: '#app',  router,  template: '<App/>',  components: { App, ElementUI},  watch: {
     //监测router  检测网址、地址栏变化  路由发生变化时
     "$route": 'checkLogin'  },  created() {
    // Vue生命周期 上来就一顿执行    this.checkLogin();  },  methods: {    checkLogin() {      //检查是否存在session      //cookie操作方法在源码里有或者参考网上的即可      if (!this.getCookie('session')) {        //如果没有登录状态则跳转到登录页        this.$router.push('/login');      } else {        //否则跳转到登录后的页面        this.$router.push('/user_info');      }    }  }})

```

至此，我们就完成了一般过程中的第1步。(假如说有cookie登录成功了) 登录成功就跳转到 

```python
this.$router.push('/user_info');
```
如果没登录成功就跳转到 Login.vue   登录页方法如下    (监测到还未登录)输入校验和发送登录请求为了防止一些不符合预期的字符和过于频繁的请求传到后台，前端要对用户的输入进行校验和防止重复请求。当然不同网站的合法字符不一样，这里只做为空时不合法的校验：

```python

// login.vue
<template>  <div id="login">    <el-form ref="form" :model="form" label-width="80px">      <el-form-item label="账号">        <el-input v-model="form.name"></el-input>      </el-form-item>      <el-form-item>        <el-button type="primary" @click="login">立即登录</el-button>        <el-button>取消</el-button>      </el-form-item>    </el-form>  </div></template>


methods: {
      //点击执行立即登录执行 login 方法      login() {
          //调用登录方法,存储cookie
          //这里可以判断一下 if(this.form=="") input里面的值是否为空          this.toLogin();      },      toLogin() {        setTimeout(() => {          //登录状态15天后过期          let expireDays = 1000 * 60 * 60 * 24 * 15;
          //存储本地Cookie          this.setCookie('session', 'blablablablabla...', expireDays);          this.isLoging = false;          //登录成功

```

执行登录成功,跳转到 user_info.vue 就证明登录成功啦.

### 本文参考  [Vue.js写一个SPA登录页面的过程](https://www.jianshu.com/p/eff145fb815b)
