<template>
	<div class="explore">
		<div v-if="$isMobile" class="explore-header">
			<div
				:class="['explore-header__sex-item', selectSex === 'female' && 'is-active']"
				@click="changeSex('female')"
			>
				<img v-if="selectSex === 'female'" src="@/assets/image/female-active.png" alt="" />
				<img v-else src="@/assets/image/female.png" alt="" />
				<span>Female</span>
			</div>
			<div
				:class="['explore-header__sex-item', selectSex === 'male' && 'is-active']"
				@click="changeSex('male')"
			>
				<img v-if="selectSex === 'male'" src="@/assets/image/male-active.png" alt="" />
				<img v-else src="@/assets/image/male.png" alt="" />
				<span>Male</span>
			</div>
		</div>
		<div class="explore__model-type">
			<div class="model-title">
				<span class="primary-text">Explore</span>
				AI Characters
			</div>
			<div class="model-type__list">
				<div class="model-type__item">All Models</div>
				<div class="model-type__item">All Models</div>
				<div class="model-type__item">All Models</div>
				<div class="model-type__item">All Models</div>
			</div>
		</div>
		<div class="explore__model-wrap scroll-bar">
			<div class="explore__model-list">
				<div v-for="item in modelList" :key="item.id" class="explore__model-list_item">
					<div class="model-photo-box">
						<el-image :src="item.photo" fit="cover"></el-image>
					</div>
					<div class="model-name">{{ item.name }}</div>
					<div class="model-age">{{ item.age }}years</div>
					<div
						:class="[
							'model-desc text-line-clamp',
							$isMobile ? 'text-line-clamp__4' : 'text-line-clamp__3',
						]"
					>
						{{ item.desc }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'

const selectSex = ref('female')

const changeSex = (sex: string) => {
	selectSex.value = sex
}

const modelList = reactive([
	{
		id: 1,
		photo: new URL('@/assets/image/model1.png', import.meta.url).href,
		name: 'Monroe',
		age: 18,
		desc: 'Digital muse and trendsetter, known as the perfect girl next door, finds herself in a cozy local coffee shop she... ',
	},
	{
		id: 2,
		photo: new URL('@/assets/image/model2.png', import.meta.url).href,
		name: 'Monroe',
		age: 18,
		desc: 'Digital muse and trendsetter, known as the perfect girl next door, finds herself in a cozy local coffee shop she... ',
	},
	{
		id: 3,
		photo: new URL('@/assets/image/model2.png', import.meta.url).href,
		name: 'Monroe',
		age: 18,
		desc: 'Digital muse and trendsetter, known as the perfect girl next door, finds herself in a cozy local coffee shop she... ',
	},
	{
		id: 4,
		photo: new URL('@/assets/image/model1.png', import.meta.url).href,
		name: 'Monroe',
		age: 18,
		desc: 'Digital muse and trendsetter, known as the perfect girl next door, finds herself in a cozy local coffee shop she... ',
	},
	{
		id: 5,
		photo: new URL('@/assets/image/model1.png', import.meta.url).href,
		name: 'Monroe',
		age: 18,
		desc: 'Digital muse and trendsetter, known as the perfect girl next door, finds herself in a cozy local coffee shop she... ',
	},
	{
		id: 6,
		photo: new URL('@/assets/image/model2.png', import.meta.url).href,
		name: 'Monroe',
		age: 18,
		desc: 'Digital muse and trendsetter, known as the perfect girl next door, finds herself in a cozy local coffee shop she... ',
	},
])
</script>
<style lang="scss"></style>
