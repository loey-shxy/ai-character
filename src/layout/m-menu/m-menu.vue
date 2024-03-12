<template>
  <div class="menu">
    <el-menu :default-active="currentRouter" :mode="$isMobile ? 'horizontal' : 'vertical'">
      <el-menu-item
        v-for="item in menus"
        :key="item.path"
        :index="item.path"
        @click="openMenu(item.path)"
      >
        <img class="icon" :src="getIcon(item.icon)" alt="" />
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
const {
  appContext: {
    config: { globalProperties },
  },
} = getCurrentInstance()

import { useRouter } from 'vue-router'
const router = useRouter()
const currentRouter = computed(() => {
  return router.currentRoute.value.name
})

const menus = reactive([
  { title: 'Explore', icon: 'explore', path: 'explore' },
  { title: 'Chat', icon: 'chat', path: 'chat' },
  { title: 'Gallery', icon: 'gallery', path: 'gallery' },
  { title: 'Subscription', icon: 'subscription', path: 'subscription' },
])

const getIcon = (icon: string) => {
  switch (icon) {
    case 'explore':
      return currentRouter.value === 'explore' || !globalProperties.$isMobile
        ? new URL('@/assets/image/explore-active.png', import.meta.url).href
        : new URL('@/assets/image/explore.png', import.meta.url).href
    case 'chat':
      return currentRouter.value === 'chat' ||
        currentRouter.value === 'characters-detail' ||
        !globalProperties.$isMobile
        ? new URL('@/assets/image/chat-active.png', import.meta.url).href
        : new URL('@/assets/image/chat.png', import.meta.url).href
    case 'gallery':
      return currentRouter.value === 'gallery' || !globalProperties.$isMobile
        ? new URL('@/assets/image/gallery-active.png', import.meta.url).href
        : new URL('@/assets/image/gallery.png', import.meta.url).href
    case 'subscription':
      return currentRouter.value === 'subscription' || !globalProperties.$isMobile
        ? new URL('@/assets/image/subscription-active.png', import.meta.url).href
        : new URL('@/assets/image/subscription.png', import.meta.url).href
    default:
      return ''
  }
}

const openMenu = (path: string) => {
  // if (path === 'chat') {
  //   ElMessage({
  //     type: 'warning',
  //     message: 'Please sign in first',
  //   })
  //   return
  // }
  router.push({ name: path })
}
</script>
