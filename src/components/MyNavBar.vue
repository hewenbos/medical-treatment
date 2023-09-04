<template>
  <van-nav-bar
    :title="title"
    :right-text="RightText"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    fixed
  />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
  title?: string
  RightText?: string
  back?: () => void
}>()
const emits = defineEmits<{
  (e: 'click-rigth'): void
}>()
const onClickLeft = () => {
  if (props.back) {
    return props.back()
  }

  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}

const onClickRight = () => {
  emits('click-rigth')
}
</script>

<style lang="scss" scoped>
//通过css变量来设置项目总体颜色
::v-deep() {
  .van-nav-bar {
    &__arrow {
      color: var(--cp-text1);
    }
    &__text {
      color: var(--cp-primary);
    }
  }
}
</style>
