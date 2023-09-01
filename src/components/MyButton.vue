<template>
  <div>
    <a
      href="javascript:;"
      :class="{ active: modelValue == item.value }"
      v-for="(item, index) in btnList"
      :key="index"
      class="item"
      @click="BtnStatus(item.value)"
      >{{ item.name }}</a
    >
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  btnList: {
    name: string
    value: string | number
  }[]
  modelValue: string | number | undefined
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()
const BtnStatus = (value: string | number) => {
  emits('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
.item {
  display: inline-block;
  width: 65px;
  height: 35px;
  background-color: var(--cp-bg);
  margin-right: 10px;
  text-align: center;
  line-height: 35px;
  border-radius: 5px;
  transition: all 0.3s;
  border: 1px solid var(--cp-bg);
}
.active {
  border: 1px solid var(--cp-primary);
}
</style>
