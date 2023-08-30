<template>
  <div class="doctor-page">
    <div class="doctor-page-header">
      <span>推荐关注</span>
      <a>查看更多 <i class="van-icon van-icon-arrow" /></a>
    </div>

    <div class="doctor-page-body">
      <van-swipe :width="150" :loop="false" :show-indicators="false">
        <van-swipe-item v-for="(item, index) in 5" :key="index">
          <div class="card">
            <van-image
              round
              width="70px"
              height="70px"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
            <p class="name">王医生</p>
            <p class="doce van-ellipsis">甘肃省妇幼保健院 中医皮肤科</p>
            <span class="doce">副主任医生</span>

            <p class="footer">
              <van-button class="btn" round>+ 关注</van-button>
            </p>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.doctor-page {
  height: 250px;
  background-color: var(--cp-bg);
  padding: 5px 15px;
  &-header {
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      font-size: 14px;
      color: var(--cp-disable);
    }
    span {
      color: var(--cp-text2);
      font-size: 14px;
    }
  }
  &-body {
    padding: 10px;
    ::v-deep() {
      .van-swipe-item {
        .card {
          border-radius: 15px;
          height: 190px;
          background-color: #fff;
          text-align: center;
          box-sizing: border-box;
          padding: 10px;
          margin-left: 15px;
          width: 135px;
          .name {
            margin: 5px 0;
          }
          .doce {
            font-size: 13px;
            color: var(--cp-tip);
          }
        }
      }
    }
  }
}
::v-deep() {
  .btn {
    width: 70px;
    height: 30px;
    color: #fff;
    --van-button-default-background: var(--cp-primary);
    font-size: 12px;
  }
}
</style>
