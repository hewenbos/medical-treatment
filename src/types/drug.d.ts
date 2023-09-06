//收货地址接口类型
export type Address = {
  // 地址ID
  id: string
  // 联系⽅式
  mobile: string
  // 收件⼈
  receiver: string
  // 省
  province: string
  // 市
  city: string
  // 区
  county: string
  // 详细地址
  addressDetail: string
}

//预支付接口返回类型
export type OrderPre = {
  // 处⽅ID
  id: string
  // 优惠券ID
  couponId: string
  // 积分抵扣
  pointDeduction: number
  // 优惠券抵扣
  couponDeduction: number
  // 应付款
  payment: number
  // 邮费
  expressFee: number
  // 实付款
  actualPayment: number
  // 药品订单
  medicines: Medical[]
}

export type Medical = {
  amount: string
  avatar: string
  id: string
  name: string
  prescriptionFlag: number
  quantity: number
  specs: string
  usageDosag: string
}

//药品订单详情
export type DrugInfoResponseType = {
  id: string
  orderNo: string
  type: 4
  createTime: string
  prescriptionId: string
  status: OrderType
  statusValue: string
  medicines: Medical[]
  countDown: number
  addressInfo: Address
  expressInfo: {
    content: string
    time: string
  }
  payTime: string
  paymentMethod?: 0 | 1
  payment: number
  pointDeduction: number
  couponDeduction: number
  payment: number
  expressFee: number
  actualPayment: number
  roomId: string
}
