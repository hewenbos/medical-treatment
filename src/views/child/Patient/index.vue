<template>
  <div>
    <MyNavBar :title="isChange ? '选择患者' : '家庭档案'" />

    <div class="patientList">
      <div class="patient-change" v-if="isChange">
        <h3>请选择患者信息</h3>
        <p>以便医生给出更准确的治疗，信息仅医生可见</p>
      </div>
      <div
        @click="select(item)"
        class="list1"
        v-for="item in patientList"
        :class="{ select: item.id == parinetId }"
        :key="item.id"
      >
        <div class="listLeft">
          <div class="itemTop">
            <span class="name">{{ item.name }}</span>

            <span class="id">
              {{ item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2') }}
            </span>

            <div class="default" v-if="item.defaultFlag == 1">默认</div>
          </div>
          <div class="itemBottom">
            <span class="sex">{{ item.genderValue }}</span>
            <span class="age">{{ item.age + '岁' }}</span>
          </div>
        </div>
        <div class="icon" @click="addPatient(item)"><MyIcons name="user-edit" /></div>
      </div>

      <div class="addList" @click="addPatient()" v-if="patientList && patientList?.length < 6">
        <span class="addIcon"> <MyIcons name="user-add" /></span>
        <p>添加患者</p>
      </div>

      <div class="tip">最多可添加6人</div>
    </div>

    <van-popup v-model:show="showRight" position="right" :style="{ width: '100%', height: '100%' }">
      <MyNavBar
        :back="() => (showRight = false)"
        RightText="保存"
        title="添加档案"
        @click-rigth="addOrEdit"
      />

      <van-form autocomplete="off">
        <van-field label="真实姓名" v-model="PatientForm.name"></van-field>
        <van-field label="身份证号" v-model="PatientForm.idCard"></van-field>
        <van-field label="性别">
          <template #input>
            <MyButton v-model="PatientForm.gender" :btnList="btnList"></MyButton>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox v-model="defaultFlag" />
          </template>
        </van-field>
      </van-form>

      <div class="footer" v-if="PatientForm.id">
        <van-button size="large" @click="delPatient" round>删除</van-button>
      </div>
    </van-popup>

    <div class="footer">
      <van-button @click="next" type="primary" size="large" round>下一步</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MyNavBar from '@/components/MyNavBar.vue'
import MyIcons from '@/components/MyIcons.vue'
import { getUserPatientApi } from '@/services/user'
import { ref, computed } from 'vue'
import type { patientType } from '@/types/user'
import MyButton from '@/components/MyButton.vue'
import validator from 'id-validator'
import { showToast } from 'vant'
import { getAddPatientApi, getEditPatientApi, getDelPatientApi } from '@/services/user'
import { showConfirmDialog } from 'vant'
import { useRoute } from 'vue-router'
import { useCoulstStore } from '@/stores/coulst'
import { useRouter } from 'vue-router'

const useCoulst = useCoulstStore()
const router = useRouter()
const route = useRoute()
const patientList = ref<patientType[]>()
const getUserPatient = async () => {
  let res = await getUserPatientApi()
  console.log(res)
  patientList.value = res.data

  if (isChange.value && patientList.value.length) {
    const find = patientList.value.find((item) => item.defaultFlag == 1)
    if (find) {
      parinetId.value = find.id as string
    } else {
      parinetId.value = patientList.value[0].id as string
    }
  }
}
getUserPatient()

const showRight = ref<boolean>(false)
const parinetId = ref('')

const select = (item: patientType) => {
  parinetId.value = item.id as string
}

const addPatient = (item?: patientType) => {
  showRight.value = true
  if (item) {
    const { id, gender, name, defaultFlag, idCard } = item
    PatientForm.value = { id, gender, name, defaultFlag, idCard }
  } else {
    PatientForm.value = { ...instForm }
  }
}

//按钮数据
const btnList = [
  {
    name: '男',
    value: '1'
  },
  {
    name: '女',
    value: '0'
  }
]

const instForm: patientType = {
  name: '',
  idCard: '',
  defaultFlag: 0,
  gender: 1
}
const PatientForm = ref<patientType>(instForm)

const defaultFlag = computed({
  get() {
    return PatientForm.value.defaultFlag === 1 ? true : false
  },
  set(value) {
    PatientForm.value.defaultFlag = value ? 1 : 0
  }
})

// 添加或编辑
const addOrEdit = async () => {
  if (!PatientForm.value.name) return showToast('姓名不能为空')
  if (!PatientForm.value.idCard) return showToast('身份证不能为空')

  const Validator = new validator()

  if (!Validator.isValid(PatientForm.value.idCard)) return showToast('身份证格式错误')
  const { sex } = Validator.getInfo(PatientForm.value.idCard)

  if (sex != PatientForm.value.gender) return showToast('身份证与性别不符')

  PatientForm.value.id
    ? await getEditPatientApi(PatientForm.value)
    : await getAddPatientApi(PatientForm.value)
  showToast(PatientForm.value.id ? '编辑用户成功' : '添加用户成功')
  showRight.value = false

  getUserPatient()
}

const delPatient = () => {
  showConfirmDialog({
    title: '温馨提示',
    message: `您确定要删除 ${PatientForm.value.name} 患者嘛?`
  })
    .then(async () => {
      // on confirm
      await getDelPatientApi(PatientForm.value.id as string)
      showToast('删除成功')
      getUserPatient()
    })
    .catch(() => {
      // on cancel
    })
}

const isChange = computed(() => {
  return route.query.isChange
})

const next = () => {
  if (!parinetId.value) return showToast('请选择患者')

  useCoulst.setPatient(parinetId.value)

  router.push('/consult/pay')
}
</script>

<style lang="scss" scoped>
.patientList {
  box-sizing: border-box;
  padding: 0 15px;
  padding-top: 46px;
  .patient-change {
    padding: 15px;
    h3 {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 5px;
    }
    p {
      color: var(--cp-text3);
    }
  }
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
    border: 1px solid var(--cp-line);
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
          width: 50px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .id {
          margin: 0 35px;
          width: 140px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
  .select {
    border: 1px solid var(--cp-primary);
  }
  .addList {
    width: 100%;
    height: 80px;
    background-color: var(--cp-line);
    border-radius: 5px;
    margin: 20px 0;
    text-align: center;
    box-sizing: border-box;
    padding: 12px 0;
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
::v-deep() {
  .van-popup {
    .van-form {
      margin-top: 46px;
    }
    .footer {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      position: fixed;
      left: 0;
      bottom: 0;
      .van-button {
        width: 100%;
        color: #f00;
      }
    }
  }
}
.footer {
  position: fixed;
  left: 0;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  bottom: 30px;
  ::v-deep() {
    .van-button--primary {
      background-color: var(--cp-primary);
      border-color: var(--cp-primary);
      height: 44px;
      font-size: 14px;
    }
  }
  .disabled {
    background-color: var(--cp-bg);
    border-color: var(--cp-bg);
    color: var(--cp-tip);
  }
}
</style>
