<template>
  <div>
    <div class="room-action">
      <van-field
        type="text"
        class="input"
        :border="false"
        placeholder="问医⽣"
        autocomplete="off"
      ></van-field>
      <van-uploader :preview-image="false">
        <MyIcons name="consult-img" />
      </van-uploader>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MyIcons from '@/components/MyIcons.vue'
</script>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;

    padding: 8px 15px;
  }
  .icons {
    width: 24px;
    height: 24px;
  }
}
</style>
