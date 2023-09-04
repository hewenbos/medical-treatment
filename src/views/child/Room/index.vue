<template>
  <div></div>
</template>

<script lang="ts" setup>
import { onBeforeRouteLeave } from 'vue-router'

onBeforeRouteLeave(() => {
  return '/'
})
</script>

<style lang="scss" scoped></style>
