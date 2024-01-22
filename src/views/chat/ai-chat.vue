<template>
	<div class="chat">
		<div v-if="!$isMobile" class="model-list__wrap">
			<div class="model-list__content">
				<el-input v-model="keyword" placeholder="Search..." :prefix-icon="Search" />
				<div class="model-list scroll-bar">
					<div
						v-for="item in sessionList"
						:key="item.id"
						class="model-list__item"
						@click="changeModel(item)"
					>
						<div class="model-photo">
							<el-image :src="item.model.headUrl" fit="cover" />
						</div>
						<div class="model-name">
							<div class="model-name__name">{{ item.model.name }}</div>
							<div class="model-name__message">{{ item.model.desc }}</div>
						</div>
						<div class="model-list__operation">
							<div class="operation-icon refresh" @click="refreshSession(item)"></div>
							<div class="operation-icon delete" @click="deleteSession(item)"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="chat-content__wrap">
			<div class="content-header">
				<el-image :src="selectedModel?.headUrl" fit="cover" @click="toDetail" />
				<span @click="toDetail">{{ selectedModel?.name }}</span>
			</div>
			<ChattingRecords :model="selectedModel" :session-id="sessionId" />
		</div>
		<ChatModelInfo v-if="!$isMobile" :model="selectedModel" />
	</div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ChattingRecords from './comps/chatting-records.vue'
import ChatModelInfo from './comps/chat-model-info.vue'
import { SessionItem, ModelItem } from '@/interface/index'
import { userSessionListApi, createSessionApi, deleteSessionApi, refreshSessionApi } from '@/apis'
const keyword = ref('')
const {
	appContext: {
		config: { globalProperties },
	},
} = getCurrentInstance()

const sessionList = ref<SessionItem[]>([])
const getSessionList = async () => {
	sessionList.value = await userSessionListApi()
}
onMounted(() => {
	getSessionList()
})

// 开启会话
const sessionId = ref('')
const selectedModel = ref<ModelItem>()
const changeModel = async (session: SessionItem) => {
	selectedModel.value = session.model
	sessionId.value = session.id
	await createSessionApi(session.id)
}

// 刷新会话
const refreshSession = async (session: SessionItem) => {
	const { code, msg } = await refreshSessionApi(session.id)
	if (code === 1000) {
		getSessionList()
	} else {
		ElMessage({
			type: 'error',
			message: msg,
		})
	}
}

// 删除会话
const deleteSession = (session: SessionItem) => {
	ElMessageBox.confirm('Delete the session?', 'Warning', {
		confirmButtonText: 'OK',
		cancelButtonText: 'Cancel',
		type: 'warning',
	}).then(async () => {
		const { code, msg } = await deleteSessionApi(session.id)
		if (code === 1000) {
			ElMessage({
				type: 'success',
				message: 'Delete success',
			})
			getSessionList()
		} else {
			ElMessage({
				type: 'error',
				message: msg,
			})
		}
	})
}

const router = useRouter()
const toDetail = () => {
	if (globalProperties.$isMobile) {
		router.push({ name: 'characters-detail' })
	}
}
</script>
