<template>
	<div class="chat">
		<div v-if="!$isMobile" class="model-list__wrap">
			<div class="model-list__content">
				<el-input v-model="keyword" placeholder="Search..." :prefix-icon="Search" />
				<div class="model-list scroll-bar">
					<div
						v-for="(item, index) in chatModelList"
						:key="item.id"
						class="model-list__item"
						@click="changeModel(index)"
					>
						<div class="model-photo">
							<el-image :src="item.photo" fit="cover" />
						</div>
						<div class="model-name">
							<div class="model-name__name">{{ item.name }}</div>
							<div class="model-name__message">{{ item.lastMsg }}</div>
						</div>
						<div class="model-list__operation">
							<div class="operation-icon refresh">
								<!-- <img src="@/assets/image/refresh.png" alt="" /> -->
							</div>
							<div class="operation-icon delete">
								<!-- <img src="@/assets/image/delete.png" alt="" /> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="chat-content__wrap">
			<div class="content-header">
				<el-image :src="chatModelList[selectedModel].photo" fit="cover" @click="toDetail" />
				<span @click="toDetail">{{ chatModelList[selectedModel].name }}</span>
			</div>
			<ChattingRecords />
		</div>
		<ChatModelInfo
			v-if="!$isMobile"
			:chat-model-list="chatModelList"
			:selected-model="selectedModel"
		/>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import ChattingRecords from './comps/chatting-records.vue'
import ChatModelInfo from './comps/chat-model-info.vue'
import { ModelInfo } from '@/interface/interface'
const keyword = ref('')
const {
	appContext: {
		config: { globalProperties },
	},
} = getCurrentInstance()

const chatModelList = reactive<ModelInfo[]>([
	{
		id: 1,
		name: 'Alexis Mary',
		photo: new URL('@/assets/image/model1.png', import.meta.url).href,
		lastMsg: `Hey, gorgeous day, isn't ...`,
	},
	{
		id: 2,
		name: 'Monroe',
		photo: new URL('@/assets/image/model2.png', import.meta.url).href,
		lastMsg: 'Give me a photo',
	},
	{
		id: 3,
		name: 'Marina',
		photo: new URL('@/assets/image/model1.png', import.meta.url).href,
		lastMsg: `Ah, space exploration! It's...`,
	},
	{
		id: 4,
		name: 'Hepburn',
		photo: new URL('@/assets/image/model2.png', import.meta.url).href,
		lastMsg: ' Always up for a chat...',
	},
])

const selectedModel = ref(0)
const changeModel = (index: number) => {
	selectedModel.value = index
}

const router = useRouter()
const toDetail = () => {
	if (globalProperties.$isMobile) {
		router.push({ name: 'characters-detail' })
	}
}
</script>
