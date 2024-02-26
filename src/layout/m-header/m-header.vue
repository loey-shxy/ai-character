<template>
  <div class="page-header">
    <div class="page-header__left">
      <div class="logo">
        <img src="@/assets/image/logo.png" alt="" />
      </div>
      <h2 class="system-name">Dashcube</h2>
      <div v-if="!$isMobile && showSex" class="sex-group">
        <div
          :class="['sex-item', selectSex === 'female' && 'is-active']"
          @click="changeSex('female')"
        >
          <img v-if="selectSex === 'female'" src="@/assets/image/female-active.png" alt="" />
          <img v-else src="@/assets/image/female.png" alt="" />
          <span>Female</span>
        </div>
        <div :class="['sex-item', selectSex === 'male' && 'is-active']" @click="changeSex('male')">
          <img v-if="selectSex === 'male'" src="@/assets/image/male-active.png" alt="" />
          <img v-else src="@/assets/image/male.png" alt="" />
          <span>Male</span>
        </div>
      </div>
    </div>
    <div :class="['page-header__right', !isLogin && 'not-login']">
      <el-dropdown
        v-if="isLogin"
        :popper-class="['profile-popper', $isMobile ? 'mobile-popper' : 'pc-popper']"
      >
        <span class="profile-link">
          <div class="profile-icon">
            <img src="@/assets/image/personal.png" />
          </div>
          <template v-if="!$isMobile">
            <span>My Profile</span>
            <el-icon class="el-icon--right">
              <ArrowDown />
            </el-icon>
          </template>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in dropdownMenu" :key="item.label">
              <router-link v-if="item.path" :to="{ name: item.path }">
                <img class="icon" :src="getImg(item.icon)" alt="" />
                <span>{{ item.label }}</span>
              </router-link>
              <div v-else @click="dropdownMenuClick(item)">
                <img class="icon" :src="getImg(item.icon)" alt="" />
                <span>{{ item.label }}</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <template v-else>
        <el-button type="info" @click="toSignUp">Register</el-button>
        <el-button type="primary" @click="toSignIn">Login</el-button>
      </template>
    </div>

    <ContactUs v-model:visible="contactVisible" />
  </div>
</template>
<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ContactUs from '@/components/contact-us/contact-us.vue'
import { DropdownMenu } from '@/interface'
import { removeToken, hasToken } from '@/utils/cookie'

const router = useRouter()
const isLogin = computed(() => {
  return hasToken()
})

const selectSex = ref('female')
const showSex = computed(() => {
  return router.currentRoute.value.name === 'explore'
})

const changeSex = (sex: string) => {
  selectSex.value = sex
}

const dropdownMenu = reactive<DropdownMenu[]>([
  { label: 'Gallery', icon: 'gallery-down', path: 'gallery' },
  { label: 'Subscription', icon: 'subscription-down', path: 'subscription' },
  { label: 'Settings', icon: 'setting', path: '' },
  { label: 'Contact', icon: 'contact', path: '' },
  { label: 'Logout', icon: 'logout', path: '' },
])

const getImg = (icon: string) => {
  switch (icon) {
    case 'gallery-down':
      return new URL('@/assets/image/gallery-down.png', import.meta.url).href
    case 'subscription-down':
      return new URL('@/assets/image/subscription-down.png', import.meta.url).href
    case 'setting':
      return new URL('@/assets/image/setting.png', import.meta.url).href
    case 'contact':
      return new URL('@/assets/image/contact.png', import.meta.url).href
    case 'logout':
      return new URL('@/assets/image/logout.png', import.meta.url).href
    default:
      return ''
  }
}
const contactVisible = ref(false)
const dropdownMenuClick = (menu: DropdownMenu) => {
  switch (menu.label) {
    case 'Contact':
      contactVisible.value = true
      break
    case 'Logout':
      removeToken()
      toSignIn()
      break
    default:
      break
  }
}

const toSignUp = () => {
  router.push({
    name: 'sign-up',
  })
}

const toSignIn = () => {
  router.push({
    name: 'sign-in',
  })
}
</script>
