<template>
	<div class="layout">
		<MHeader />
		<div class="container">
			<div class="aside">
				<MMenu />
			</div>
			<div class="content-wrap">
				<router-view></router-view>
				<MFooter v-if="!$isMobile" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import MHeader from '../m-header/m-header.vue'
import MMenu from '../m-menu/m-menu.vue'
import MFooter from '../m-footer/m-footer.vue'
</script>
