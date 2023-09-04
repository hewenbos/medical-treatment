<template>
  <div class="list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ConsultItem
        @delConsult="delConsult"
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      ></ConsultItem>
    </van-list>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ConsultItem from './ConsultItem.vue'
import { getConsultListApi } from '@/services/consultApi'
import type { ConsultOrderItem } from '@/types/couslt'
import type { searchKnowledge } from '@/types/knowledge'
const { type } = defineProps<{
  type: number
}>()
console.log(type)

const loading = ref(false)
const finished = ref(false)
const list = ref<ConsultOrderItem[]>([])
const consultPage = ref<searchKnowledge>({
  type: type,
  current: 1,
  pageSize: 10
})
const onLoad = async () => {
  const { data } = await getConsultListApi(consultPage.value)

  list.value.push(...data.rows)

  if (consultPage.value.current >= data.pageTotal) {
    finished.value = true
  } else {
    consultPage.value.current++
    loading.value = false
  }
}

//父组件监听删除事件
const delConsult = (id: string) => {
  list.value = list.value.filter((item) => item.id !== id)
}
</script>

<style lang="scss" scoped>
.list {
  padding: 0 15px;
}
</style>
