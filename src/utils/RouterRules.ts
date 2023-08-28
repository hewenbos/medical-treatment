import router from '@/router'
import { useUserStore } from '@/stores/user'

router.beforeEach((to) => {
  const useStore = useUserStore()
  const wihteList = ['/login', '/register']
  document.title = '优医问诊 - ' + to.meta.title
  if (!useStore.user?.token && !wihteList.includes(to.path)) return '/login'
})
