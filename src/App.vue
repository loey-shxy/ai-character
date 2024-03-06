<template>
  <div :class="isMobile || $isMobile ? 'mobile' : 'pc'">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
const isMobile = ref(false)
onMounted(() => {
  nextTick(() => {
    setStyle()
  })
  // window.addEventListener('resize', setStyle)
})

const setStyle = () => {
  const clientWidth = document.body.clientWidth
  isMobile.value = clientWidth <= 1200
  if (isMobile.value) {
    import('@/assets/scss/mobile/mobile-style.scss')
  } else {
    import('@/assets/scss/pc/pc-style.scss')
  }
}
</script>
