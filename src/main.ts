import { createApp } from 'vue'
import '@/assets/scss/style.scss'
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
	clientWidth <= 1000
app.config.globalProperties.$isMobile = isMobile
if (isMobile) {
	import('@/assets/scss/mobile-style.scss')
} else {
	import('@/assets/scss/pc-style.scss')
}

app
	.use(router)
	.use(pinia)
	.use(ElementPlus, {
		locale: en,
	})
	.mount('#app')
