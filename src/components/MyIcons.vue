<template>
  <svg aria-hidden="true" class="icons">
    <!-- #icon-⽂件夹名称-图⽚名称 -->
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script lang="ts" setup>
defineProps<{
  name: string
}>()
</script>

<style lang="scss" scoped>
.icons {
  width: 1em;
  height: 1em;
}
</style>
