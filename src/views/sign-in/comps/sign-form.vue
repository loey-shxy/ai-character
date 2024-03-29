<template>
  <div class="sign-form">
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-position="top"
      hide-required-asterisk
      @keyup.enter.prevent="submitForm(ruleFormRef)"
    >
      <el-form-item label="Email" prop="username">
        <el-input v-model="form.username" placeholder="Please enter the login username">
          <template #prefix>
            <img src="@/assets/image/email.png" alt="" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="Please enter the login password"
        >
          <template #prefix>
            <img src="@/assets/image/password.png" alt="" />
          </template>
        </el-input>
      </el-form-item>
      <div v-if="isSignIn && !$isMobile" class="forget-password">
        <router-link :to="{ name: 'reset-password' }">Forgot Your Password?</router-link>
      </div>
      <el-button type="primary" class="sign-button" @click="submitForm(ruleFormRef)">{{
        isSignIn ? 'Sign In' : 'Sign Up'
      }}</el-button>
      <div v-if="isSignIn && $isMobile" class="forget-password">
        <router-link :to="{ name: 'reset-password' }">Forgot Your Password?</router-link>
      </div>
      <div v-if="!isSignIn" class="service">
        By signing up, you agree to
        <router-link :to="{ name: 'terms-of-service' }">Terms of Service</router-link>
      </div>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { SignInParams } from '@/interface'
import { signInApi, signUpApi, userInfoApi } from '@/apis'
import { setToken, removeGuestToken, setUserInfo } from '@/utils/cookie'
import { ElMessage } from 'element-plus'

const ruleFormRef = ref<FormInstance>()
const form = reactive<SignInParams>({
  username: '',
  password: '',
  passport: '',
})
const rules = reactive<FormRules<SignInParams>>({
  username: [{ required: true, message: 'Please enter the login username', trigger: 'blur' }],
  password: [{ required: true, message: 'Please enter the login password', trigger: 'blur' }],
})
const router = useRouter()
const isSignIn = computed(() => {
  return router.currentRoute.value.name === 'sign-in'
})

const login = async () => {
  const { data, code, msg } = await signInApi({
    ...form,
    passport: 'FRONT',
  })
  if (code === 1000) {
    setToken({
      key: 'token',
      token: `Friend ${data.token}`,
    })
    const userInfo = await userInfoApi()
    setUserInfo(userInfo)
    removeGuestToken()
    router.push({ name: 'explore' })
  } else {
    ElMessage({
      type: 'error',
      message: msg,
    })
  }
}

const register = async () => {
  await signUpApi({
    account: form.username,
    password: form.password,
  })
  router.push({ name: 'email-auth' })
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  await formEl.validate(async (valid) => {
    if (!valid) {
      return
    }

    if (isSignIn.value) {
      login()
    } else {
      register()
    }
  })
}
</script>
