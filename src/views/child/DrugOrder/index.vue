<template>
  <div class="drug-page">
    <MyNavBar title="药品支付" :backGround="true" />

    <div class="order-address">
      <p class="area">
        <van-icon name="location" />
        北京 北京市 昌平区
      </p>
      <p class="detail">北京市昌平区黑马程序员总部</p>
      <p>测试 132****0003</p>
    </div>
    <div class="order-medical">
      <div class="head">
        <h3>优医药房</h3>
        <div class="small">优医质保假一赔十</div>
      </div>
    </div>
    <DrugList></DrugList>
    <van-cell-group>
      <van-cell title="药品金额" value="内容" />
      <van-cell title="运费" value="内容" />
      <van-cell title="优惠券" value="内容" />
      <van-cell title="实付款" value="内容" />
    </van-cell-group>
    <div class="tip">
      由于药品的特殊性，如非错发、漏发药品的情况，药品一经发出 不得退换，请核对药品信息无误后下单。
    </div>
    <div class="agreement">
      <van-checkbox v-model="isAgree">我已同意 <a href="javascript:;">支付协议</a></van-checkbox>
    </div>

    <van-submit-bar :price="3050" text-align="left">
      <template #button> <van-button class="ImmediatePayment">立即支付</van-button> </template>
    </van-submit-bar>
  </div>
</template>

<script lang="ts" setup>
import MyNavBar from '@/components/MyNavBar.vue'
import DrugList from './component/DrugList.vue'
import { ref } from 'vue'

const isAgree = ref(false)
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
</style>
