<template>
  <div class="sign-in">
    <div class="sign-wrap">
      <div class="sign-title">Welcome Back</div>
      <div class="sign-subtitle">Sign Up Your Account</div>
      <SignForm />
      <div class="tips">
        Already have an account yet?
        <router-link :to="{ name: 'sign-in' }" class="link-text">Sign In</router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SignForm from '../sign-in/comps/sign-form.vue'
import { onMounted } from 'vue'
import { signInApi } from '@/apis'
import { setGuestToken } from '@/utils/cookie'

onMounted(() => {
  guestLogin()
})

const guestLogin = async () => {
  const { data, code, msg } = await signInApi({
    username: '',
    password: '',
    passport: 'FRONT-GUEST',
  })

  if (code === 1000) {
    setGuestToken(`Friend ${data.token}`)
  } else {
    ElMessage({
      type: 'error',
      message: msg,
    })
  }
}
</script>
