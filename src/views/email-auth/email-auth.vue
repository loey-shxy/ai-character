<template>
  <div class="sign-in email-auth">
    <div v-if="isVerified" class="title">Email Verification Successful</div>
    <div v-else class="title">Verifying Email ...</div>
    <el-button v-if="isVerified" type="primary" class="sign-button" @click="login"
      >Sign In</el-button
    >
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { isEmpty } from 'lodash'
import { useRoute, useRouter } from 'vue-router'
import { emailAuthApi } from '@/apis'
import { ElMessage } from 'element-plus'

const route = useRoute()
onMounted(async () => {
  const query = route.query
  if (!isEmpty(query)) {
    emailAuth(query.u as string, query.cf as string)
  }
})

const isVerified = ref(false)
const router = useRouter()
const emailAuth = async (accountId: string, authCode: string) => {
  const { code, msg } = await emailAuthApi({
    accountId,
    code: authCode,
  })

  if (code === 1000) {
    isVerified.value = true
  } else {
    ElMessage({
      type: 'error',
      message: msg,
    })
  }
}

const login = () => {
  router.push({ name: 'sign-up' })
}
</script>
