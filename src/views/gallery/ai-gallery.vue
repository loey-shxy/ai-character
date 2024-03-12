<template>
  <div :class="['gallery', $isMobile && 'scroll-bar']">
    <div class="gallery-group">
      <div v-for="item in gallery" :key="item.id" class="gallery-list">
        <div class="gallery-list__type-name">
          {{ item.typeName }} <span class="info">{{ item.photos.length }} picture</span>
        </div>
        <div class="gallery-list__photo-list">
          <div v-for="photo in item.photos" :key="photo" class="gallery-list__photo-list_item">
            <el-image
              :src="photo"
              fit="cover"
              :preview-src-list="[photo]"
              close-on-press-escape
              hide-on-click-modal
            ></el-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Gallery } from '@/interface'
import { userGalleryApi } from '@/apis'
// const galleryList = reactive([
//   {
//     id: 1,
//     typeName: 'Alexis Mary',
//     photos: [
//       new URL('@/assets/image/model1.png', import.meta.url).href,
//       new URL('@/assets/image/model2.png', import.meta.url).href,
//       new URL('@/assets/image/model1.png', import.meta.url).href,
//       new URL('@/assets/image/model2.png', import.meta.url).href,
//       new URL('@/assets/image/model1.png', import.meta.url).href,
//       new URL('@/assets/image/model2.png', import.meta.url).href,
//     ],
//   },
//   {
//     id: 2,
//     typeName: 'Hepburn',
//     photos: [
//       new URL('@/assets/image/model1.png', import.meta.url).href,
//       new URL('@/assets/image/model2.png', import.meta.url).href,
//       new URL('@/assets/image/model2.png', import.meta.url).href,
//     ],
//   },
// ])

const gallery = ref<Gallery[]>([])
onMounted(async () => {
  gallery.value = await userGalleryApi()
})
</script>
<style lang="scss"></style>
