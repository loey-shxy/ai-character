<template>
  <div class="explore">
    <div v-if="$isMobile" class="explore-header">
      <div
        :class="['explore-header__sex-item', selectSex === 'female' && 'is-active']"
        @click="changeSex('female')"
      >
        <img v-if="selectSex === 'female'" src="@/assets/image/female-active.png" alt="" />
        <img v-else src="@/assets/image/female.png" alt="" />
        <span>Female</span>
      </div>
      <div
        :class="['explore-header__sex-item', selectSex === 'male' && 'is-active']"
        @click="changeSex('male')"
      >
        <img v-if="selectSex === 'male'" src="@/assets/image/male-active.png" alt="" />
        <img v-else src="@/assets/image/male.png" alt="" />
        <span>Male</span>
      </div>
    </div>
    <div class="explore__model-type">
      <div class="model-title">
        <span class="primary-text">Explore</span>
        AI Characters
      </div>
      <div class="model-type__list">
        <div
          v-for="item in modelTypes"
          :key="item.value"
          :class="['model-type__item', item.value === params.type && 'is-active']"
          @click="selectType(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <div class="explore__model-wrap scroll-bar" @scroll="handleScroll($event)">
      <div :class="['explore__model-list', !$isMobile && 'maw-w-1920']">
        <div
          v-for="item in modelList"
          :key="item.id"
          class="explore__model-list_item"
          @click="createSession(item)"
        >
          <div class="model-photo-box">
            <el-image :src="item.headUrl" fit="cover"></el-image>
          </div>
          <div class="model-name">{{ item.name }}</div>
          <div class="model-age">20 years</div>
          <div
            :class="[
              'model-desc text-line-clamp',
              $isMobile ? 'text-line-clamp__4' : 'text-line-clamp__3',
            ]"
          >
            {{ item.desc }}
          </div>
        </div>
      </div>
    </div>
    <AgeVerification v-model:visible="ageVisible" />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { getModelListApi, signInApi } from '@/apis'
import { ModelItem, ModelListQuery, ModelType } from '@/interface'
import { useRouter } from 'vue-router'
import { setGuestToken, hasToken, getGuestToken } from '@/utils/cookie'
import AgeVerification from '@/components/age-verification/age-verification.vue'

const isLogin = computed(() => {
  return hasToken()
})

const isGuestLogin = computed(() => {
  return getGuestToken()
})

const guestLogin = async () => {
  const { data, code, msg } = await signInApi({
    username: '',
    password: '',
    passport: 'FRONT-GUEST',
  })

  if (code === 1000) {
    setGuestToken(`Friend ${data.token}`)
    getModelList()
  } else {
    ElMessage({
      type: 'error',
      message: msg,
    })
  }
}

const ageVisible = ref(false)
// ai characters query
const total = ref(0)
const params = reactive<ModelListQuery>({
  type: 1,
  page: 1,
  limit: 12,
})

// ai characters list
const modelList = ref<ModelItem[]>([])
const getModelList = async () => {
  const data = await getModelListApi(params)
  total.value = data.total
  modelList.value = [...modelList.value, ...data.records]
}
watch(
  () => params,
  () => {
    getModelList()
  },
  {
    deep: true,
  }
)

// ai characters type
const modelTypes = reactive<ModelType[]>([{ value: 1, label: 'All Models' }])
// exchange ai characters type
const selectType = (type: number) => {
  params.type = type
}

// ai characters sex
const selectSex = ref('female')
const changeSex = (sex: string) => {
  selectSex.value = sex
}

const handleScroll = (event: any) => {
  const scrollBottom =
    event.target?.scrollHeight - event.target?.scrollTop - event.target?.clientHeight

  if (scrollBottom <= 0 && params.page * params.limit < total.value) {
    params.page++
  }
}

onMounted(async () => {
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight

    const scrollBottom = scrollHeight - scrollTop - clientHeight

    if (scrollBottom <= 100 && params.page * params.limit < total.value) {
      params.page++
    }
  })

  if (!isLogin.value && !isGuestLogin.value) {
    guestLogin()
    ageVisible.value = true
  }

  if (isGuestLogin.value || isLogin.value) {
    getModelList()
  }
})

const router = useRouter()
const createSession = (model: ModelItem) => {
  if (isLogin.value) {
    router.push({
      name: 'chat',
      query: {
        id: model.id,
      },
    })
  }
}
</script>
<style lang="scss"></style>
