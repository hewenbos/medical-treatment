<template>
  <div class="doctor-page">
    <div class="doctor-page-header">
      <span>推荐关注</span>
      <a>查看更多 <i class="van-icon van-icon-arrow" /></a>
    </div>

    <div class="doctor-page-body">
      <van-swipe :width="(150 / 375) * widthValue" :loop="false" :show-indicators="false">
        <van-swipe-item v-for="(item, index) in followGoods" :key="index">
          <DoctorList :item="item"></DoctorList>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DoctorList from './DoctorList.vue'
import { getFllowListApi } from '@/services/Knowledge'
import { ref } from 'vue'
import type { PageParams, Doctor } from '@/types/knowledge'
import ReSize from '@/composable/linentWidth'

const { widthValue, WidthSize } = ReSize()
WidthSize()
const followInfo = ref<PageParams>({
  current: 1,
  pageSize: 5
})
const followGoods = ref<Doctor[]>()
const getFllowList = async () => {
  let res = await getFllowListApi(followInfo.value)
  console.log(res)
  followGoods.value = res.data.rows
}
getFllowList()
</script>

<style lang="scss" scoped>
.doctor-page {
  height: 250px;
  background-color: var(--cp-bg);
  padding: 5px 15px;
  &-header {
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      font-size: 14px;
      color: var(--cp-disable);
    }
    span {
      color: var(--cp-text2);
      font-size: 14px;
    }
  }
  &-body {
    padding: 10px;
  }
}
</style>
