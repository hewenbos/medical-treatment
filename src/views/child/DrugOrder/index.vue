<template>
  <div class="drug-page" v-if="AddressInfo && perInfo">
    <MyNavBar title="药品支付" :backGround="true" />

    <div class="order-address">
      <p class="area">
        <van-icon name="location" />
        {{ AddressInfo?.province }} {{ AddressInfo?.city }} {{ AddressInfo?.county }}
      </p>
      <p class="detail">{{ AddressInfo?.addressDetail }}</p>
      <p>
        {{ AddressInfo?.receiver }}
        {{ AddressInfo?.mobile.replace(/^(\d{3})\d+(\d{4})$/, '$1****$2') }}
      </p>
    </div>
    <div class="order-medical">
      <div class="head">
        <h3>优医药房</h3>
        <div class="small">优医质保假一赔十</div>
      </div>
    </div>
    <DrugList :Medicals="perInfo?.medicines!"></DrugList>
    <van-cell-group>
      <van-cell title="药品金额" :value="`￥${perInfo?.payment}`" />
      <van-cell title="运费" :value="perInfo?.expressFee" />
      <van-cell title="优惠券" :value="`-￥${perInfo?.couponDeduction}`" />
      <van-cell title="实付款" :value="`￥${perInfo?.actualPayment}`" />
    </van-cell-group>
    <div class="tip">
      由于药品的特殊性，如非错发、漏发药品的情况，药品一经发出 不得退换，请核对药品信息无误后下单。
    </div>
    <div class="agreement">
      <van-checkbox v-model="isAgree">我已同意 <a href="javascript:;">支付协议</a></van-checkbox>
    </div>

    <van-submit-bar :price="perInfo?.actualPayment! * 100" text-align="left">
      <template #button>
        <van-button @click="onSubmit" class="ImmediatePayment">立即支付</van-button>
      </template>
    </van-submit-bar>

    <MyPay
      :callBack="'/order/pay/result'"
      :orderId="payId"
      v-model:show="show"
      :actualPayment="perInfo?.actualPayment!"
    ></MyPay>
  </div>

  <div v-else>
    <van-skeleton title :row="3" />
    <van-skeleton title :row="3" />
    <van-skeleton title :row="3" />
  </div>
</template>

<script lang="ts" setup>
import MyNavBar from '@/components/MyNavBar.vue'
import DrugList from './component/DrugList.vue'
import { getAddressApi, getOrderPerApi, getCreateDrugApi } from '@/services/drug'
import MyPay from '@/components/MyPay.vue'
import type { Address, OrderPre } from '@/types/drug'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { showToast } from 'vant'

const route = useRoute()
const show = ref(false)
const prescriptionId = route.query.id

const isAgree = ref(false)
//收货地址
const AddressInfo = ref<Address>()
const getAddress = async () => {
  let res = await getAddressApi()
  console.log(res)

  AddressInfo.value = res.data[0]
}
getAddress()

//预支付信息接口
const perInfo = ref<OrderPre>()
const getOrderPer = async () => {
  let res = await getOrderPerApi(prescriptionId as string)
  console.log(res)
  perInfo.value = res.data
}
getOrderPer()

//支付
const payId = ref('')
const onSubmit = async () => {
  if (!isAgree.value) return showToast('请勾选支付协议')
  if (!AddressInfo.value?.id) return showToast('请选择收货地址')
  if (!prescriptionId) return showToast('未找到处方')

  let res = await getCreateDrugApi({
    id: prescriptionId as string,
    addressId: AddressInfo.value?.id
  })

  console.log(res)
  if (res.code !== 400) {
    payId.value = res.data.id
    show.value = true
  } else {
    showToast(res.message)
  }
}
</script>

<style lang="scss" scoped>
.drug-page {
  padding-top: 46px;
  margin-bottom: 60px;
  .order-address {
    padding: 15px;
    padding-bottom: 27px;
    position: relative;
    .area {
      color: var(--cp-tag);
      .van-icon-location {
        color: orange;
      }
    }
    .detail {
      font-size: 18px;
      margin: 5px 0;
    }
    &::after {
      position: absolute;
      left: 0;
      bottom: 0;
      content: '';
      background-color: var(--cp-bg);
      width: 100%;
      height: 12px;
    }
  }
  .order-medical {
    .head {
      padding: 0px 15px;
      height: 54px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--cp-bg);
      h3 {
        font-weight: 500;
        margin-right: 10px;
      }
      .small {
        color: var(--cp-tag);
        font-size: 13px;
      }
    }
  }
  .tip {
    padding: 0 15px;
    color: var(--cp-tag);
    font-size: 12px;
    margin-top: 10px;
    &::before {
      content: '*';
      color: #f00;
    }
  }
  .agreement {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    ::v-deep {
      .van-checkbox__icon {
        font-size: 14px;
      }
    }
    a {
      color: var(--cp-primary);
    }
  }

  .ImmediatePayment {
    width: 200px;
    height: 40px;
    border-radius: 20px;
    background-color: var(--cp-primary);
    color: #fff;
    font-weight: 600;
  }
}
::v-deep {
  .van-skeleton__content {
    margin: 15px 0;
  }
}
</style>
