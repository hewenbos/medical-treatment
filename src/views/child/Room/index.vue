<template>
  <div class="room-page">
    <MyNavBar :back="() => $router.push('/user/consult')" title="问诊室" />
    <van-button @click="$router.push('/drug/order?id=' + 6938969496473600)">购买药品</van-button>
  </div>
</template>

<script lang="ts" setup>
import MyNavBar from '@/components/MyNavBar.vue'
</script>

<style lang="scss" scoped>
.room-page {
  padding-top: 46px;
}
</style>
