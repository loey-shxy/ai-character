<template>
  <div :class="$isMobile ? 'mobile' : 'pc'">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts"></script>
