import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { userType } from '@/types/user'
export const useUserStore = defineStore('my-user', () => {
  const user = ref<userType>()
  const removeToken = () => {
    user.value = undefined
  }
  const setToken = (data: userType) => {
    user.value = data
  }

  return { user, removeToken, setToken }
})
