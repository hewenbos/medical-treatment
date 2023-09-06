import axios from '@/utils/request'
import type { Address, OrderPre, DrugInfoResponseType } from '@/types/drug'
//获取收货地址
export const getAddressApi = () => {
  return axios.get<Address[]>('/patient/order/address')
}

//查询药品订单预⽀付信息
export const getOrderPerApi = (id: string) => {
  return axios.get<OrderPre>('/patient/medicine/order/pre', { prescriptionId: id })
}

//创建药品订单
export const getCreateDrugApi = (data: { id: string; addressId: string; couponId?: string }) => {
  return axios.post<{ id: string }>('/patient/medicine/order', data)
}

//获取药品订单详情
export const getDrugDetailApi = (id: string) => {
  return axios.get<DrugInfoResponseType>(`/patient/medicine/order/detail/${id}`)
}
