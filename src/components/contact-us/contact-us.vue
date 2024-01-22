<template>
	<el-dialog
		v-model="dialogVisible"
		:class="['custom-dialog', $isMobile ? 'mobile-contact-us__dialog' : 'pc-contact-us__dialog']"
		title="Contact Us"
		:before-close="close"
		append-to-body
	>
		<p>Write your message here.</p>
		<el-form ref="ruleFormRef" :model="form" :rules="rules" hide-required-asterisk>
			<el-form-item prop="msg">
				<el-input
					v-model="form.msg"
					:rows="6"
					type="textarea"
					resize="none"
					placeholder="Description"
				/>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="send(ruleFormRef)">Send</el-button>
			</span>
		</template>msg
	</el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ContactUsParams } from '@/interface'
import { contactUsApi } from '@/apis'
import { ElMessage } from 'element-plus'

interface Props {
	visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
	visible: false,
})

const ruleFormRef = ref<FormInstance>()
const form = reactive<ContactUsParams>({
	msg: '',
})
const rules = reactive<FormRules<ContactUsParams>>({
	msg: [{ required: true, message: 'Please write your message', trigger: 'blur' }],
})
const emit = defineEmits(['update:visible'])
const dialogVisible = ref(false)

const close = () => {
	dialogVisible.value = false
}

const send = async (formEl: FormInstance) => {
	if (!formEl) {
		return
	}
	await formEl.validate(async (valid) => {
		if (valid) {
			const { code, msg } = await contactUsApi(form)
			if (code === 1000) {
				ElMessage({
					type: 'success',
					message: 'Successfully!',
				})
				close()
			} else {
				ElMessage({
					type: 'error',
					message: msg,
				})
			}
		}
	})
}

watch(
	() => dialogVisible.value,
	(val) => {
		emit('update:visible', val)
	}
)

watch(
	() => props.visible,
	(val) => {
		dialogVisible.value = val
	}
)
</script>
