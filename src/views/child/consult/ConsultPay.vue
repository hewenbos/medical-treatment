<template>
  <div class="pay-page" v-if="payList">
    <MyNavBar title="支付"></MyNavBar>
    <div class="pay-info">
      <div class="tit">图文问诊 {{ payList?.payment }} 元</div>
      <div class="center">
        <img src="@/assets/avatar-doctor.svg" alt="" />
        <div class="tip">
          <div>极速问诊</div>
          <div class="doc">自动分配医生</div>
        </div>
      </div>
    </div>
    <van-cell title="优惠券" :value="`-￥ ${payList?.couponDeduction}`" />
    <van-cell title="积分抵扣" :value="`-￥ ${payList?.pointDeduction}`" />
    <van-cell title="实付款" class="menoy" :value="`¥${payList?.actualPayment}.00`" />
    <div class="col"></div>
    <van-cell
      title="患者信息"
      :value="`${userInfo?.name} | ${userInfo?.gender == 1 ? '男' : '女'} | ${userInfo?.age}岁`"
    ></van-cell>
    <van-cell title="病情描述" :label="useCoulst.coulstInfo.illnessDesc"></van-cell>
    <div class="pay-schema">
      <van-checkbox v-model="status">我已同意 <span class="text">⽀付协议</span></van-checkbox>
    </div>

    <van-submit-bar
      :loading="loading"
      button-type="primary"
      text-align="left"
      :price="payList?.actualPayment * 100"
      button-text="立即支付"
      @click="onSubmit"
    />

    <van-action-sheet
      v-model:show="show"
      title="选择支付方式"
      :close-on-popstate="false"
      :closeable="false"
      :before-close="closeSheet"
    >
      <div class="content">
        <p class="price">{{ '￥' + payList?.actualPayment.toFixed(2) }}</p>

        <van-cell-group>
          <van-cell title="微信支付" @click="paymentMethod = 0">
            <template #icon>
              <MyIcons name="consult-wechat" />
            </template>
            <template #extra>
              <van-checkbox :checked="paymentMethod === 0"></van-checkbox>
            </template>
          </van-cell>
          <van-cell title="支付宝支付" @click="paymentMethod = 1">
            <template #icon>
              <MyIcons name="consult-alipay" />
            </template>
            <template #extra>
              <van-checkbox :checked="paymentMethod === 1"></van-checkbox>
            </template>
          </van-cell>
        </van-cell-group>

        <van-button type="primary" block round @click="payMenoy">立即支付</van-button>
      </div>
    </van-action-sheet>
  </div>
</template>

<script lang="ts" setup>
import MyNavBar from '@/components/MyNavBar.vue'
import MyIcons from '@/components/MyIcons.vue'
import { showDialog, showToast } from 'vant'
import {
  getorderPerApi,
  getPatientInfoAPI,
  getPatientOrderApi,
  getPayMenoyApi
} from '@/services/consultApi'
import { useCoulstStore } from '@/stores/coulst'
import type { ConsultOrderPreData } from '@/types/couslt'
import type { patientType } from '@/types/user'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant'
import { ref, onMounted } from 'vue'
const router = useRouter()
//禁止回退
onBeforeRouteLeave(() => {
  if (orderId.value) return false
})
const useCoulst = useCoulstStore()

const status = ref(false)

const show = ref(false)
const orderId = ref('')
const paymentMethod = ref<0 | 1>()
const onSubmit = async () => {
  if (!status.value) return showToast('请勾选支付协议')
  loading.value = true

  let {
    data: { id }
  } = await getPatientOrderApi(useCoulst.coulstInfo)
  loading.value = false
  orderId.value = id
  show.value = true

  useCoulst.clear()
}

const closeSheet = () => {
  return showConfirmDialog({
    title: '关闭支付',
    message: '取消⽀付将⽆法获得医⽣回复，医⽣接诊名额有限，是否确认关闭？',
    confirmButtonText: '继续支付',
    cancelButtonText: '取消支付'
  })
    .then(() => {
      return false
    })
    .catch(() => {
      orderId.value = ''
      router.push('/user/consult')
      return true
    })
}

const payUrl = ref('')
const payMenoy = async () => {
  console.log(paymentMethod)

  if (paymentMethod.value === undefined) return showToast('请选择支付方式')

  let res = await getPayMenoyApi({
    paymentMethod: paymentMethod.value,
    orderId: orderId.value,
    payCallback: 'http://localhost:5173/room'
  })
  payUrl.value = res.data.payUrl
  window.location.href = payUrl.value
}

const payList = ref<ConsultOrderPreData>()
const getorderPer = async () => {
  const res = await getorderPerApi({
    type: useCoulst.coulstInfo.type,
    illnessType: useCoulst.coulstInfo.illnessType
  })

  payList.value = res.data

  console.log(res)
}
getorderPer()

const userInfo = ref<patientType>()
const getPatientInfo = async () => {
  let res = await getPatientInfoAPI(useCoulst.coulstInfo.patientId as string)
  console.log(res)
  userInfo.value = res.data
}
getPatientInfo()

const loading = ref(false)

onMounted(async () => {
  console.log(useCoulst.coulstInfo)

  if (
    !useCoulst.coulstInfo.illnessDesc ||
    !useCoulst.coulstInfo.type ||
    !useCoulst.coulstInfo.patientId ||
    useCoulst.coulstInfo.illnessType === undefined
  ) {
    console.log(111)

    return showDialog({
      title: '温馨提示',
      message: '问诊信息不完整请重新填写，如有未支付的问诊订单可在问诊记录中继续支付',
      closeOnPopstate: false
    }).then(() => {
      router.push('/')
    })
  }
})
</script>

<style lang="scss" scoped>
.pay-page {
  padding-top: 46px;

  .pay-info {
    padding: 15px;

    .tit {
      width: 100%;
      margin-bottom: 10px;
      font-size: 18px;
    }

    .center {
      display: flex;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }

      .tip {
        .doc {
          color: var(--cp-tag);
          margin-top: 5px;
        }
      }
    }
  }

  .col {
    background-color: var(--cp-bg);
    width: 100%;
    height: 12px;
  }

  .pay-schema {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;

    .text {
      color: var(--cp-primary);
    }
  }

  ::v-deep() {
    .van-submit-bar__button {
      font-weight: normal;
      width: 160px;
      background-color: var(--cp-primary);
    }
  }

  .menoy {
    ::v-deep() {
      .van-cell__value {
        font-size: 20px;
        color: red;
      }
    }
  }

  .content {
    padding: 16px;

    .price {
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      padding-bottom: 20px;
    }

    .van-cell {
      align-items: center;

      .icons {
        font-size: 18px;
        margin-right: 10px;
      }

      .title {
        font-size: 18px;
      }

      .van-checkbox {
        font-size: 16px;
      }
    }
  }
}

::v-deep() {
  .van-button--primary {
    margin: 10px 0;
    background-color: var(--cp-primary);
    border: 1px solid var(--cp-primary);
    margin-top: 10px;
  }
}
</style>
