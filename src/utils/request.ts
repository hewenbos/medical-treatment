import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse
} from 'axios'
import { showToast } from 'vant'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import type { Data } from '@/types/request'
type TypesConfig = {
  baseURL: string
  timeout: number
}

const requesetConfig: TypesConfig = {
  baseURL: import.meta.env.VITE_APP_API,
  timeout: 4000
}

class Http {
  private services: AxiosInstance

  constructor(requesetConfig: TypesConfig) {
    this.services = axios.create(requesetConfig)
    this.instance()
  }

  instance() {
    this.services.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const user = useUserStore()

        if (user.user?.token) {
          config.headers.Authorization = 'Bearer ' + user.user.token
        }
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )

    this.services.interceptors.response.use(
      (response: AxiosResponse) => {
        if (
          response.data.code !== 10000 &&
          response.data.code !== 400 &&
          response.data.code !== 422
        ) {
          showToast(response.data.message)
          return Promise.reject(response)
        }
        return response.data
      },
      (err) => {
        if (err.response.status == 401) {
          showToast(err.response.data.message)
          const user = useUserStore()
          user.removeToken()
          router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
          return Promise.reject(err)
        }
        if (err.response.status == 413) {
          showToast('图片太大,请再次选择图片')
          return Promise.reject(err)
        }

        return Promise.reject(err)
      }
    )
  }

  //get请求
  get<T>(url: string, params?: object) {
    return this.services.get<T, Data<T>>(url, { params })
  }

  //post请求
  post<T>(url: string, data?: object) {
    return this.services.post<T, Data<T>>(url, data)
  }

  //put请求
  put<T>(url: string, data?: object) {
    return this.services.put<T, Data<T>>(url, data)
  }

  //delete 请求
  delete<T>(url: string, params?: object) {
    return this.services.delete<T, Data<T>>(url, { params })
  }
}

export default new Http(requesetConfig)
