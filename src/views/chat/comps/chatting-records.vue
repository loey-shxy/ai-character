<template>
  <div class="chatting-records">
    <div class="chat-content scroll-bar">
      <div class="chat-content__list">
        <template v-for="(item, index) in sessionChatList">
          <div
            v-if="item.type === RESP_MESSAGE_TYPE.VOICE.v"
            :key="index"
            :class="[
              'chat-content__list-message',
              item.from === RESP_FROM_TYPE.MODEL.v ? 'reply' : 'send',
            ]"
          >
            <!-- <div class="time">{{ item.time }}</div> -->
            <div class="message-popper">
              <div class="message">{{ item.txt }}</div>
              <div class="mp3">
                <img
                  v-if="item.from === RESP_FROM_TYPE.MODEL.v"
                  src="@/assets/image/voice.png"
                  @click="playVideo(`${index}`)"
                />
                <audio :id="`audioRef${index}`">
                  <source :src="item.txtVoice" type="audio/mpeg" />
                </audio>
              </div>
            </div>
          </div>
          <div
            v-else
            :key="index + 'p'"
            :class="[
              'chat-content__list-message',
              item.from === RESP_FROM_TYPE.MODEL.v ? 'reply' : 'send',
            ]"
          >
            <div class="message-popper">
              <div class="message">{{ item.txt || item.respTxt }}</div>
              <div class="mp3">
                <img
                  v-if="item.from === RESP_FROM_TYPE.MODEL.v"
                  src="@/assets/image/voice.png"
                  @click="playVideo(`${index}p`)"
                />
                <audio :id="`audioRef${index}p`">
                  <source :src="item.txtVoice || item.respTxtVoice" type="audio/mpeg" />
                </audio>
              </div>
            </div>
            <div class="chat-content__list-message picture">
              <!-- <template v-if="false">
                <div class="download-process">
                  <el-progress type="circle" :percentage="70" color="#E75175" status="exception">
                    <template #default="{ percentage }">
                      <span class="percentage-value">{{ percentage }}%</span>
                    </template>
                  </el-progress>
                </div>
                <p class="wait">Please wait!</p>
                <p class="sub-message">Alexis Ivyedge is taking a picture</p>
              </template> -->
              <!-- <template v-else> -->
              <el-image
                :src="item.previewPath"
                fit="cover"
                :preview-src-list="
                  typeof item.sourcePath === 'string' ? [item.sourcePath] : item.sourcePath
                "
              ></el-image>
              <!-- </template> -->
            </div>
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
        <el-form :model="form" inline @keyup.enter.prevent="sendMessage">
          <el-form-item prop="reqTxt">
            <el-input v-model="form.reqTxt" placeholder="Type a message">
              <!-- <template #suffix>
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
              </template> -->
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
import { reactive, withDefaults, defineProps, defineEmits, ref, onUpdated } from 'vue'
import { ModelItem, SessionChatMessage } from '@/interface'
import { RESP_MESSAGE_TYPE, RESP_FROM_TYPE } from '@/common/constant'
import { sendMessageApi } from '@/apis'

const props = withDefaults(
  defineProps<{
    model: ModelItem
    sessionId: string
    sessionChatList: SessionChatMessage[]
  }>(),
  {
    model: undefined,
    sessionId: '',
    sessionChatList: () => [],
  }
)
const form = reactive({
  reqTxt: '',
})

const playVideo = (index: string) => {
  const audioRef = document.getElementById(`audioRef${index}`) as HTMLAudioElement
  audioRef?.play()
}

const emit = defineEmits(['refresh'])
const sendMessage = async () => {
  if (form.reqTxt) {
    const data = await sendMessageApi({
      sessionId: props.sessionId,
      modelId: props.model.id,
      reqTxt: form.reqTxt,
    })
    // eslint-disable-next-line vue/no-mutating-props
    props.sessionChatList.push({
      from: RESP_FROM_TYPE.USER.v,
      type: RESP_MESSAGE_TYPE.VOICE.v,
      txt: form.reqTxt,
    })
    form.reqTxt = ''
    // eslint-disable-next-line vue/no-mutating-props
    props.sessionChatList.push(data.res)
  }
}

const scrollToBottom = () => {
  const container = document.getElementsByClassName('chat-content')[0]
  container.scrollTop = container.scrollHeight + 10
}

onUpdated(scrollToBottom)

defineExpose({ scrollToBottom })
</script>
