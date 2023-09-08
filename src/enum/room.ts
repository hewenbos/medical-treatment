// 消息类型
export enum MsgType {
  // ⽂字聊天
  MsgText = 1,
  // 消息聊天
  MsgImage = 4,
  // 患者信息
  CardPat = 21,
  // 处⽅信息
  CardPre = 22,
  // 未评价信息
  CardEvaForm = 23,
  // 已评价信息
  CardEva = 24,
  // 通⽤通知
  Notify = 31,
  // 温馨提示
  NotifyTip = 32,
  // 取消提示
  NotifyCancel = 33
}
// 处⽅状态
export enum PrescriptionStatus {
  // 未付款
  NotPayment = 1,
  // 已付款
  Payment = 2,
  // 已失效
  In
}
