<template>
	<div class="sign-in">
		<div class="sign-wrap">
			<div class="sign-title">Welcome Back</div>
			<div class="sign-subtitle">Sign Up Your Account</div>
			<SignForm />
			<div class="tips">
				Already have an account yet?
				<router-link :to="{ name: 'sign-in' }" class="link-text">Sign In</router-link>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import SignForm from '../sign-in/comps/sign-form.vue'
</script>
