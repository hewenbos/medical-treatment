<template>
  <div class="detail-page" v-if="drugInfo">
    <MyNavBar :back="() => $router.push('/user/consult')" title="问诊详情" />
    <div class="detail-head">
      <div class="card" @click="$router.push(`/order/logistics/${drugInfo.id}`)">
        <div class="desc">
          <p>{{ drugInfo?.expressInfo.content }}</p>
          <p>{{ drugInfo?.expressInfo.time }}</p>
        </div>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="order-medical">
      <div class="head">
        <h3>优医药房</h3>
        <div class="small">优医质保假一赔十</div>
      </div>
    </div>
    <DrugList :Medicals="drugInfo.medicines"></DrugList>
    <div class="detail-order">
      <van-cell title="药品金额" :value="drugInfo.payment" />
      <van-cell title="运费" :value="`￥${drugInfo.couponDeduction}`" />
      <van-cell title="优惠券" :value="`-￥${drugInfo.expressFee}`" />
      <van-cell title="实付款" class="price" :value="'￥' + drugInfo.actualPayment" />
      <van-cell title="订单编号" :value="drugInfo.orderNo" />
      <van-cell title="创建时间" :value="drugInfo.createTime" />
      <van-cell title="支付时间" :value="drugInfo.payTime" />
      <van-cell title="支付方式" :value="drugInfo.paymentMethod == 1 ? '支付宝' : '微信'" />
    </div>
    <div class="footer">
      <van-action-bar-button type="primary" text="确认收货" />
    </div>
  </div>
  <div v-else>
    <van-skeleton title :row="3" />
    <van-skeleton title :row="3" />
    <van-skeleton title :row="3" />
  </div>
</template>

<script lang="ts" setup>
import { getDrugDetailInfo } from '@/composable/Drug'
import DrugList from '../DrugOrder/component/DrugList.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { drugInfo, getDrugDetail } = getDrugDetailInfo(route.params.id as string)
getDrugDetail()
</script>

<style lang="scss" scoped>
.detail-page {
  padding-top: 46px;
  padding-bottom: 105px;

  .detail-head {
    width: 100%;
    height: 100px;
    position: relative;
    padding: 0 15px;
    box-sizing: border-box;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 65px;
      background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
      border-bottom-left-radius: 150px 21px;
      border-bottom-right-radius: 150px 21px;
    }

    .text {
      padding-top: 30px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;

      .tip {
        width: 100%;
        margin-top: 5px;
        color: var(--cp-primary);
      }

      .cancel {
        font-size: 17px;
        color: var(--cp-primary);
      }
    }

    .card {
      position: relative;
      padding: 10px;
      height: 53px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 0 10px var(--cp-line);
      margin-top: 10px;
      border-radius: 10px;

      .desc {
        flex: 1;
        padding-left: 10px;

        p {
          font-size: 14px;
          color: var(--cp-text3);
          &:last-child {
            font-size: 13px;
            color: var(--cp-tip);
            margin-top: 3px;
          }
        }
      }

      ::v-deep {
        .van-icon-arrow {
          color: var(--cp-tip);
        }
      }
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
  .detail-patient {
    position: relative;
    padding-bottom: 10px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 12px;
      background-color: var(--cp-bg);
    }
  }

  .detail-order {
    h3 {
      font-weight: 500;
      padding: 10px 15px;
    }

    ::v-deep {
      .info {
        .van-cell__value {
          flex: 44%;
        }

        .value {
          display: flex;
          align-items: center;
        }
      }

      .price {
        .van-cell__value {
          color: #f00;
          font-size: 18px;
        }
      }

      .copyBtn {
        padding: 2px 12px;
        border: 1px solid var(--cp-primary);
        background-color: var(--cp-plain);
        color: var(--cp-primary);
        font-size: 12px;
        height: 20px;
        margin-right: 10px;
      }
    }
  }
  .notice {
    position: fixed;
    left: 0;
    bottom: 65px;
    width: 100%;
    text-align: center;
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 65px;
    box-sizing: border-box;
    padding: 0 15px;
    border-top: 1px solid var(--cp-line);
    background-color: #fff;
    display: flex;
    align-items: center;
    ::v-deep {
      .van-button--primary {
        background-color: var(--cp-primary);
        border-radius: 25px;
      }
    }
  }
}

::v-deep {
  .van-skeleton__content {
    margin: 15px 0;
  }
}
</style>
