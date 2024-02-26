<template>
  <div class="sign-in">
    <div class="sign-wrap">
      <div class="sign-title">Welcome Back</div>
      <div class="sign-subtitle">Sign In Your Account</div>
      <SignForm />
      <div class="tips">
        Don't have an account yet?
        <router-link :to="{ name: 'sign-up' }" class="link-text">Sign Up</router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SignForm from './comps/sign-form.vue'
</script>
