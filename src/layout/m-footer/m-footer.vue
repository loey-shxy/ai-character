<template>
	<div class="page-footer">
		<div class="page-footer__left">
			<div class="logo">
				<img src="@/assets/image/logo.png" />
				<span>Dashcube</span>
			</div>
			<div class="system-desc">
				Create your own AI Girlfriend <br />
				Your dream companion awaits! Create your AI Girlfriend, shape her look, personality, and
				bring her to life in one click. 100% powered by Artificial Intelligence.
			</div>
			<div class="copyright">XXXXX.ai © 2024. All Rights Reserved - <span>Sitemap</span></div>
		</div>
		<div class="page-footer__right">
			<div class="sub-link">
				<div class="title">Features</div>
				<div class="link-group">
					<div v-for="item in features" :key="item.path" class="link-item">
						<router-link :to="{ name: item.path }">{{ item.name }}</router-link>
					</div>
				</div>
			</div>
			<div class="sub-link">
				<div class="title">Legal</div>
				<div class="link-group">
					<div v-for="item in legals" :key="item.path" class="link-item legals">
						<router-link :to="{ name: item.path }">{{ item.name }}</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
const features = reactive([
	{ name: 'Generate Image', path: 'generate' },
	{ name: 'Chat', path: 'chat' },
	{ name: 'Create  Character', path: '' },
	{ name: 'Gallery', path: 'gallery' },
	{ name: 'My AI', path: '' },
])
const legals = reactive([
	{ name: 'Terms of service', path: 'terms-of-service' },
	{ name: 'Privacy policy', path: 'privacy-policy' },
])
</script>
