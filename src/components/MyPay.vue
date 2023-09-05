<template>
  <van-action-sheet
    :show="show"
    title="选择支付方式"
    :close-on-popstate="false"
    :closeable="false"
    :before-close="closeSheet"
    :update:show="update"
  >
    <div class="content">
      <p class="price">{{ '￥' + actualPayment.toFixed(2) }}</p>

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

      <van-button type="primary" block round @click="payMenoy(paymentMethod!, orderId)"
        >立即支付</van-button
      >
    </div>
  </van-action-sheet>
</template>

<script lang="ts" setup>
import MyIcons from '@/components/MyIcons.vue'
import { showConfirmDialog } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Pay } from '@/composable/Prescription'
const { payMenoy } = Pay()
const router = useRouter()
const paymentMethod = ref<0 | 1>()

defineProps<{
  actualPayment: number
  orderId: string
  show: boolean
}>()
const emits = defineEmits<{
  (e: 'update:show', show: boolean): void
  (e: 'orderIdEvent'): void
}>()

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
      emits('orderIdEvent')

      router.push('/user/consult')
      return true
    })
}

const update = () => {
  emits('update:show', false)
}
</script>

<style lang="scss" scoped>
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
</style>
