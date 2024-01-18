<template>
	<div class="sign-form">
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
			<el-button type="primary" class="sign-button" @click="login">{{
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

		<AgeVerification v-model:visible="ageVisible" />
	</div>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { SignIn } from '@/interface/interface'
import AgeVerification from '@/components/age-verification/age-verification.vue'

const ageVisible = ref(false)
const ruleFormRef = ref<FormInstance>()
const form = reactive<SignIn>({
	email: '',
	password: '',
})
const rules = reactive<FormRules<SignIn>>({
	email: [{ required: true, message: 'Please enter the login email', trigger: 'blur' }],
	password: [{ required: true, message: 'Please enter the login password', trigger: 'blur' }],
})
const router = useRouter()
const isSignIn = computed(() => {
	return router.currentRoute.value.name === 'sign-in'
})

const login = () => {
	ageVisible.value = true
}
</script>
