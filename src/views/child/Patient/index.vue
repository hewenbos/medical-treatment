<template>
  <div>
    <MyNavBar title="家庭档案" />

    <div class="patientList">
      <div class="list1" v-for="item in patientList" :key="item.id">
        <div class="listLeft">
          <div class="itemTop">
            <span class="name">{{ item.name }}</span>

            <span class="id">{{ item.idCard }}</span>

            <div class="default" v-if="item.defaultFlag == 1">默认</div>
          </div>
          <div class="itemBottom">
            <span class="sex">{{ item.genderValue }}</span>
            <span class="age">{{ item.age + '岁' }}</span>
          </div>
        </div>
        <div class="icon"><MyIcons name="user-edit" /></div>
      </div>

      <div class="addList">
        <span class="addIcon"> <MyIcons name="user-add" /></span>
        <p>添加患者</p>
      </div>

      <div class="tip">最多可添加6人</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MyNavBar from '@/components/MyNavBar.vue'
import MyIcons from '@/components/MyIcons.vue'
import { getUserPatientApi } from '@/services/user'
import { ref } from 'vue'
import type { patientType } from '@/types/user'
const patientList = ref<patientType[]>()
const getUserPatient = async () => {
  let res = await getUserPatientApi()
  console.log(res)
  patientList.value = res.data
}
getUserPatient()
</script>

<style lang="scss" scoped>
.patientList {
  box-sizing: border-box;
  padding: 0 15px;
  padding-top: 46px;
  .list1 {
    width: 100%;
    height: 106px;
    background-color: var(--cp-line);
    border-radius: 5px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 10px;
    .listLeft {
      width: 90%;
      .itemTop {
        display: flex;
        align-items: center;

        .default {
          width: 35px;
          height: 20px;
          background-color: var(--cp-primary);
          color: #fff;
          font-size: 12px;
          text-align: center;
          line-height: 20px;
          border-radius: 3px;
        }
        .name {
          font-size: 16px;
          font-weight: 600;
        }
        .id {
          margin: 0 35px;
        }
      }
      .itemBottom {
        margin-top: 20px;
        color: var(--cp-tip);
        .sex {
          margin-right: 25px;
        }
      }
    }
    .icon {
      text-align: right;
      flex: 1;
    }
  }
  .addList {
    width: 100%;
    height: 106px;
    background-color: var(--cp-line);
    border-radius: 5px;
    margin: 20px 0;
    text-align: center;
    box-sizing: border-box;
    padding: 24px 0;
    color: var(--cp-primary);
    p {
      font-size: 18px;
    }
    .addIcon {
      font-size: 25px;
    }
  }

  .tip {
    margin: 20px 0;
    color: var(--cp-tip);
  }
}
</style>
