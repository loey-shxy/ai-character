<template>
  <div class="layout">
    <MHeader />
    <div class="container">
      <div class="aside">
        <MMenu />
      </div>
      <div class="content-wrap scroll-bar">
        <router-view></router-view>
        <MFooter v-if="!$isMobile && currentRoute !== 'chat' && currentRoute !== 'setting'" />
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
const currentRoute = computed(() => {
  return router.currentRoute.value.name
})
// const customClass = computed(() => {
//   const routerName = router.currentRoute.value.name
//   if (globalProperties.isMobile) {
//     return ''
//   }

//   return routerName === 'chat' || routerName === 'subscription' ? 'h' : 'm-h'
// })
</script>
