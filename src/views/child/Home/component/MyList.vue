<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <MyGoodsCard v-for="item in list" :key="item.id" :item="item" />
    </van-list>
  </div>
</template>

<script lang="ts" setup>
import MyGoodsCard from './MyGoodsCard.vue'
import type { tabType } from '@/types/knowledge'
import { getKnowLedgeApi } from '@/services/Knowledge'
import { ref } from 'vue'
import type { searchKnowledge, KnowledgeList } from '@/types/knowledge'
const props = defineProps<{
  type: tabType
}>()

const KnowLedgeInfo = ref<searchKnowledge>({
  type: props.type,
  current: 1,
  pageSize: 10
})

const list = ref<KnowledgeList[]>([])

//上拉加载
const loading = ref(false)

const finished = ref(false)

const onLoad = async () => {
  let { data } = await getKnowLedgeApi(KnowLedgeInfo.value)
  list.value.push(...data.rows)
  if (KnowLedgeInfo.value.current >= data.pageTotal) {
    finished.value = true
  } else {
    loading.value = false
    KnowLedgeInfo.value.current++
  }
}
</script>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
