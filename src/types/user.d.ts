export type userType = {
  id: number | string
  token: string
  account: string
  mobile: number | string
  avatar: string
}

export type codeType =
  | {
      code: string
    }
  | undefined

type OmitInfo = Omit<userType, 'token'>
export type userInfo = OmitInfo & {
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}

//家庭档案
export type patientType = {
  // 患者ID
  id?: string
  // 患者名称
  name: string
  // 身份证号
  idCard: string
  // 0不默认 1默认
  defaultFlag: 0 | 1
  // 0 ⼥ 1 男
  gender: 0 | 1
  // 性别⽂字
  genderValue?: string
  // 年龄
  age?: number
}
