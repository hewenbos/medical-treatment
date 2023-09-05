<template>
  <div class="drugItem">
    <img src="http://img.39.net/yp/jzlr/296638.jpg" alt="" />
    <div class="info">
      <p class="name">
        <span class="drugName">伤湿止痛膏(羚锐)</span>
        <span class="num">×8</span>
      </p>
      <p class="size">
        <span class="detail">处方药</span>
        <span class="drugsize">7cm×10cm</span>
      </p>
      <p class="price">￥110</p>
    </div>
    <div class="desc">外用。贴于患处.</div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.drugItem {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 15px 0;
  border-bottom: 1px solid var(--cp-bg);
  img {
    width: 80px;
    height: 70px;
    margin-right: 10px;
  }
  .info {
    width: calc(100vw - 120px);
    .name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--cp-text1);
      .drugName {
        font-size: 16px;
      }
    }
    .size {
      margin: 10px 0;
      display: flex;
      align-items: center;
      .detail {
        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45px;
        height: 20px;
        text-align: center;
        background-color: var(--cp-primary);
        color: #fff;
        font-size: 12px;
        border-radius: 3px;
        margin-right: 10px;
      }
      .drugsize {
        display: inline-block;
        color: var(--cp-tag);
      }
    }
    .price {
      color: #f00;
      font-size: 17px;
    }
  }
  .desc {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: var(--cp-bg);
    color: var(--cp-tip);
  }
}
</style>
