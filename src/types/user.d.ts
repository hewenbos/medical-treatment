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
