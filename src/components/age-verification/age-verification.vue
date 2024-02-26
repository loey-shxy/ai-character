<template>
  <el-dialog
    v-model="dialogVisible"
    :class="[
      'custom-dialog',
      $isMobile ? 'mobile-age-verification__dialog' : 'pc-age-verification__dialog',
    ]"
    title="Age verification"
    :before-close="close"
    append-to-body
  >
    <div class="desc">
      This website contains age limited content, including nude and explicit pornographic materials.
      By logging in, you confirm that you are over 18 years old or that you are an adult in the
      jurisdiction where you visited this website.
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="login">I am over 18 years old - login</el-button>
        <el-button type="info" @click="exit">I am under 18- Exit</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'

interface Props {
  visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
})

const emit = defineEmits(['update:visible'])
const dialogVisible = ref(false)

const close = () => {
  dialogVisible.value = false
}

const login = () => {
  dialogVisible.value = false
}

const exit = () => {
  dialogVisible.value = false
}

watch(
  () => dialogVisible.value,
  (val) => {
    emit('update:visible', val)
  }
)

watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val
  }
)
</script>
