import { ConsultType, IllnessTime, ConsultFlag, IllnessType } from '@/enum/couslt'

type Image = {
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
