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
    },
    {
      path: '/user/patient',
      name: 'patient',
      component: () => import('../views/child/Patient/index.vue'),
      meta: { title: '个人中心 - 家庭档案' }
    },
    {
      path: '/consult/fast',
      name: 'fast',
      component: () => import('../views/child/consult/ConsultFast.vue'),
      meta: { title: '急速问诊' }
    },
    {
      path: '/consult/dep',
      name: 'dep',
      component: () => import('../views/child/consult/ConsultDep.vue'),
      meta: { title: '选择科室' }
    },
    {
      path: '/consult/illness',
      name: 'illness',
      component: () => import('../views/child/consult/ConsultIllness.vue'),
      meta: { title: '健康档案' }
    },
    {
      path: '/consult/pay',
      name: 'pay',
      component: () => import('../views/child/consult/ConsultPay.vue'),
      meta: { title: '问诊支付' }
    },
    {
      path: '/user/consult',
      name: 'user',
      component: () => import('../views/child/userConsult/index.vue'),
      meta: { title: '问诊记录' }
    },
    {
      path: '/room',
      name: 'room',
      component: () => import('../views/child/Room/index.vue'),
      meta: { title: '问诊室' }
    },
    {
      path: '/user/consult/:id',
      name: 'detail',
      component: () => import('../views/child/userConsult/UserConsult.vue'),
      meta: { title: '问诊详情' }
    },
    {
      path: '/drug/order',
      name: 'drug',
      component: () => import('../views/child/DrugOrder/index.vue'),
      meta: { title: '药品支付' }
    },
    {
      path: '/order/pay/result',
      name: 'result',
      component: () => import('../views/child/PayResult/index.vue'),
      meta: { title: '订单支付成功' }
    }
  ]
})

export default router
