import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import UserInfo from '@/components/userinfo'





Vue.use(Router)

export default new Router({
    routes: [{
      path: '/login',
      component: login
    }, {
      path: '/user_info',
      component: UserInfo
    }]

})
