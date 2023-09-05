<template>
  <div class="more">
    <van-popover
      placement="top-start"
      :show="showPopover"
      :update:showPopover="update"
      :actions="actions"
      @select="onSelect"
    >
      <template #reference>
        <span>更多</span>
      </template>
    </van-popover>
  </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
import getPrescription, { getDel } from '@/composable/Prescription'
import router from '@/router'
const { Prescription } = getPrescription()
const { delConsult } = getDel(() => {})
const props = defineProps<{
  disabled: boolean
  showPopover: boolean
  prescriptionId?: string
  delId?: string
  flag?: boolean
}>()

const onSelect = (event: { text: string; disabled: boolean }, i: number) => {
  if (i === 0) {
    Prescription(props.prescriptionId!)
  }

  if (i === 1) {
    delConsult(props.delId!)
    if (props.flag) {
      router.push('/user/consult')
    }
  }
}

const actions = [{ text: '查看处方', disabled: props.disabled }, { text: '删除订单' }]

// const showPopover = ref(false)

const emit = defineEmits<{
  (e: 'update:showPopover', val: boolean): void
}>()
const update = () => {
  emit('update:showPopover', false)
}
</script>

<style lang="scss">
.more {
  flex: 1;

  ::v-deep {
    .van-popover__wrapper {
      color: var(--cp-line);
    }
  }
}
</style>
