import axios from '@/utils/request'
import type { DepListType, Image, ConsultOrderPreParams, ConsultOrderPreData } from '@/types/couslt'
import type { patientType } from '@/types/user'
export const getConsultDepApi = () => {
  return axios.get<DepListType[]>('/dep/all')
}

//上传图片
export const getUpLoadApi = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return axios.post<Image>('/upload', fd)
}

//预支付信息
export const getorderPerApi = (PayParams: ConsultOrderPreParams) => {
  return axios.get<ConsultOrderPreData>('/patient/consult/order/pre', PayParams)
}

//患者信息
export const getPatientInfoAPI = (id: string) => {
  return axios.get<patientType>('/patient/info/' + id)
}
