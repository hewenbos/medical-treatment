import router from '@/router'
import { useUserStore } from '@/stores/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
router.beforeEach((to) => {
  const useStore = useUserStore()
  NProgress.start()
  const wihteList = ['/login', '/register']

  if (!useStore.user?.token && !wihteList.includes(to.path)) return '/login'
})

router.afterEach((to) => {
  document.title = '优医问诊 - ' + to.meta.title
  NProgress.done()
})
