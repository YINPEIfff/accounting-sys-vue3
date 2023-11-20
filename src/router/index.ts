import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Layout2 from '../layout/Layout2.vue'
import Dashboard from '@/views/Dashboard.vue'
import Test from '@/views/TestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout2,
      redirect: '/login',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Dashboard
        },
        {
          path:'/customer/list',
          name:'customerList',
          component: import('@/views/management/customer/CustomerList.vue')
        },
        {
          path:'/customer/add',
          name:'customerAdd',
          component: import('@/views/management/customer/CustomerAdd.vue')
        },
        {
          path:'/user/list',
          name: 'userList',
          component: import('@/views/management/user/UserList.vue')
        },
        {
          path: '/user/add',
          name: 'userAdd',
          component: import("@/views/management/user/UserAdd.vue")
        },
        {
          path:'/department/list',
          name:'departmentList',
          component: import("@/views/management/department/DepartmentList.vue")
        },
        {
          path:'/department/add',
          name:'departmentAdd',
          component: import("@/views/management/department/DepartmentAdd.vue")
        },
        {
          path:'/notice/list',
          name:'noticeList',
          component: import('@/views/management/notice/NoticeList.vue')
        },
        {
          path:'/notice/add',
          name:'noticeAdd',
          component: import('@/views/management/notice/NoticeAdd.vue')
        },
        {
          path:'/setting',
          name:'setting',
          component:import('@/views/management/Setting.vue')
        }
      ]
    },
    {
      path:'/login',
      name: 'Login',
      component : Login,
    },
    {
      path:'/register',
      name: 'register',
      component : Register,
    },
    {
      path:'/test',
      name:'test',
      component:Test,
    }
  ]
})

export default router
