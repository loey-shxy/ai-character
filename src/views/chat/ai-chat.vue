<template>
  <div class="chat">
    <div v-if="!$isMobile" class="model-list__wrap">
      <div class="model-list__content">
        <el-input v-model="keyword" placeholder="Search..." :prefix-icon="Search" />
        <div class="model-list scroll-bar">
          <div
            v-for="item in sessionList"
            :key="item.id"
            :class="['model-list__item', selectedModel?.id === item.model.id && 'is-active']"
            @click="changeModel(item)"
          >
            <div class="model-photo">
              <el-image :src="item.model.headUrl" fit="cover" />
            </div>
            <div class="model-name">
              <div class="model-name__name">{{ item.model.name }}</div>
              <div class="model-name__message text-line-clamp text-line-clamp__3">
                {{ item.model.desc }}
              </div>
            </div>
            <div class="model-list__operation">
              <div class="operation-icon refresh" @click.stop="refreshSession(item)"></div>
              <div class="operation-icon delete" @click.stop="deleteSession(item)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-content__wrap">
      <div class="content-header">
        <el-image
          v-if="selectedModel?.headUrl"
          :src="selectedModel?.headUrl"
          fit="cover"
          @click="toDetail"
        />
        <span @click="toDetail">{{ selectedModel?.name }}</span>
      </div>
      <ChattingRecords
        :model="selectedModel"
        :session-id="messageQuery.sessionId"
        :session-chat-list="sessionChatList"
        @refresh="getSessionChatMessage"
      />
    </div>
    <ChatModelInfo v-if="!$isMobile" :model="selectedModel" />
  </div>
</template>
<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ChattingRecords from './comps/chatting-records.vue'
import ChatModelInfo from './comps/chat-model-info.vue'
import { ModelItem, SessionChatMessage, SessionChatMessageQuery, SessionItem } from '@/interface'
import { createSessionApi, deleteSessionApi, refreshSessionApi, sessionChatListApi, userSessionListApi } from '@/apis'
import { isEmpty } from 'lodash'

const selectedModel = ref<ModelItem>()

const keyword = ref('')
const {
  appContext: {
    config: { globalProperties }
  }
} = getCurrentInstance()

const sessionList = ref<SessionItem[]>([])
const getSessionList = async () => {
  sessionList.value = await userSessionListApi()
  selectedModel.value = ensureModelId()
  scrollToBottom()
}

const ensureModelId = () => {
  const id = route.query.id
  if (!sessionList.value) {
    return {} as ModelItem
  }
  const existsItem = sessionList.value?.find((item) => item.model.id === id) as SessionItem
  if (existsItem && id === existsItem.model.id) {
    return existsItem.model
  }
  const lastItem = sessionList.value[sessionList.value.length - 1] as SessionItem
  return lastItem.model
}

const scrollToBottom = () => {}

const route = useRoute()
onMounted(async () => {
  //todo 步骤
  /**
   * 1. 获取会话列表
   * 2. 如果选中的模型存在，继续使用sessionid
   * 3. 如果不存在，启用新的session
   * 4. 重新获取会话列表
   */
  await getSessionList()
  const query = route.query
  if (!isEmpty(query)) {
    const modelId = query.id as string
    const session = sessionList.value?.find((item) => item.model.id === modelId) as SessionItem
    if (session) {
      changeModel(session)
      await getSessionChatMessage()
      await createSessionApi({
        sessionId: session.id,
        modelId,
        newSession: 0,
      })
    } else {
      const data = await createSessionApi({
        sessionId: '',
        modelId,
        newSession: 1,
      })
      const session = {
        id: data.sessionId,
        model: data.other,
      }
      sessionList.value.push(session as SessionItem)
      selectedModel.value = data.other
      messageQuery.sessionId = data.sessionId
      await getSessionChatMessage()
    }
  }
})

// 获取会话历史信息
const changeModel = async (session: SessionItem) => {
  selectedModel.value = session.model
  messageQuery.sessionId = session.id
}

const total = ref(0)
const sessionChatList = ref<SessionChatMessage[]>([])
const messageQuery = reactive<SessionChatMessageQuery>({
  page: 1,
  sessionId: '',
  limit: 5,
  sort: 'asc',
})

watch(
  () => messageQuery,
  () => {
    if (messageQuery.sessionId) {
      getSessionChatMessage()
    }
  },
  {
    deep: true
  }
)
const getSessionChatMessage = async () => {
  const data = await sessionChatListApi(messageQuery)
  sessionChatList.value = data.records
  total.value = data.total
}

// 刷新会话
const refreshSession = async (session: SessionItem) => {
  const { code, msg } = await refreshSessionApi(session.id)
  if (code === 1000) {
    getSessionList()
  } else {
    ElMessage({
      type: 'error',
      message: msg
    })
  }
}

// 删除会话
const deleteSession = (session: SessionItem) => {
  ElMessageBox.confirm('Delete the session?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  }).then(async () => {
    const { code, msg } = await deleteSessionApi(session.id)
    if (code === 1000) {
      ElMessage({
        type: 'success',
        message: 'Delete success',
      })
      messageQuery.sessionId = ''
      sessionChatList.value = []
      getSessionList()
    } else {
      ElMessage({
        type: 'warning',
        message: msg,
      })
    }
  })
    .then(async () => {
      const { code, msg } = await deleteSessionApi(session.id)
      if (code === 1000) {
        ElMessage({
          type: 'success',
          message: 'Delete success'
        })
        getSessionList()
      } else {
        ElMessage({
          type: 'error',
          message: msg
        })
      }
    })
}

const router = useRouter()
const toDetail = () => {
  if (globalProperties.$isMobile) {
    router.push({ name: 'characters-detail' })
  }
}
</script>
