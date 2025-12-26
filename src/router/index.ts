import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import UserManagerPage from '@/pages/admin/UserManagerPage.vue'
import UserLoginPage from '@/pages/user/UserLoginPage.vue'
import UserRegisterPage from '@/pages/user/UserRegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin/userManagePage',
      name: 'userManagePage',
      component: UserManagerPage
    },
    {
      path: '/user/login',
      name: 'UserLoginPage',
      component: UserLoginPage
    },
    {
      path: '/user/register',
      name: 'UserRegisterPage',
      component: UserRegisterPage
    }
  ]
})

export default router
