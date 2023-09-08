<template>
  <div class="van-pull-refresh__track" v-for="(item, index) in list" :key="index">
    <p class="notfiy">
      <span class="msg-tip" v-if="item.msgType === MsgType.Notify">
        <span>{{ item.msg.content }}</span>
      </span>
    </p>
    <div class="msg-illness" v-if="item.msgType == MsgType.CardPat">
      <div class="bottom">
        <p>
          {{ item.msg.consultRecord.patientInfo.name }}
          {{ item.msg.consultRecord.patientInfo.genderValue }}
          {{ item.msg.consultRecord.patientInfo.age }}岁
        </p>
        <p class="date">
          {{ FilterTime(item.msg.consultRecord.patientInfo.illnessTime) }} |
          {{ FilterFlag(item.msg.consultRecord.patientInfo.illnessType) }}
        </p>
      </div>
      <van-row>
        <van-col span="6">病情描述</van-col>
        <van-col span="18">{{ item.msg.consultRecord.patientInfo.illnessDesc }}</van-col>
        <van-col span="6">图片</van-col>
        <van-col span="18">点击查看</van-col>
      </van-row>
    </div>
    <p class="notfiy">
      <span class="msg-tip notfiytip" v-if="item.msgType === MsgType.NotifyTip">
        <span>温馨提示: {{ item.msg.content }}</span>
      </span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { Message } from '@/types/room'
import { MsgType } from '@/enum/room'
import { FilterTime, FilterFlag } from '@/utils/filter'
defineProps<{
  list: Message[]
}>()
</script>

<style lang="scss" scoped>
.van-pull-refresh__track {
  margin-top: 60px;
  .notfiy {
    text-align: center;
  }
  .msg-tip {
    display: inline-block;
    background-color: #fff;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border-radius: 20px;
    color: var(--cp-disable);
    margin: 0 auto;
    padding: 0 10px;
    font-size: 13px;
  }
  .notfiytip {
    font-size: 12px;
  }
  .msg-illness {
    width: 345px;
    background-color: #fff;
    margin: 30px auto;
    box-sizing: border-box;
    padding: 15px;
    border-radius: 10px;
    .bottom {
      font-size: 16px;
      padding-bottom: 15px;
      border-bottom: 1px solid var(--cp-bg);
      .date {
        color: var(--cp-disable);
        margin-top: 5px;
        font-size: 12px;
      }
    }
    .van-row {
      margin-top: 10px;
      .van-col {
        color: var(--cp-disable);
        font-size: 12px;
        margin: 5px 0;
      }
    }
  }
}
</style>
