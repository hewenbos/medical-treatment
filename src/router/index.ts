import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Layout/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register/index.vue')
    },
    {
      path: '/',
      name: 'HMOE',
      component: Home,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('../views/child/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: 'article',
          component: () => import('../views/child/Article/index.vue'),
          meta: { title: '健康百科' }
        },
        {
          path: 'notify',
          component: () => import('../views/child/Notify/index.vue'),
          meta: { title: '消息中心' }
        },
        {
          path: 'user',
          component: () => import('../views/child/User/index.vue'),
          meta: { title: '个人中心' }
        }
      ]
    }
  ]
})

export default router
