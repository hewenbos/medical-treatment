<template>
  <div class="amap-layer-page">
    <div class="amap-layer">
      <div class="title">
        <van-icon name="arrow-left" />
        <span>{{ logisticsInfo?.statusValue }}</span>
        <van-icon name="service-o" />
      </div>
      <div id="App"></div>
      <div class="current">
        <p class="status">{{ logisticsInfo?.statusValue }} {{ logisticsInfo?.estimatedTime }}</p>
        <p class="predict">
          <span>{{ logisticsInfo?.name }}</span>
          <span>{{ logisticsInfo?.awbNo }}</span>
        </p>
      </div>
    </div>
    <div class="logistics">
      <p class="title">物流详情</p>
      <van-steps direction="vertical" :active="0">
        <van-step v-for="(item, index) in logisticsInfo?.list" :key="index">
          <p class="status">{{ item.statusValue }}</p>
          <p class="content">{{ item.content }}</p>
          <p class="time">{{ item.createTime }}</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script lang="ts" setup>
import carImg from '@/assets/car.png'
import { useRoute } from 'vue-router'
import AMapLoader from '@amap/amap-jsapi-loader'
const route = useRoute()
import { getLogisticsApi } from '@/services/drug'
import { onUpdated, ref } from 'vue'
import type { Logistics } from '@/types/logistics'
// import { onUpdated } from 'vue'

const logisticsInfo = ref<Logistics>()
const getLogistics = async () => {
  let res = await getLogisticsApi(route.params.id as string)
  logisticsInfo.value = res.data
}
getLogistics()

window._AMapSecurityConfig = {
  securityJsCode: '415e917da833efcf2d5b69f4d821784b'
}

onUpdated(() => {
  AMapLoader.load({
    key: '4eed3d61125c8b9c168fc22414aaef7e', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0' // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  })
    .then((AMap) => {
      console.log(AMap)
      const map = new AMap.Map('App', {
        mapStyle: 'amap://styles/whitesmoke',
        zoom: 12
      })
      AMap.plugin('AMap.Driving', function () {
        const driving = new AMap.Driving({
          map: map,
          showTraffic: false
        })

        //起点
        console.log('222=>', logisticsInfo)
        const start = logisticsInfo?.value?.logisticsInfo.shift()
        //终点
        const end = logisticsInfo?.value?.logisticsInfo.pop()
        //参数1起点的经纬度 参数2终点的经纬度 参数3中间的经纬度
        driving.search([start?.longitude, start?.latitude], [end?.longitude, end?.latitude], {
          waypoints: logisticsInfo.value?.logisticsInfo.map((item) => [
            item.longitude,
            item.latitude
          ])
        })

        const marker = new AMap.Marker({
          icon: carImg,
          position: [
            logisticsInfo.value?.currentLocationInfo.longitude,
            logisticsInfo.value?.currentLocationInfo.latitude
          ],
          anchor: 'center'
        })
        map.add(marker)

        setTimeout(() => {
          map.setFitView([marker])
          map.setZoom(10)
        }, 3000)
      })
    })
    .catch((e) => {
      console.log(e)
    })
})
</script>

<style lang="scss" scoped>
.amap-layer-page {
  .amap-layer {
    width: 100%;
    height: 450px;
    position: relative;

    .title {
      width: 355px;
      position: absolute;
      left: 10px;
      top: 10px;
      background-color: #fff;
      height: 46px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 15px;
      font-size: 16px;
      z-index: 99;
      > span {
        flex: 1;
        text-align: center;
      }

      ::v-deep {
        .van-icon {
          font-size: 17px;
          color: var(--cp-primary);
        }
      }
    }

    .current {
      width: 355px;
      position: absolute;
      left: 10px;
      bottom: 10px;
      background-color: #fff;
      height: 80px;
      box-sizing: border-box;
      padding: 15px;
      border-radius: 5px;
      z-index: 999;
      .status {
        margin-bottom: 10px;
        font-size: 15px;
      }

      .predict {
        color: var(--cp-tip);
        font-size: 13px;

        > span {
          margin-right: 10px;
        }
      }
    }

    #App {
      width: 100%;
      height: 450px;
    }
  }

  .logistics {
    padding: 0 15px;

    .title {
      font-size: 17px;
      margin: 15px 0;
    }

    .van-steps {
      :deep(.van-step) {
        &::after {
          display: none;
        }
      }

      .status {
        font-size: 15px;
        color: var(--cp-text3);
        margin-bottom: 4px;
      }

      .content {
        font-size: 13px;
        color: var(--cp-tip);
        margin-bottom: 4px;
      }

      .time {
        font-size: 13px;
        color: var(--cp-tag);
      }
    }
  }
}
</style>
