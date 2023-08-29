<template>
  <div class="user-page">
    <div class="user-page-header">
      <div class="top">
        <van-image round fit="cover" width="70px" height="70px" :src="useInfo?.avatar" />
        <div class="name">
          <p>{{ useInfo?.account }}</p>
          <p><van-icon name="edit" /></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>
            <b>{{ useInfo?.collectionNumber }}</b>
          </p>
          <span>收藏</span>
        </van-col>
        <van-col span="6">
          <p>
            <b>{{ useInfo?.likeNumber }}</b>
          </p>
          <span>关注</span>
        </van-col>
        <van-col span="6">
          <p>
            <b>{{ useInfo?.score }}</b>
          </p>
          <span>积分</span>
        </van-col>
        <van-col span="6">
          <p>
            <b>{{ useInfo?.couponNumber }}</b>
          </p>
          <span>优惠卷</span>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-main">
      <div class="Drug-orders">
        <div class="drug-top">
          <h2>药品订单</h2>
          <span>全部订单 <van-icon name="arrow" /></span>
        </div>
        <van-row>
          <van-col span="6">
            <p>
              <MyIcons :name="'user-paid'"></MyIcons>
            </p>
            <span>待付款</span>
          </van-col>
          <van-col span="6">
            <p>
              <MyIcons :name="'user-shipped'"></MyIcons>
            </p>
            <span>待发货</span>
          </van-col>
          <van-col span="6">
            <p>
              <MyIcons :name="'user-received'"></MyIcons>
            </p>
            <span>待收货</span>
          </van-col>
          <van-col span="6">
            <p><MyIcons :name="'user-finished'"></MyIcons></p>
            <span>已完成</span>
          </van-col>
        </van-row>
      </div>
      <div class="Quick-Tools">
        <h2>快捷工具</h2>
        <div class="tools">
          <van-cell
            v-for="(item, index) in QuickList"
            :title="item.title"
            :key="index"
            is-link
            :border="false"
            @click="router.push(item.path)"
          >
            <template #icon>
              <span><MyIcons :name="`user-tool-0${index + 1}`" /></span>
            </template>
          </van-cell>
        </div>
      </div>
    </div>
    <footer>
      <a class="logout" href="javascript:;" @click="logout">退出登录</a>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import MyIcons from '@/components/MyIcons.vue'
import { getUserInfoApi } from '@/services/login'
import { ref } from 'vue'
import type { userInfo } from '@/types/user'
import { useUserStore } from '@/stores/user'
import { showConfirmDialog } from 'vant'
import { useRouter } from 'vue-router'
const router = useRouter()
const useStore = useUserStore()
const useInfo = ref<userInfo>()
const getUserInfo = async () => {
  let res = await getUserInfoApi()
  console.log(res)
  useInfo.value = res.data
}
getUserInfo()

const QuickList = [
  {
    title: '我的问诊',
    path: '/user/consult'
  },
  {
    title: '我的处方',
    path: '/'
  },
  {
    title: '家庭档案',
    path: '/user/patient'
  },
  {
    title: '地址管理',
    path: '/user/address'
  },
  {
    title: '我的评价',
    path: '/'
  },
  {
    title: '官⽅客服',
    path: '/'
  },
  {
    title: '设置',
    path: '/'
  }
]

//退出登录
const logout = () => {
  showConfirmDialog({
    title: '退出登录',
    message: '您确定要退出优医问诊吗?'
  })
    .then(() => {
      useStore.removeToken()
      router.push('/login')
    })
    .catch(() => {
      // on cancel
    })
}
</script>

<style lang="scss" scoped>
.user-page {
  width: 100%;
  box-sizing: border-box;
  min-height: calc(100vh - 50px);
  padding-bottom: 60px;
  background: linear-gradient(180deg, rgba(176, 218, 213, 0.46), rgba(78, 189, 174, 0.1));
  &-header {
    width: 100%;
    height: 210px;
    margin: 0;
    padding: 0 15px;
    box-sizing: border-box;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
    .top {
      padding-top: 40px;
      display: flex;
      align-items: center;
      .name {
        margin-left: 10px;
        p:last-child {
          margin-top: 10px;
          color: var(--cp-primary);
          font-size: 16px;
        }
        p:first-child {
          font-size: 18px;
          font-weight: 500;
        }
      }
    }

    .van-row {
      margin: 0 -15px;
      margin-top: 15px;
      .van-col {
        text-align: center;
        span {
          color: var(--cp-tip);
        }
      }
    }
  }
  &-main {
    padding: 0 15px;
    box-sizing: border-box;
    .Drug-orders {
      padding: 10px;
      border-radius: 5px;
      background-color: #fff;
      .drug-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        h2 {
          font-weight: 600;
          font-size: 18px;
        }
        span {
          color: var(--cp-primary);
        }
      }
      .van-row {
        margin-top: 10px;
        .van-col {
          text-align: center;
          p {
            font-size: 35px;
          }
          span {
            color: var(--cp-text1);
          }
        }
      }
    }
    .Quick-Tools {
      margin-top: 28px;
      padding: 10px;
      background-color: #fff;
      border-radius: 5px;
      h2 {
        font-weight: 600;
        font-size: 18px;
      }
      .tools {
        .van-cell {
          span {
            font-size: 20px;
            margin-right: 10px;
          }
        }
      }
    }
  }
  footer {
    text-align: center;
    .logout {
      display: block;
      margin: 20px auto;
      width: 100px;
      text-align: center;
      color: var(--cp-orange);
    }
  }
}
</style>
