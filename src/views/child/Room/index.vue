<template>
  <div class="room-page">
    <MyNavBar :back="() => $router.push('/user/consult')" title="问诊室" />
    <TimeStatus></TimeStatus>
    <RoomCart :list="list"></RoomCart>
    <!-- <van-button @click="$router.push('/drug/order?id=' + 6938969496473600)">购买药品</van-button> -->
    <RoomBar></RoomBar>
  </div>
</template>

<script lang="ts" setup>
import MyNavBar from '@/components/MyNavBar.vue'
import TimeStatus from './component/TimeStatus.vue'
import RoomCart from './component/RoomCart.vue'
import RoomBar from './component/RoomBar.vue'
import { onMounted, ref } from 'vue'
import io from 'socket.io-client'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import type { Message, TimeMessages } from '@/types/room'
import { MsgType } from '@/enum/room'
const route = useRoute()
const useUser = useUserStore()
const list = ref<Message[]>([])
onMounted(() => {
  const socket = io('https://consult-api.itheima.net', {
    query: {
      orderId: route.query.orderId
    },
    auth: {
      token: 'Bearer ' + useUser.user?.token
    }
  })

  //监听是否连接成功
  socket.on('connect', () => {
    console.log('连接成功')
  })

  //监听是否连接失败
  socket.on('error', (e) => {
    console.log('连接失败', e)
  })

  //断开连接
  socket.on('disconnect', () => {
    console.log('断开连接')
  })

  //获取服务器响应客户端的数据
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    let arr: Message[] = []
    data.forEach((item) => {
      arr.push({
        id: item.createTime,
        msgType: MsgType.Notify,
        createTime: item.createTime,
        msg: {
          content: item.createTime
        }
      })
      arr.push(...item.items)
    })
    list.value = arr
    console.log(arr)

    console.log(list.value)
  })
})
</script>

<style lang="scss" scoped>
.room-page {
  padding-top: 46px;
  background-color: var(--cp-bg);
  min-height: 100vh;
}
</style>
