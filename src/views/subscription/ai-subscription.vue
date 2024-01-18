<template>
	<div class="subscription scroll-bar">
		<div class="model-image left"></div>
		<div class="model-image right"></div>
		<div class="subscription__header">
			<h1>Choose your Plan</h1>
			<h3>100% anonymous. You can cancel anytime.</h3>
		</div>
		<div class="subscription__plan-list">
			<div v-for="item in planList" :key="item.type" class="plan-item">
				<div class="plan-item__border">&nbsp;</div>
				<div class="plan-item__content">
					<div class="plan-item__title">{{ item.type }} Package</div>
					<div class="plan-item__price">
						<span class="price">{{ item.unit }}{{ item.price }}</span>
						<span class="original-price">{{ item.unit }}{{ item.originalPrice }}</span>
						<span class="unit">/ month</span>
					</div>
					<div class="plan-item__points">with a recharge of {{ item.points }} points</div>
					<div class="plan-item__benefits">
						<div class="benefits-title">Premium Benefits</div>
						<div class="benefits-list">
							<div class="benefits-list__item">
								<img src="@/assets/image/enable.png" alt="" />
								<span>One voice: 10 o'clock;</span>
							</div>
							<div class="benefits-list__item">
								<img src="@/assets/image/enable.png" alt="" />
								<span>A picture: 50 points;</span>
							</div>
							<div v-if="item.type === 'basic'" class="benefits-list__item">
								<img src="@/assets/image/unable.png" alt="" />
								<span>Unable to watch videos;</span>
							</div>
							<div v-else class="benefits-list__item">
								<img src="@/assets/image/enable.png" alt="" />
								<span>One video: 200 points;</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="subscription__btn-wrap">
			<el-button type="primary">Pay</el-button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

const planList = reactive([
	{
		type: 'basic',
		price: 9.9,
		originalPrice: 19.9,
		unit: '$',
		points: 1000,
	},
	{
		type: 'fan',
		price: 29.9,
		originalPrice: 49.9,
		unit: '$',
		points: 3500,
	},
])
</script>
<style lang="scss"></style>
