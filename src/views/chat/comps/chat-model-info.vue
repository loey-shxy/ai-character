<template>
  <div class="model-info scroll-bar">
    <div class="model-info__photo-list">
      <el-carousel :autoplay="false" :arrow="modelImgs.length > 1 ? 'always' : 'never'">
        <el-carousel-item v-for="img in modelImgs" :key="img">
          <el-image :src="img.preview" fit="cover" />
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

const props = withDefaults(
  defineProps<{
    model: ModelItem
  }>(),
  {
    model: () => ({}) as ModelItem,
  }
)

const isLogin = computed(() => {
  return hasToken()
})

const modelImgs = computed(() => {
  if (props.model?.imgs) {
    return [props.model?.imgs.main]
  }
  return []
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
  // {
  //   label: 'RELATIONSHIP',
  //   key: 'relationship',
  //   icon: new URL('@/assets/image/relationship.png', import.meta.url).href,
  // },
])
</script>
