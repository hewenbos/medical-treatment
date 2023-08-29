import axios from '@/utils/request'
import type { patientType } from '@/types/user'
export const getUserPatientApi = () => {
  return axios.get<patientType[]>('/patient/mylist')
}

//添加患者
export const getAddPatientApi = (data: patientType) => {
  return axios.post('/patient/add', data)
}

//编辑患者
export const getEditPatientApi = (data: patientType) => {
  return axios.put('/patient/update', data)
}

//删除换装
export const getDelPatientApi = (id: string) => {
  return axios.delete('/patient/del/' + id)
}
