<template>
  <div class="chat characters-detail scroll-bar">
    <div class="back" @click="back">
      <img class="icon" src="@/assets/image/back.png" />
      <span>Back</span>
    </div>
    <ChatModelInfo :model="selectedModel" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ChatModelInfo from '../comps/chat-model-info.vue'

const route = useRoute()
const selectedModel = computed(() => {
  const model = route.query.model ? JSON.parse(route.query.model as string) : {}
  return model
})

const router = useRouter()
const back = () => {
  router.back()
}
</script>
