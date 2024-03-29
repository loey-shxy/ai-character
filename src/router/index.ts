import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getToken, getGuestToken } from '@/utils/cookie'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    redirect: '/age-verification',
    component: async () => await import('@/layout/m-layout/m-layout.vue'),
    children: [
      {
        path: 'explore',
        name: 'explore',
        component: async () => await import('@/views/explore/ai-explore.vue'),
        meta: { title: 'Explore' },
      },
      {
        path: 'chat',
        name: 'chat',
        component: async () => await import('@/views/chat/ai-chat.vue'),
        meta: { title: 'Chat' },
      },
      {
        path: 'gallery',
        name: 'gallery',
        component: async () => await import('@/views/gallery/ai-gallery.vue'),
        meta: { title: 'Gallery' },
      },
      {
        path: 'subscription',
        name: 'subscription',
        component: async () => await import('@/views/subscription/ai-subscription.vue'),
        meta: { title: 'Subscription' },
      },
      {
        path: 'generate',
        name: 'generate',
        component: async () => await import('@/views/generate/ai-generate.vue'),
        meta: { title: 'Generate' },
      },
      {
        path: 'privacy-policy',
        name: 'privacy-policy',
        component: async () => await import('@/views/privacy-policy/privacy-policy.vue'),
        meta: { title: 'Privacy Policy' },
      },
      {
        path: 'terms-of-service',
        name: 'terms-of-service',
        component: async () => await import('@/views/terms-of-service/terms-of-service.vue'),
        meta: { title: 'Terms Of Service' },
      },
      {
        path: 'chat-detail',
        name: 'characters-detail',
        component: async () => await import('@/views/chat/characters-detail/characters-detail.vue'),
        meta: { title: 'Chat' },
      },
      {
        path: 'setting',
        name: 'setting',
        component: async () => await import('@/views/setting/user-setting.vue'),
        meta: { title: 'Setting' },
      },
    ],
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: async () => await import('@/views/sign-in/sign-in.vue'),
    meta: { title: 'Sign In' },
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: async () => await import('@/views/sign-up/sign-up.vue'),
    meta: { title: 'Sign Up' },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: async () => await import('@/views/reset-password/reset-password.vue'),
    meta: { title: 'Reset Password' },
  },
  {
    path: '/email-auth',
    name: 'email-auth',
    component: async () => await import('@/views/email-auth/email-auth.vue'),
    meta: { title: 'Email Auth' },
  },
  {
    path: '/age-verification',
    name: 'age-verification',
    component: async () => await import('@/views/age-verification/age-verification.vue'),
    meta: { title: 'Age Verification' },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.afterEach((to, from) => {
  if (to.path === '/redirect') {
    if (from && from.path !== '/redirect') {
      router.replace({
        path: from.path,
        query: from.query,
      })
    }
  }

  if (to.path !== '/age-verification' && !getToken() && !getGuestToken()) {
    router.replace({
      path: '/age-verification',
    })
  }
})

export default router
