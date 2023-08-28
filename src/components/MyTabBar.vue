<template>
  <van-tabbar route>
    <van-tabbar-item to="/home">
      ⾸⻚
      <template #icon="{ active }">
        <my-icons :name="`home-index-${active ? 'active' : 'default'}`" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/article">
      健康百科
      <template #icon="{ active }">
        <my-icons :name="`home-article-${active ? 'active' : 'default'}`" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/notify">
      消息中⼼
      <template #icon="{ active }">
        <my-icons :name="`home-notice-${active ? 'active' : 'default'}`" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/user">
      我的
      <template #icon="{ active }">
        <my-icons :name="`home-mine-${active ? 'active' : 'default'}`" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import MyIcons from './MyIcons.vue'
</script>

<style lang="scss" scoped></style>
