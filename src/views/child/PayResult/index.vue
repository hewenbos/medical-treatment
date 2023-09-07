<template>
  <div class="order-pay-result-page">
    <MyNavBar :back="() => $router.push('/home')" title="订单支付结果页"></MyNavBar>
    <div class="result error" v-if="drugInfo?.status == OrderType.MedicineCancel">
      <van-icon name="clear" />
      <p class="price">￥ {{ drugInfo?.actualPayment }}</p>
      <p class="status">⽀付失败</p>
      <p class="tip">订单⽀付失败，可以点击查看订单继续⽀付，如有疑问联系客服~</p>
    </div>
    <div class="result" v-else>
      <van-icon name="checked" />
      <p class="price">￥ {{ drugInfo?.actualPayment }}</p>
      <p class="status">⽀付成功</p>
      <p class="tip">订单⽀付成功，已通知药房尽快发出， 请耐⼼等待~</p>
    </div>
    <div class="btn">
      <van-button type="primary" :to="`/order/${drugInfo?.id}`">查看订单</van-button>
      <van-button :to="`/room?orderId=${drugInfo?.roomId}`">返回诊室</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MyNavBar from '@/components/MyNavBar.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { getDrugDetailInfo } from '@/composable/Drug'

const { drugInfo, getDrugDetail } = getDrugDetailInfo(route.query.orderId as string)
getDrugDetail()

import { OrderType } from '@/enum/couslt'
</script>

<style lang="scss" scoped>
.order-pay-result-page {
  padding-top: 46px;
}
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  .van-icon {
    font-size: 75px;
    color: var(--cp-primary);
    margin-top: 60px;
  }
  .price {
    font-size: 22px;
    margin-top: 10px;
  }
  .status {
    color: var(--cp-text3);
  }
  .tip {
    color: var(--cp-tip);
    width: 240px;
    text-align: center;
    margin-top: 20px;
  }

  &.error {
    .van-icon {
      color: var(--cp-price);
    }
  }
}
.btn {
  margin-top: 60px;
  text-align: center;
  .van-button--primary {
    margin-right: 20px;
  }
}
</style>
