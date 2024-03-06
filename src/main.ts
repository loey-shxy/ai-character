import { createApp } from 'vue'
import '@/assets/scss/style.scss'
import '@/assets/scss/pc/pc-style.scss'
import '@/assets/scss/mobile/mobile-style.scss'
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible.js'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import en from 'element-plus/dist/locale/en.mjs'

const app = createApp(App)
const pinia = createPinia()

const clientWidth = document.body.clientWidth
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
  clientWidth <= 1200
app.config.globalProperties.$isMobile = isMobile

app
  .use(router)
  .use(pinia)
  .use(ElementPlus, {
    locale: en,
  })
  .mount('#app')
