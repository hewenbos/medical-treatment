<template>
  <div class="consult-item">
    <div class="head">
      <img src="@/assets/avatar-doctor.svg" alt="" />
      <p>{{ item.docInfo?.name || '极速问诊（自动分配医生）' }}</p>
      <span>{{ getFilter(item.status) }}</span>
    </div>
    <div class="body" @click="$router.replace(`/user/consult/${item.id}`)">
      <div class="body-row">
        <div class="body-label">病情描述</div>
        <div class="body-value">{{ item.illnessDesc }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">价格</div>
        <div class="body-value">¥ {{ item.payment }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">创建时间</div>
        <div class="body-value tip">{{ item.createTime }}</div>
      </div>
    </div>
    <div class="foot" v-if="item.status == OrderType.ConsultPay">
      <van-button
        class="gray"
        :loading="cancelLoading"
        plain
        size="small"
        round
        @click="cancelConsult(item)"
        >取消问诊</van-button
      >
      <van-button
        type="primary"
        plain
        size="small"
        round
        @click="$router.push('/user/consult/' + item.id)"
        >去⽀付</van-button
      >
    </div>
    <div class="foot" v-if="item.status == OrderType.ConsultWait">
      <van-button
        class="gray"
        plain
        size="small"
        :loading="cancelLoading"
        round
        @click="cancelConsult(item)"
        >取消问诊</van-button
      >
      <van-button type="primary" plain size="small" round @click="$router.push('/room')"
        >继续沟通</van-button
      >
    </div>
    <div class="foot" v-if="item.status == OrderType.ConsultChat">
      <van-button
        v-if="item.prescriptionId"
        @click="Prescription(item.prescriptionId)"
        class="gray"
        plain
        size="small"
        round
        >查看处方</van-button
      >
      <van-button type="primary" plain size="small" round @click="$router.push('/room')"
        >继续沟通</van-button
      >
    </div>
    <div class="foot" v-if="item.status == OrderType.ConsultComplete">
      <ConsultMore
        v-model:showPopover="showPopover"
        :disabled="!item.prescriptionId"
        :prescriptionId="item.prescriptionId!"
        :delId="item.id"
      ></ConsultMore>
      <van-button class="gray" plain size="small" round @click="$router.push('/room')"
        >问诊记录</van-button
      >
      <van-button type="primary" plain size="small" round>{{
        item.evaluateFlag == '0' ? '写评价' : '查看评价'
      }}</van-button>
    </div>
    <div class="foot" v-if="item.status == OrderType.ConsultCancel">
      <van-button class="gray" plain size="small" round @click="delConsult(item.id)"
        >删除订单</van-button
      >
      <van-button type="primary" plain size="small" round>咨询其他医生</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ConsultOrderItem } from '@/types/couslt'
import { OrderType } from '@/enum/couslt'
import ConsultMore from './ConsultMore.vue'
import { getCancel, getDel } from '@/composable/Prescription'
import getPrescription from '@/composable/Prescription'
import { ref } from 'vue'

const { cancelConsult, cancelLoading } = getCancel()

const { Prescription } = getPrescription()
const { item } = defineProps<{
  item: ConsultOrderItem
}>()
//1待支付2待接诊3咨询中4已完成5已取消/药品订单
let ItemStatus = [
  {
    type: 1,
    value: '待支付'
  },
  {
    type: 2,
    value: '待接诊'
  },
  {
    type: 3,
    value: '咨询中'
  },
  {
    type: 4,
    value: '已完成'
  },
  {
    type: 5,
    value: '已取消'
  }
]
const getFilter = (status: number) => {
  let find = ItemStatus.find((item) => item.type == status)

  return find?.value
}

const emits = defineEmits<{
  (e: 'delConsult', id: string): void
}>()

const { delConsult } = getDel((id) => {
  emits('delConsult', id as string)
})

const showPopover = ref(false)
</script>

<style lang="scss" scoped>
.consult-item {
  background-color: #fff;
  margin: 10px 0;
  padding: 10px 0;
  border-radius: 5px;
  .head {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--cp-line);
    padding: 0 10px;
    padding-bottom: 10px;
    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    p {
      width: 240px;
    }
    span {
      color: var(--cp-dark);
    }
  }
  .body {
    padding: 0 10px;
    .body-row {
      display: flex;
      align-items: center;
      margin: 10px 0;
      .body-label {
        width: 80px;
        margin-right: 10px;
        color: var(--cp-disable);
      }
      .tip {
        color: var(--cp-disable);
      }
    }
  }
  .foot {
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .gray {
      margin-right: 10px;
    }
  }
}
</style>
