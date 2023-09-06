import { OrderType } from '@/enum/couslt'
import router from '@/router'
import {
  getCancelConsultApi,
  getDelConsultApi,
  getPayMenoyApi,
  getPrescriptionApi
} from '@/services/consultApi'
import type { ConsultOrderItem } from '@/types/couslt'
import { showImagePreview, showToast } from 'vant'
import { ref } from 'vue'

export default function getPrescription() {
  const Prescription = async (id: string) => {
    const res = await getPrescriptionApi(id)
    if (res.code == 10000) {
      showImagePreview([res.data.url])
    }
  }

  return {
    Prescription
  }
}

//取消问诊
export const getCancel = () => {
  let cancelLoading = false
  const cancelConsult = async (item: ConsultOrderItem, flag?: boolean) => {
    cancelLoading = true
    try {
      await getCancelConsultApi(item.id)
      showToast('取消问诊成功')
      item.status = OrderType.ConsultCancel
      if (flag) {
        router.replace('/user/consult')
      }
      item.statusValue = '已取消'
    } catch {
      console.log(11)
    } finally {
      cancelLoading = false
    }
  }

  return {
    cancelConsult,
    cancelLoading
  }
}

//删除订单
export const getDel = (callBack?: (id?: string) => void) => {
  const delConsult = async (id: string) => {
    // emits('delConsult', id)

    await getDelConsultApi(id)
    callBack && callBack(id)
    showToast('删除订单成功')
  }

  return {
    delConsult
  }
}

//支付功能
export const Pay = (url: string) => {
  const payUrl = ref('')
  const payMenoy = async (paymentMethod: 0 | 1, orderId: string) => {
    if (paymentMethod === undefined) return showToast('请选择支付方式')

    const res = await getPayMenoyApi({
      paymentMethod: paymentMethod,
      orderId: orderId,
      payCallback: `http://localhost:5173${url}`
    })
    payUrl.value = res.data.payUrl
    window.location.href = payUrl.value
  }
  return {
    payMenoy
  }
}
