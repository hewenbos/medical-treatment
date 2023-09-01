import { ConsultType, IllnessTime, ConsultFlag, IllnessType } from '@/enum/couslt'

export type Image = {
  id: string
  url: string
}

export type Consult = {
  // 问诊记录ID
  id: string
  // 问诊类型
  type: ConsultType
  // 快速问诊类型，0 普通 1 三甲
  illnessType: IllnessType
  // 科室ID
  depId: string
  // 疾病描述
  illnessDesc: string
  // 疾病持续时间
  illnessTime: IllnessTime
  // 是否就诊过，0 未就诊过 1 就诊过
  consultFlag: ConsultFlag
  // 图⽚数组
  pictures: Image[]
  // 患者ID
  patientId: string
  // 优惠券ID
  couponId: string
}
export type PartialCoulst = Partial<Consult>

//科室数据
export type DepItem = {
  id: '6976485709309804544'
  name: '内科'
}
export type DepListType = DepItem & {
  child: DepItem[]
}

export type PickConsult = Pick<
  PartialCoulst,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>

// 问诊订单预⽀付传参
export type ConsultOrderPreParams = Pick<PartialConsult, 'type' | 'illnessType'>

// 问诊订单预⽀付信息
export type ConsultOrderPreData = {
  // 积分抵扣
  pointDeduction: number
  // 优惠券抵扣
  couponDeduction: number
  // 优惠券ID
  couponId: string
  // 需付款
  payment: number
  // 实付款
  actualPayment: number
}
