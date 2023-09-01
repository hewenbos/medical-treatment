<template>
  <div>
    <MyNavBar title="选择科室"></MyNavBar>
    <div class="DepMain">
      <van-sidebar v-model="active">
        <van-sidebar-item v-for="item in depList" :key="item.id" :title="item.name" />
      </van-sidebar>

      <div class="sub-dep">
        <router-link
          to="/consult/illness"
          @click="useCoulst.setDepId(item.id)"
          v-for="item in childList"
          :key="item.id"
          >{{ item.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MyNavBar from '@/components/MyNavBar.vue'
import { getConsultDepApi } from '@/services/consultApi'
import { ref, computed } from 'vue'
import type { DepListType } from '@/types/couslt'
import { useCoulstStore } from '@/stores/coulst'

const useCoulst = useCoulstStore()
const active = ref(0)
const depList = ref<DepListType[]>([])
const getConsultDep = async () => {
  let res = await getConsultDepApi()
  depList.value = res.data
}
getConsultDep()

const childList = computed(() => {
  return depList.value[active.value]?.child
})
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
