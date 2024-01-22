<template>
	<div class="terms-service">
		<div class="terms-service__header">
			<h1>Terms Of Service</h1>
			<p>
				<span class="datetime">Date of Revision: [26/08/2023 ]</span>
				<span>Terms of Service of EverAl Limited</span>
			</p>
		</div>
		<div class="terms-service__content" v-html="msg"></div>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { termsOfServiceApi } from '@/apis'
import { ElMessage } from 'element-plus'
const msg = ref('')

onMounted(async () => {
	const { data, msg, code } = await termsOfServiceApi()
	if (code === 0) {
		msg.value = data
	} else {
		ElMessage({
			type: 'error',
			message: msg,
		})
	}
})
</script>
