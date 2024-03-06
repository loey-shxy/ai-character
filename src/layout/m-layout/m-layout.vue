<template>
  <div class="layout">
    <MHeader />
    <div :class="['container', customClass]">
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
import { computed, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import MHeader from '../m-header/m-header.vue'
import MMenu from '../m-menu/m-menu.vue'
import MFooter from '../m-footer/m-footer.vue'
const {
  appContext: {
    config: { globalProperties },
  },
} = getCurrentInstance()

const router = useRouter()
const customClass = computed(() => {
  const routerName = router.currentRoute.value.name
  if (globalProperties.isMobile) {
    return ''
  }

  return routerName === 'chat' || routerName === 'subscription' ? 'h' : 'm-h'
})
</script>
