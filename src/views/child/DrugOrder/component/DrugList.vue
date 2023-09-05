<template>
  <div class="drugList">
    <DrugItem v-for="(item, index) in 5" :key="index"></DrugItem>
  </div>
</template>

<script lang="ts" setup>
import DrugItem from './DrugItem.vue'
</script>

<style lang="scss" scoped>
.drugList {
  padding: 0 15px;
}
</style>
