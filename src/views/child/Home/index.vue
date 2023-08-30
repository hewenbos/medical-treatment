<template>
  <div class="home-page">
    <div class="home-page-header">
      <div class="con">
        <h1>优医</h1>
        <div class="search">
          <MyIcons name="home-search"></MyIcons>
          搜一搜：疾病/症状/医生/健康知识
        </div>
      </div>
    </div>
    <div class="home-page-navs">
      <van-row>
        <van-col span="8" class="row">
          <MyIcons name="home-doctor"></MyIcons>
          <p class="title">问医生</p>
          <p class="docs">按科室查问医生</p>
        </van-col>
        <van-col span="8" class="row">
          <MyIcons name="home-graphic"></MyIcons>
          <p class="title">极速问诊</p>
          <p class="docs">20s医生极速回复</p>
        </van-col>
        <van-col span="8" class="row">
          <MyIcons name="home-prescribe"></MyIcons>
          <p class="title">开药门诊</p>
          <p class="docs">线上买药更方便</p>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6" class="row min">
          <MyIcons name="home-order"></MyIcons>
          <p class="title">药品订单</p>
        </van-col>
        <van-col span="6" class="row min">
          <MyIcons name="home-docs"></MyIcons>
          <p class="title">健康档案</p>
        </van-col>
        <van-col span="6" class="row min">
          <MyIcons name="home-rp"></MyIcons>
          <p class="title">我的处方</p>
        </van-col>
        <van-col span="6" class="row min">
          <MyIcons name="home-find"></MyIcons>
          <p class="title">疾病查询</p>
        </van-col>
      </van-row>
    </div>
    <div class="swiper">
      <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item>
          <img src="@/assets/ad.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/ad.png" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-tabs v-model:active="active" shrink sticky>
      <van-tab title="关注" name="like">
        <DoctorRecommend></DoctorRecommend>
        <MyList type="like"></MyList>
      </van-tab>
      <van-tab title="推荐" name="recommend"><MyList type="recommend"></MyList></van-tab>
      <van-tab title="减脂" name="fatReduction"><MyList type="fatReduction"></MyList></van-tab>
      <van-tab title="饮食" name="food"><MyList type="food"></MyList></van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
import MyIcons from '@/components/MyIcons.vue'
import MyList from './component/MyList.vue'
import type { tabType } from '@/types/knowledge'
import DoctorRecommend from './component/DoctorRecommend.vue'
import { ref } from 'vue'
const active = ref<tabType>('recommend')
</script>

<style lang="scss" scoped>
.home-page {
  padding-bottom: 50px;
  &-header {
    height: 100px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 90%;
      background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
      border-bottom-left-radius: 150px 30px;
      border-bottom-right-radius: 150px 30px;
    }
    .con {
      padding: 0 15px;
      h1 {
        position: relative;
        color: #fff;
        font-weight: normal;
        font-size: 20px;
        padding-top: 10px;
      }

      .search {
        background-color: #fff;
        position: relative;
        height: 40px;
        margin-top: 15px;
        border-radius: 20px;
        box-shadow: 0px 15px 22px -7px rgba(224, 236, 250, 0.8);
        display: flex;
        align-items: center;
        padding: 0 0 0 15px;
        color: var(--cp-dark);
        font-size: 13px;
        .icons {
          font-size: 16px;
          margin-right: 10px;
        }
      }
    }
  }
  &-navs {
    .row {
      text-align: center;
      margin-top: 15px;
      .icons {
        font-size: 46px;
      }
      .title {
        font-weight: 500;
      }
      .docs {
        font-size: 13px;
        color: var(--cp-tag);
        margin-top: 3px;
      }
    }
    .min {
      margin-top: 10px;
      .icons {
        font-size: 30px;
      }
      .title {
        color: var(--cp-text2);
      }
    }
  }
  .swiper {
    margin-top: 20px;
    padding: 0 15px;
    img {
      width: 100%;
    }
  }
  ::v-deep() {
    .van-tabs__line {
      width: 20px;
      background-color: var(--cp-primary);
    }
  }
}
</style>
