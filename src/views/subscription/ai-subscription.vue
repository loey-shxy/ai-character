<template>
	<div class="subscription scroll-bar">
		<div class="model-image left"></div>
		<div class="model-image right"></div>
		<div class="subscription__header">
			<h1>Choose your Plan</h1>
			<h3>100% anonymous. You can cancel anytime.</h3>
		</div>
		<div class="subscription__plan-list">
			<div
				v-for="item in subscriptionList"
				:key="item.id"
				:class="['plan-item', item.unKey === selectedType && 'is-active']"
				@click="selectSubType(item.unKey)"
			>
				<div class="plan-item__border">&nbsp;</div>
				<div class="plan-item__content">
					<div class="plan-item__title">{{ subscriptionType.func(item.type) }} Package</div>
					<div class="plan-item__price">
						<span class="price">$ {{ item.prices }}</span>
						<!-- <span class="original-price">{{ item.unit }}{{ item.originalPrice }}</span> -->
						<span class="unit">/ {{ subscriptionType.func(item.type) }}</span>
					</div>
					<div class="plan-item__points">with a recharge of {{ item.point }} points</div>
					<div class="plan-item__benefits">
						<div class="benefits-title">Premium Benefits</div>
						<div class="benefits-list">
							<div class="benefits-list__item">
								<img src="@/assets/image/enable.png" alt="" />
								<span>One voice: {{ item.voiceSize }} o'clock;</span>
							</div>
							<div class="benefits-list__item">
								<img src="@/assets/image/enable.png" alt="" />
								<span>A picture: {{ item.imageSize }} points;</span>
							</div>
							<div v-if="!item.videoSize" class="benefits-list__item">
								<img src="@/assets/image/unable.png" alt="" />
								<span>Unable to watch videos;</span>
							</div>
							<div v-else class="benefits-list__item">
								<img src="@/assets/image/enable.png" alt="" />
								<span>One video: {{ item.videoSize }} points;</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="subscription__btn-wrap">
			<el-button type="primary" @click="createSubOrder">Pay</el-button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { SubscriptionPackage, SubscriptionOrder } from '@/interface'
import { getSubscriptionPackageApi, createSubscribeOrderApi } from '@/apis'
import { subscriptionType } from '@/common/dict'

onMounted(() => {
	getSubscriptionList()
})
// 订阅列表
const subscriptionList = ref<Array<SubscriptionPackage>>([])
const getSubscriptionList = async () => {
	subscriptionList.value = await getSubscriptionPackageApi()
}

// 选择订阅类型
const selectedType = ref('')
const selectSubType = (unKey: string) => {
	selectedType.value = unKey
}

const subOrder = ref<SubscriptionOrder>()
// 订阅
const createSubOrder = async () => {
	subOrder.value = await createSubscribeOrderApi(selectedType.value)
}
</script>
<style lang="scss"></style>
