<template>
  <div>
    <MyNavBar title="选择科室"></MyNavBar>
    <div class="DepMain">
      <van-sidebar v-model="active">
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
      </van-sidebar>

      <div class="sub-dep">
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
        <router-link to="/consult/illness">科室⼀</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MyNavBar from '@/components/MyNavBar.vue'
import { ref } from 'vue'

const active = ref(0)
</script>

<style lang="scss" scoped>
.DepMain {
  padding-top: 46px;
  height: calc(100vh - 46px);
  overflow: hidden;
  display: flex;
  .van-sidebar {
    width: 114px;
    .van-sidebar-item {
      color: var(--cp-dark);
      &--select {
        color: var(--cp--text1);
        font-weight: normal;
        &::before {
          display: none;
        }
      }
    }
  }
  .sub-dep {
    flex: 1;
    overflow-y: auto;
    height: 100%;
    a {
      padding: 14px 30px;
      display: block;
      color: var(--cp-dark);
    }
  }
}
</style>
