<template>
  <div class="model-info">
    <div class="model-info__photo-list">
      <el-carousel :autoplay="false" arrow="always">
        <el-carousel-item v-for="img in model?.imgs" :key="img">
          <el-image :src="img" fit="cover" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="model-info__detail">
      <div class="model-info__detail-instruc">
        <div class="model-info__detail-name">{{ model?.name }}</div>
        <div
          :class="[
            'model-info__detail-instruction text-line-clamp',
            isLogin ? 'text-line-clamp__3' : 'text-line-clamp__6',
          ]"
        >
          {{ model?.desc }}
        </div>
      </div>
      <div v-if="isLogin" class="model-personal-attribute">
        <div class="title">Personality Attributes:</div>
        <div class="attribute-wrap">
          <div v-for="item in personalAttributes" :key="item.label" class="attribute-item">
            <div class="attribute-item__icon">
              <img :src="item.icon" alt="" />
            </div>
            <div class="attribute-item__value">
              <div class="label">{{ item.label }}</div>
              <div class="value">{{ model?.[item.key] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue'
import { ModelItem } from '@/interface'
import { hasToken } from '@/utils/cookie'

withDefaults(
  defineProps<{
    model: ModelItem
  }>(),
  {
    model: undefined,
  }
)

const isLogin = computed(() => {
  return hasToken()
})

const personalAttributes = reactive([
  {
    label: 'PERSONALITY',
    key: 'personality',
    icon: new URL('@/assets/image/personality.png', import.meta.url).href,
  },
  {
    label: 'OCCUPATION',
    key: 'occupation',
    icon: new URL('@/assets/image/occupation.png', import.meta.url).href,
  },
  {
    label: 'HOBBIES',
    key: 'hobbies',
    icon: new URL('@/assets/image/hobbies.png', import.meta.url).href,
  },
  {
    label: 'RELATIONSHIP',
    key: 'relationship',
    icon: new URL('@/assets/image/relationship.png', import.meta.url).href,
  },
])
</script>
