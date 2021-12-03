import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/user/login' },
    { 
      path: '/user/login', 
      name: 'Login', 
      component: Login 
    },
    { 
      path: '/user/forget', 
      name: 'ForgetPassword', 
      component: () => import('@/pages/forget/index')
    },
    { path: '/layout',
      name: 'Layout',
      component: () => import('@/pages/Layout'),
      redirect: {name: 'Editor'},
      children: [
        {
          path: '/editor',
          name: 'Editor',
          component: () => import('@/pages/editors/index')
        },{
          path: '/tempalate',
          name: 'myTemplate',
          component: () => import('@/pages/template/index')
        },{
          path: '/square',
          name: 'Square',
          component: () => import('@/pages/square/index')
        },{
          path: '/user',
          name: 'userManage',
          component: () => import('@/pages/user/index')
        }

      ]
    }
  ]
})
