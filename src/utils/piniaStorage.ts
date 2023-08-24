import type { PiniaPluginContext } from 'pinia'

import { toRaw } from 'vue'

const __piniaName__ = 'HC_PINIA'

const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getStorage = (key: string) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}

const storeStorage = (key?: string) => {
  return (content: PiniaPluginContext) => {
    const { store } = content

    const data = getStorage(`${key ? key : __piniaName__}-${store.$id}`)
    store.$subscribe(() => {
      console.log(store)
      setStorage(`${key ? key : __piniaName__}-${store.$id}`, toRaw(store.$state))
    })

    return data
  }
}

export default storeStorage
