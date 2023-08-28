<template>
  <div class="login-page">
    <my-nav-bar
      :title="title"
      :RightText="RightText"
      @clickRight="$router.push('/register')"
    ></my-nav-bar>

    <div class="login-header">
      <h3>{{ isFlag ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isFlag = !isFlag">
        <span>{{ isFlag ? '短信验证码登录' : '密码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>

    <van-form @submit="onsubmit">
      <van-cell-group>
        <van-field v-model="loginForm.mobile" placeholder="请输入手机号" :rules="mobileRules" />
        <van-field
          v-model="loginForm.password"
          placeholder="请输入密码"
          :type="iconsFlag ? 'text' : 'password'"
          :rules="passwordRules"
          v-if="isFlag"
        >
          <template #button>
            <my-icons
              @click="iconsFlag = !iconsFlag"
              class="icons"
              :name="iconsFlag ? 'login-eye-on' : 'login-eye-off'"
            ></my-icons>
          </template>
        </van-field>
        <van-field v-else v-model="loginForm.code" placeholder="请输入验证码" :rules="codeRules">
          <template #button>
            <span @click="getCode">
              {{ times > 0 ? times + 's后获取验证码' : '获取短信验证码' }}</span
            >
          </template>
        </van-field>
        <div class="cell">
          <van-checkbox v-model="checked">
            <span>我已同意</span>&nbsp; <a href="javascript:;">用户协议</a>&nbsp;
            <span>及</span>&nbsp;
            <a href="javascript:;">隐私条款</a>
          </van-checkbox>
        </div>
        <div class="cell">
          <van-button block round type="primary" native-type="submit">登录</van-button>
        </div>
      </van-cell-group>
    </van-form>

    <div class="login-footer">
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
        第三方登录
      </van-divider>
      <div class="icons">
        <img class="svg" src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { getloginApi, getCodeApi, getCodeLoginApi } from '@/services/login'
import type { ILogin } from '@/types/Login'
import type { userType, codeType } from '@/types/user'
import MyNavBar from '@/components/MyNavBar.vue'
import MyIcons from '@/components/MyIcons.vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/loginRule'
import { showToast } from 'vant'
import { useUserStore } from '@/stores/user'
import { onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const title = ref<string>('登录')
const RightText = ref<string>('注册')

const isFlag = ref(true)

const loginForm = reactive<ILogin>({
  mobile: '13211112222',
  password: 'abc12345',
  code: ''
})
const checked = ref<boolean>(false)
const iconsFlag = ref<boolean>(false)

const onsubmit = async () => {
  if (!checked.value) return showToast('请勾选用户协议')
  if (!isFlag.value) {
    if (codes.value != loginForm.code) return showToast('验证码错误')
  }
  try {
    let { data } = isFlag.value
      ? await getloginApi<userType>({ mobile: loginForm.mobile, password: loginForm.password })
      : await getCodeLoginApi<userType>({ mobile: loginForm.mobile, code: loginForm.code })

    userStore.setToken(data)
    console.log(route.query)

    router.replace((route.query.returnUrl as string) || '/user')
    showToast('登录成功')
  } catch (error) {
    console.log(error)
  }
}

//获取短信验证码
let times = ref<number>(0)
let time = 0
let codes = ref<string>('')
const getCode = () => {
  if (times.value > 0) return
  showToast('发送验证码')
  getCodeApi<codeType>({ mobile: loginForm.mobile, type: 'login' }).then((res) => {
    console.log(res.data)
    codes.value = res.data?.code as string
  })

  times.value = 60

  clearInterval(time)
  time = setInterval(() => {
    times.value--

    if (times.value <= 0) {
      clearInterval(time)
    }
  }, 1000)
}

onUnmounted(() => {
  clearInterval(time)
})
</script>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }

  &-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 10px;
    padding: 0 15px;

    h3 {
      font-size: 20px;
      font-weight: 500;
    }

    a {
      font-size: 15px;
    }
  }
  &-footer {
    margin-top: 50px;
  }
}
::v-deep() {
  .van-form {
    margin-top: 40px;
    .cell {
      padding: 0 15px;
      margin: 10px 0;
      --van-button-primary-background: var(--cp-primary);
      --van-button-primary-border-color: var(--cp-primary);
      a {
        color: var(--cp-primary);
      }
    }
    .van-cell {
      margin: 10px 0;
    }
    .van-checkbox {
      --van-checkbox-size: 15px;
    }
    .van-button {
      margin-top: 20px;
    }
  }
}

.icons {
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  .svg {
    width: 30px;
    height: 30px;
  }
}
</style>
