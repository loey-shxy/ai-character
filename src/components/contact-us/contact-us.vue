<template>
	<el-dialog
		v-model="dialogVisible"
		:class="['custom-dialog', $isMobile ? 'mobile-contact-us__dialog' : 'pc-contact-us__dialog']"
		title="Contact Us"
		:before-close="close"
		append-to-body
	>
		<p>Write your message here.</p>
		<el-form ref="ruleFormRef" :mode="form" :rules="rules" hide-required-asterisk>
			<el-form-item prop="message">
				<el-input
					v-model="form.message"
					:rows="6"
					type="textarea"
					resize="none"
					placeholder="Description"
				/>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="send">Send</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface Props {
	visible: boolean
}

interface Form {
	message: string
}

const props = withDefaults(defineProps<Props>(), {
	visible: false,
})

const ruleFormRef = ref<FormInstance>()
const form = reactive<Form>({
	message: '',
})
const rules = reactive<FormRules<Form>>({
	message: [{ required: true, message: 'Please write your message', trigger: 'blur' }],
})
const emit = defineEmits(['update:visible'])
const dialogVisible = ref(false)

const close = () => {
	dialogVisible.value = false
}

const send = () => {
	dialogVisible.value = false
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
