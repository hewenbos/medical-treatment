import { defineStore } from 'pinia'

export const useUserStore = defineStore('my-user', {
  state: () => {
    return {
      num: 1
    }
  },
  getters: {},
  actions: {}
})
