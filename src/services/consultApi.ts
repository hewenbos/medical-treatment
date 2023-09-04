import axios from '@/utils/request'
import type {
  DepListType,
  Image,
  ConsultOrderPreParams,
  ConsultOrderPreData,
  PartialCoulst,
  ConsultOrderPage
} from '@/types/couslt'
import type { searchKnowledge } from '@/types/knowledge'
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

//同一下单接口
export const getPatientOrderApi = (data: PartialCoulst) => {
  return axios.post<{ id: string }>('/patient/consult/order', data)
}

//支付接口
export const getPayMenoyApi = (data: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => {
  return axios.post<{ payUrl: string }>('/patient/consult/pay', data)
}

//问诊记录
export const getConsultListApi = (params: searchKnowledge) => {
  return axios.get<ConsultOrderPage>('/patient/consult/order/list', params)
}

//删除订单
export const getDelConsultApi = (id: string) => {
  return axios.delete('/patient/order/' + id)
}

//取消订单
export const getCancelConsultApi = (id: string) => {
  return axios.put('/patient/order/cancel/' + id)
}
