<template>
  <div>
    <MyNavBar title="极速问诊" right-text="问诊记录" />
    <div class="imgBox">
      <img class="fastImg" src="@/assets/consult-fast.png" alt="" />
      <p class="title">
        <span class="color">20s </span>
        <span>快速匹配专业医生</span>
      </p>
    </div>
    <div class="wriper">
      <router-link to="/consult/dep">
        <div class="trisetext main" @click="useCoulst.setIllnessType(IllnessType.trimethylate)">
          <MyIcons name="consult-doctor"></MyIcons>
          <div class="content">
            <p class="name">三甲图文问诊</p>
            <p class="dose">三甲主治及以上级别医生</p>
          </div>
          <van-icon name="arrow"></van-icon>
        </div>
      </router-link>
      <router-link to="/consult/dep">
        <div class="Plaintext main" @click="useCoulst.setIllnessType(IllnessType.Normal)">
          <MyIcons name="consult-message"></MyIcons>
          <div class="content">
            <p class="name">普通图文问诊</p>
            <p class="dose">二甲主治及以上级别医生</p>
          </div>
          <van-icon name="arrow"></van-icon>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MyNavBar from '@/components/MyNavBar.vue'
import { useCoulstStore } from '@/stores/coulst'
import { IllnessType } from '@/enum/couslt'
const useCoulst = useCoulstStore()
</script>

<style lang="scss" scoped>
.imgBox {
  padding-top: 66px;
  padding-bottom: 20px;
  text-align: center;
  .fastImg {
    width: 240px;
    height: 206px;
  }
  .title {
    color: var(--cp-text2);
    font-size: 18px;
    margin-top: 5px;
    .color {
      color: var(--cp-disable);
    }
  }
}

.wriper {
  padding: 15px;
  .main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
    border: 1px solid var(--cp-line);
    padding: 15px 10px;
    border-radius: 5px;
    .icons {
      font-size: 40px;
    }
    .content {
      flex: 1;
      margin-left: 10px;
      .name {
        font-size: 16px;
      }
      .dose {
        font-size: 13px;
        color: var(--cp-disable);
        margin-top: 5px;
      }
    }
  }
}
</style>
