<template>
  <div class="age-verification">
    <div v-if="showAge" class="age-verification__content">
      <h1>Age verification</h1>
      <div class="desc">
        This website contains age limited content, including nude and explicit pornographic
        materials. By logging in, you confirm that you are over 18 years old or that you are an
        adult in the jurisdiction where you visited this website.
      </div>
      <div class="footer">
        <el-button type="primary" @click="toHome">I am over 18 years old - login</el-button>
        <el-button type="info">I am under 18- Exit</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getToken, getGuestToken } from '@/utils/cookie'
const router = useRouter()

const showAge = ref(false)
onMounted(() => {
  if (!getToken() && !getGuestToken()) {
    showAge.value = true
  } else {
    router.push({ name: 'explore' })
  }
})
const toHome = () => {
  router.push({ name: 'explore' })
}
</script>
