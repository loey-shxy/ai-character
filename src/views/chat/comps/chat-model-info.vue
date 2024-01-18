<template>
	<div class="model-info">
		<div class="model-info__photo-list">
			<el-carousel :autoplay="false" arrow="always">
				<el-carousel-item v-for="img in images" :key="img">
					<el-image :src="img" fit="cover" />
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="model-info__detail">
			<div class="model-info__detail-instruc">
				<div class="model-info__detail-name">{{ chatModelList[selectedModel].name }}</div>
				<div
					:class="[
						'model-info__detail-instruction text-line-clamp',
						isLogin ? 'text-line-clamp__3' : 'text-line-clamp__6',
					]"
				>
					Digital muse and trendsetter, known as the perfect girl next door, finds herself in a cozy
					local coffee shop she muse and trendsetter, known as the perfect girl next door, finds
					herself in a cozy local coffee shop she...
				</div>
			</div>
			<div v-if="isLogin" class="model-personal-attribute">
				<div class="title">Personality Attributes:</div>
				<div class="attribute-wrap">
					<div v-for="item in personalAttributes" :key="item.label" class="attribute-item">
						<div class="attribute-item__icon">
							<img :src="item.icon" alt="" />
						</div>
						<div class="attribute-item__value">
							<div class="label">{{ item.label }}</div>
							<div class="value">{{ item.value }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ModelInfo } from '@/interface/interface'

interface Props {
	selectedModel: number
	chatModelList: ModelInfo[]
}
const props = withDefaults(defineProps<Props>(), {
	selectedModel: 0,
	chatModelList: () => [],
})

const isLogin = ref(true)
const images = reactive([
	new URL('@/assets/image/model1.png', import.meta.url).href,
	new URL('@/assets/image/model2.png', import.meta.url).href,
	new URL('@/assets/image/model1.png', import.meta.url).href,
	new URL('@/assets/image/model2.png', import.meta.url).href,
])
const personalAttributes = reactive([
	{
		label: 'PERSONALITY',
		value: 'Funny, relaxed',
		icon: new URL('@/assets/image/personality.png', import.meta.url).href,
	},
	{
		label: 'OCCUPATION',
		value: 'Waitress',
		icon: new URL('@/assets/image/occupation.png', import.meta.url).href,
	},
	{
		label: 'HOBBIES',
		value: 'Gaming, manga',
		icon: new URL('@/assets/image/hobbies.png', import.meta.url).href,
	},
	{
		label: 'RELATIONSHIP',
		value: 'N/A',
		icon: new URL('@/assets/image/relationship.png', import.meta.url).href,
	},
])
</script>
