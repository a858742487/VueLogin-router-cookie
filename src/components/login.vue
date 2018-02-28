<template>
  <div id="login">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">立即登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    components: {

    },
    methods: {
      login() {
          this.toLogin();
      },
      toLogin() {
        setTimeout(() => {
          //登录状态15天后过期
          let expireDays = 1000 * 60 * 60 * 24 * 15;
          this.setCookie('session', 'blablablablabla...', expireDays);
          this.isLoging = false;
          //登录成功后
          this.$router.push('/user_info');
        }, 300)
      }
    }
  }

</script>

<style>
  #login {
    width: 800px;
    margin: 0 auto;
    margin-top: 100px;
  }

</style>
