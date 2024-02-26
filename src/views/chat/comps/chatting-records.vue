<template>
  <div class="chatting-records">
    <div class="chat-content scroll-bar">
      <div class="chat-content__list">
        <template v-for="item in messageList">
          <div
            v-if="!item.isPicture"
            :key="item.id"
            :class="['chat-content__list-message', item.type]"
          >
            <div class="time">{{ item.time }}</div>
            <div class="message-popper">
              <div class="message">{{ item.message }}</div>
              <img v-if="item.type === 'reply'" src="@/assets/image/voice.png" />
            </div>
          </div>
          <div v-else :key="item.id + 'p'" class="chat-content__list-message picture">
            <div class="download-process">
              <el-progress type="circle" :percentage="70" color="#E75175" status="exception">
                <template #default="{ percentage }">
                  <span class="percentage-value">{{ percentage }}%</span>
                </template>
              </el-progress>
            </div>
            <p class="wait">Please wait!</p>
            <p class="sub-message">Alexis Ivyedge is taking a picture</p>
          </div>
        </template>
      </div>
    </div>
    <div class="chat-content__footer">
      <div class="suggestion">
        <div class="suggestion-label">Suggestion：</div>
        <div class="suggestion-value">Always up for a chat. What's new?</div>
      </div>
      <div class="form-wrap">
        <el-form :model="form" inline>
          <el-form-item prop="reqTxt">
            <el-input v-model="form.reqTxt" placeholder="Type a message">
              <template #suffix>
                <el-dropdown
                  :popper-class="[
                    'profile-popper',
                    $isMobile ? 'mobile-chat-send__popper' : 'pc-chat-send__popper',
                  ]"
                >
                  <el-button type="primary">
                    <img src="@/assets/image/image.png" />
                    Ask
                    <el-icon class="el-icon--right">
                      <ArrowDown />
                    </el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>Show me...</el-dropdown-item>
                      <el-dropdown-item>Send me...</el-dropdown-item>
                      <el-dropdown-item>Send...</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sendMessage">
              <img src="@/assets/image/send.png" />
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, withDefaults, defineProps } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { Message, ModelItem } from '@/interface'

withDefaults(
  defineProps<{
    model: ModelItem
    sessionId: string
  }>(),
  {
    model: undefined,
    sessionId: '',
  }
)

const form = reactive({
  reqTxt: '',
})
const messageList = reactive<Message[]>([
  {
    id: 1,
    message: `Hey, gorgeous day, isn't it? I'm Alex, by the way. So, what's your name,sweety?`,
    type: 'reply',
    isPicture: false,
    time: '11:30 PM',
    picture: '',
  },
  {
    id: 2,
    message: `Could you please show me your photos`,
    type: 'send',
    isPicture: false,
    time: '11:35 PM',
    picture: '',
  },
  {
    id: 3,
    message: '',
    type: 'reply',
    isPicture: true,
    time: '11:35 PM',
    picture: '',
  },
])

const sendMessage = async () => {
  if (form.reqTxt) {
  }
}
</script>
