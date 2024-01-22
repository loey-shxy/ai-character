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
				<div
					v-for="item in modelTypes"
					:key="item.value"
					:class="['model-type__item', item.value === params.type && 'is-active']"
					@click="selectType(item.value)"
				>
					{{ item.label }}
				</div>
			</div>
		</div>
		<div class="explore__model-wrap scroll-bar">
			<div class="explore__model-list">
				<div v-for="item in modelList" :key="item.id" class="explore__model-list_item">
					<div class="model-photo-box">
						<el-image :src="item.headUrl" fit="cover"></el-image>
					</div>
					<div class="model-name">{{ item.name }}</div>
					<div class="model-age">20 years</div>
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
import { ref, reactive, watch } from 'vue'
import { getModelListApi } from '@/apis'
import { ModelItem, ModelListQuery, ModelType } from '@/interface'

// ai characters query
const params = reactive<ModelListQuery>({
	type: 1,
	page: 1,
	limit: 12,
})

// ai characters list
const modelList = ref<ModelItem[]>([])
const getModelList = async () => {
	const data = await getModelListApi(params)
	modelList.value = [...modelList.value, ...data.records]
}
watch(
	() => params,
	() => {
		getModelList()
	},
	{
		immediate: true,
		deep: true,
	}
)

// ai characters type
const modelTypes = reactive<ModelType[]>([{ value: 1, label: 'All Models' }])
// exchange ai characters type
const selectType = (type: number) => {
	params.type = type
}

// ai characters sex
const selectSex = ref('female')
const changeSex = (sex: string) => {
	selectSex.value = sex
}
</script>
<style lang="scss"></style>
