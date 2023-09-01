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
      button-type="primary"
      text-align="left"
      :price="payList?.actualPayment * 100"
      button-text="立即支付"
      @click="onSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import MyNavBar from '@/components/MyNavBar.vue'
import { showToast } from 'vant'
import { getorderPerApi, getPatientInfoAPI } from '@/services/consultApi'
import { useCoulstStore } from '@/stores/coulst'
import type { ConsultOrderPreData } from '@/types/couslt'
import type { patientType } from '@/types/user'
const useCoulst = useCoulstStore()
import { ref } from 'vue'
const status = ref(false)

const onSubmit = () => {
  if (!status.value) return showToast('请勾选支付协议')
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
}
</style>
