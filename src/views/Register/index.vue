<template>
  <my-nav-bar
    :title="title"
    :RightText="RightText"
    @clickRight="$router.push('/login')"
  ></my-nav-bar>
</template>

<script lang="ts" setup>
import MyNavBar from '@/components/MyNavBar.vue'
import { ref } from 'vue'
const title = ref<string>('注册')
const RightText = ref<string>('登录')
</script>

<style lang="scss" scoped></style>
