import axios from '@/utils/request'
import type { ILogin, Icode, IcodeLogin } from '@/types/Login'
import type { userInfo } from '@/types/user'
//登录接口
export const getloginApi = <T>(data: ILogin) => {
  return axios.post<T>('/login/password', data)
}

//获取短信验证码
export const getCodeApi = <T>(data: Icode) => {
  return axios.get<T>('/code', data)
}

//验证码登录
export const getCodeLoginApi = <T>(data: IcodeLogin) => {
  return axios.post<T>('/login', data)
}

//获取用户信息
export const getUserInfoApi = () => {
  return axios.get<userInfo>('/patient/myUser')
}
