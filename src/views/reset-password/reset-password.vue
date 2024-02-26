<template>
  <div class="sign-in">
    <div class="sign-wrap reset-password_wrap">
      <div class="sign-title">Reset Password</div>
      <div class="sign-subtitle reset-password">
        Enter your e-mail and we will send you the instructions to reset password
      </div>
      <div class="sign-form reset-password__form">
        <el-form
          ref="ruleFormRef"
          :model="form"
          :rules="rules"
          label-position="top"
          hide-required-asterisk
        >
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" placeholder="Please enter the login email">
              <template #prefix>
                <img src="@/assets/image/email.png" alt="" />
              </template>
            </el-input>
          </el-form-item>
          <el-button type="primary" class="sign-button">Sign In</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ResetPassword } from '@/interface'
const ruleFormRef = ref<FormInstance>()
const form = reactive<ResetPassword>({
  email: '',
})
const rules = reactive<FormRules<ResetPassword>>({
  email: [{ required: true, message: 'Please enter the login email', trigger: 'blur' }],
})
</script>
