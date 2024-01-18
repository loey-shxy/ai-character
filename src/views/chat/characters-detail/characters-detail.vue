<template>
	<div class="chat characters-detail scroll-bar">
		<div class="back" @click="back">
			<img class="icon" src="@/assets/image/back.png" />
			<span>Back</span>
		</div>
		<ChatModelInfo :chat-model-list="chatModelList" :selected-model="selectedModel" />
	</div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import ChatModelInfo from '../comps/chat-model-info.vue'
import { ModelInfo } from '@/interface/interface'
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

const router = useRouter()
const back = () => {
	router.back()
}
</script>
