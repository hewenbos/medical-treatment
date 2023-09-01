<template>
  <div class="illness">
    <MyNavBar title="图文问诊" />
    <div class="illness-tip van-hairline--bottom">
      <img src="@/assets/avatar-doctor.svg" alt="" />
      <div class="info">
        <p class="title">在线医生</p>
        <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</p>
        <p class="safe">
          <MyIcons name="consult-safe" />
          <span>内容仅医生可见</span>
        </p>
      </div>
    </div>

    <div class="form">
      <van-field
        v-model="form.illnessDesc"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
        type="textarea"
      />
      <div class="item">
        <p>本次患病时间 ?</p>
        <div>
          <MyButton :btnList="btnList" v-model="form.illnessTime" />
        </div>
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <div>
          <MyButton :btnList="FlagList" v-model="form.consultFlag" />
        </div>
      </div>
    </div>

    <div class="uploader">
      <van-uploader
        upload-icon="photo"
        upload-text="上传图片"
        v-model="fileList"
        :after-read="afterRead"
        @delete="delImg"
      />
      <p v-if="!fileList?.length">上传内容仅医生可见,最多9张图,最大5MB</p>
    </div>

    <div class="footer">
      <van-button @click="next" type="primary" :class="{ disabled: disbale }" size="large" round
        >下一步</van-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import MyIcons from '@/components/MyIcons.vue'
import MyNavBar from '@/components/MyNavBar.vue'
import MyButton from '@/components/MyButton.vue'
import { ref, computed } from 'vue'
import { IllnessTime, ConsultFlag } from '@/enum/couslt'
import type { PickConsult, Image } from '@/types/couslt'
import { getUpLoadApi } from '@/services/consultApi'
import { showConfirmDialog, showToast } from 'vant'
import { useCoulstStore } from '@/stores/coulst'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
const router = useRouter()

const useCoulst = useCoulstStore()
const form = ref<PickConsult>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})
const btnList = ref([
  { name: '⼀周内', value: IllnessTime.Week },
  { name: '⼀⽉内', value: IllnessTime.Month },
  { name: '半年内', value: IllnessTime.HalfYear },
  { name: '半年以上', value: IllnessTime.More }
])
const FlagList = ref([
  { name: '就诊过', value: ConsultFlag.YesInspect },
  { name: '没就诊过', value: ConsultFlag.NoInspect }
])

const fileList = ref<Image[]>([])

const afterRead = async (item: any) => {
  item.status = 'uploading'
  item.message = '上传中...'

  try {
    console.log(item)

    let res = await getUpLoadApi(item.file)
    item.status = 'done'
    item.message = undefined
    form.value.pictures?.push(res.data)
    item.url = res.data.url
  } catch {
    item.status = 'failed'
    item.message = '上传失败'
  }
}

const delImg = (item: any) => {
  console.log(item)
  form.value.pictures = form.value.pictures?.filter((pic) => pic.url !== item.url)
}

const disbale = computed(() => {
  return (
    !form.value.illnessDesc ||
    form.value.consultFlag === undefined ||
    form.value.illnessTime === undefined
  )
})

const next = () => {
  if (!form.value.illnessDesc) return showToast('请输入病情描述')
  if (form.value.illnessTime === undefined) return showToast('请选择病情持续时间')
  if (form.value.consultFlag === undefined) return showToast('请选择是否已就诊')

  useCoulst.setIllness(form.value)

  router.push('/user/patient?isChange=1')
}

onMounted(() => {
  if (useCoulst.coulstInfo.illnessDesc) {
    showConfirmDialog({
      title: '温馨提示',
      message: '是否恢复您之前填写的病情信息呢？',
      closeOnPopstate: false
    })
      .then(() => {
        const { illnessDesc, illnessTime, consultFlag, pictures } = useCoulst.coulstInfo
        form.value = { illnessDesc, illnessTime, consultFlag, pictures }

        fileList.value = pictures || []
      })
      .catch(() => {
        // on cancel
      })
  }
})
</script>

<style lang="scss" scoped>
.illness {
  padding-top: 46px;
  &-tip {
    display: flex;
    // align-items: center;
    padding: 15px;
    img {
      width: 52px;
      height: 52px;
      margin-top: 15px;
    }
    .info {
      margin-left: 10px;
      .title {
        font-size: 19px;
        margin-bottom: 5px;
      }
      .tip {
        padding: 15px;
        background-color: var(--cp-bg);
        color: var(--cp-text3);
        margin-bottom: 10px;
      }
      .safe {
        display: flex;
        align-items: center;
        font-size: 15px;
        color: var(--cp-text3);
      }
    }
  }
  .form {
    .item {
      padding: 0 15px;
      margin: 10px 0;
      p {
        margin-bottom: 10px;
        color: var(--cp-text3);
      }
    }
  }
  .uploader {
    padding: 15px;
    display: flex;
    align-items: center;
    p {
      color: var(--cp-tip);
      font-size: 12px;
    }
  }
  .footer {
    margin-top: 13px;
    padding: 0 15px;
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
}
::v-deep() {
  .van-uploader {
    &__preview {
      &-delete {
        left: -6px;
        top: -6px;
        border-radius: 50%;
        background-color: var(--cp-primary);
        width: 20px;
        height: 20px;
        &-icon {
          transform: scale(0.9) translate(-22%, 22%);
        }
      }
      &-image {
        border-radius: 8px;
        overflow: hidden;
      }
    }
    &__upload {
      border-radius: 8px;
    }
    &__upload-icon {
      color: var(--cp-text3);
    }
  }
}
</style>
