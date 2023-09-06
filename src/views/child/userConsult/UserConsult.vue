<template>
  <div class="detail-page" v-if="detailInfo">
    <MyNavBar :back="() => $router.push('/user/consult')" title="问诊详情" />
    <div class="detail-head">
      <div class="text">
        <h3>图文问诊 {{ detailInfo?.actualPayment + '元' }}</h3>
        <span class="cancel">{{ detailInfo?.statusValue }}</span>
        <p class="tip">服务医生信息</p>
      </div>
      <div class="card">
        <img src="@/assets/avatar-doctor.svg" alt="" />
        <div class="desc">
          <p>极速问诊</p>
          <p>{{ detailInfo?.docInfo?.name || '自动分配医生' }}</p>
        </div>
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="detail-patient">
      <van-cell
        title="患者信息"
        :value="`${detailInfo?.patientInfo?.name} | ${
          detailInfo?.patientInfo?.gender == 1 ? '男' : '女'
        } | ${detailInfo?.patientInfo?.age}`"
      />
      <van-cell title="患病时长" :value="FilterTime(detailInfo?.illnessTime as number)" />
      <van-cell title="就诊情况" :value="FilterFlag(detailInfo?.consultFlag as number)" />
      <van-cell title="病情描述" :label="detailInfo?.illnessDesc" />
    </div>
    <div class="detail-order">
      <h3>订单信息</h3>
      <van-cell title="订单编号" class="info">
        <template #value>
          <div class="value">
            <van-button type="primary" class="copyBtn" round size="mini" @click="copy"
              >复制</van-button
            >
            <span> {{ detailInfo?.orderNo }}</span>
          </div>
        </template>
      </van-cell>
      <van-cell title="创建时间" :value="detailInfo?.createTime" />
      <van-cell title="优惠券" :value="detailInfo?.couponDeduction" />
      <van-cell title="积分抵扣" :value="detailInfo?.pointDeduction" />
      <van-cell title="实付款" class="price" :value="'￥' + detailInfo?.actualPayment.toFixed(2)" />
    </div>

    <div class="notice" v-if="detailInfo.status == OrderType.ConsultPay">
      <van-notice-bar :scrollable="false">
        <template v-slot>
          <span>请在</span> <span>00:00:00</span> <span> 内完成支付，超时订单将取消 </span>
        </template>
      </van-notice-bar>
    </div>
    <div class="footer">
      <van-row>
        <van-col class="priceCol" span="8">
          <p v-if="detailInfo.status == OrderType.ConsultPay">
            需付款<span class="price">{{ '￥' + detailInfo?.actualPayment.toFixed(2) }}</span>
          </p>
          <ConsultMore
            v-if="detailInfo.status == OrderType.ConsultComplete"
            :delId="detailInfo.id"
            :prescriptionId="detailInfo.prescriptionId"
            v-model:showPopover="showPopover"
            :flag="true"
            :disabled="!detailInfo.prescriptionId"
          ></ConsultMore>
        </van-col>
        <van-col span="16" v-if="detailInfo.status == OrderType.ConsultWait">
          <van-button
            round
            class="btn1"
            :loading="cancelLoading"
            @click="cancelConsult(detailInfo, true)"
            >取消问诊</van-button
          >
          <van-button round class="btn2">继续沟通</van-button>
        </van-col>
        <van-col span="16" v-if="detailInfo.status == OrderType.ConsultChat">
          <van-button round class="btn1" @click="Prescription(detailInfo.prescriptionId!)"
            >查看处方</van-button
          >
          <van-button round class="btn2" @click="router.push('/room')">继续沟通</van-button>
        </van-col>
        <van-col span="16" v-if="detailInfo.status == OrderType.ConsultCancel">
          <van-button round class="btn1" @click="delConsult(detailInfo.id)">删除订单</van-button>
          <van-button round class="btn2">咨询其他医生</van-button>
        </van-col>
        <van-col span="16" v-if="detailInfo.status == OrderType.ConsultPay">
          <van-button round class="btn1" @click="cancelConsult(detailInfo, true)"
            >取消问诊</van-button
          >
          <van-button round class="btn2" @click="show = true">继续支付</van-button>
        </van-col>
        <van-col span="16" v-if="detailInfo.status == OrderType.ConsultComplete">
          <van-button round class="btn1" @click="router.push('/room')">问诊记录</van-button>
          <van-button round class="btn2">{{
            detailInfo.evaluateFlag ? '已评价' : '写评价'
          }}</van-button>
        </van-col>
      </van-row>
    </div>
    <MyPay
      :callBack="'/room'"
      :actualPayment="detailInfo.actualPayment"
      @orderIdEvent="orderIdEvent"
      v-model:show="show"
      :orderId="orderId"
    />
  </div>

  <div v-else>
    <van-skeleton title :row="3" />
    <van-skeleton title :row="3" />
    <van-skeleton title :row="3" />
  </div>
</template>

<script lang="ts" setup>
import MyNavBar from '@/components/MyNavBar.vue'
import { getDetailApi } from '@/services/consultApi'
import type { ConsultOrderItem } from '@/types/couslt'
import { FilterTime, FilterFlag } from '@/utils/filter'
import ConsultMore from './components/ConsultMore.vue'
import { OrderType } from '@/enum/couslt'
import MyPay from '@/components/MyPay.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import getPrescription, { getCancel, getDel } from '@/composable/Prescription'
const router = useRouter()
const { cancelConsult, cancelLoading } = getCancel()
const { Prescription } = getPrescription()

const { delConsult } = getDel(() => {
  router.replace('/user/consult')
})
const show = ref(false)
const route = useRoute()
let orderId = route.params.id as string
const showPopover = ref(false)
const detailInfo = ref<ConsultOrderItem>()
const getDetail = async () => {
  let res = await getDetailApi(orderId)
  console.log(res)
  detailInfo.value = res.data
}
getDetail()

const orderIdEvent = () => {
  orderId = ''
}

const copy = () => {
  navigator.clipboard.writeText(
    `患者“${detailInfo.value?.patientInfo?.name}”订单号为: ${detailInfo.value?.id!}`
  )
}
</script>

<style lang="scss" scoped>
.detail-page {
  padding-top: 46px;
  padding-bottom: 105px;

  .detail-head {
    width: 100%;
    height: 170px;
    position: relative;
    padding: 0 15px;
    box-sizing: border-box;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 135px;
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
          font-size: 17px;

          &:last-child {
            font-size: 13px;
            color: var(--cp-tip);
            margin-top: 3px;
          }
        }
      }

      img {
        width: 38px;
        height: 38px;
      }

      ::v-deep {
        .van-icon-arrow {
          color: var(--cp-tip);
        }
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
    ::v-deep {
      .van-row {
        height: 100%;
        align-items: center;
        .van-col {
          display: flex;
          justify-content: flex-end;
          .btn1 {
            margin-right: 10px;
            background-color: var(--cp-bg);
            color: var(--cp-text3);
          }
          .btn2 {
            background-color: var(--cp-primary);
            color: #fff;
            border: 1px solid var(--cp-primary);
          }
        }
        .priceCol {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .price {
            color: #f00;
            font-size: 18px;
          }
        }
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
