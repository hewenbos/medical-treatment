<template>
  <div class="drugList">
    <DrugItem v-for="(item, index) in Medicals" :key="index" :item="item"></DrugItem>
  </div>
</template>

<script lang="ts" setup>
import DrugItem from './DrugItem.vue'
import type { Medical } from '@/types/drug'
defineProps<{
  Medicals: Medical[]
}>()
</script>

<style lang="scss" scoped>
.drugList {
  padding: 0 15px;
}
</style>
