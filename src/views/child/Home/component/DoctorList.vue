<template>
  <div class="card">
    <van-image round width="70px" height="70px" :src="item.avatar" />
    <p class="name">{{ item.name }}</p>
    <p class="doce van-ellipsis">{{ item.hospitalName }}</p>
    <span class="doce">{{ item.positionalTitles }}</span>

    <p class="footer">
      <van-button :loading="loading" @click="doctorFollow(item)" class="btn" round>{{
        item.likeFlag == 1 ? '已关注' : '+ 关注'
      }}</van-button>
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { Doctor } from '@/types/knowledge'
import doctorFun from '@/composable/DoctorCommend'

const { loading, doctorFollow } = doctorFun()

defineProps<{
  item: Doctor
}>()
</script>

<style lang="scss" scoped>
.card {
  border-radius: 15px;
  height: 190px;
  background-color: #fff;
  text-align: center;
  box-sizing: border-box;
  padding: 10px;
  margin-left: 15px;
  width: 135px;
  .name {
    margin: 5px 0;
  }
  .doce {
    font-size: 13px;
    color: var(--cp-tip);
  }
  ::v-deep() {
    .btn {
      width: 70px;
      height: 30px;
      color: #fff;
      --van-button-default-background: var(--cp-primary);
      font-size: 12px;
    }
  }
}
</style>
