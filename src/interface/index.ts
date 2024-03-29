// 分页参数
export interface PagingQuery {
  page: number
  limit: number
  [propName: string]: any
}

// 分页列表数据
export interface Paging<T> {
  total: number
  records: Array<T>
  [propName: string]: any
}

// token
export interface Token {
  token: string
  refreshToken: string
}

// 登录
export interface SignInParams {
  username: string
  password: string
  passport: string // GUEST 传 FRONT-GUEST 其他用户传 FRONT
}

// 注册
export interface SignUpParams {
  account: string
  password: string
}

// register result
export interface SignUpResult {
  userId: string
  account: string
  roles: string[]
  data: {}
  token: Token
}

// 用户信息
export interface UserDetail {
  id: string
  account: string
  roles: string[]
  data: {}
  subInfo: UserSettingSubInfo
}

export interface UserSettingSubInfo {
  subKey: string // 当前订阅key
  plan: string // 当前订阅计划
  paymentAt: string // 订阅支付时间
  endAt: string // 订阅到期时间
}

// 留言
export interface ContactUsParams {
  msg: string
}

// 用户邮箱验证
export interface EmailAuthParams {
  accountId: string
  code: string
}

// 模特列表请求参数
export interface ModelListQuery extends PagingQuery {
  type: number
}

// 模特图片
export interface ModelImage {
  main: string // 主图
  more: { preview: string; src: string }[]
}

// 模特列表信息
export interface ModelItem {
  id: string
  name: string
  desc: string // 说明
  personality: string // 人格
  occupation: string // 职业
  hobbies: string // 爱好
  relationship: string // 恋爱关系
  headUrl: string // 头像URL
  imgs: ModelImage
  [key: string]: any
}

// 模特分类
export interface ModelType {
  value: number
  label: string
}

// 订阅信息
export interface SubscriptionPackage {
  id: number
  unKey: string // 订阅key
  status: number // 订阅状态 1-启用 97-停用
  prices: number
  point: number // 订阅后点数
  desc: string // 订阅后说明
  type: number // 扣费类型 1-包月 2-包年 3-按点数
  voiceSize: number // 语音数量
  imageSize: number // 图像数量
  videoSize: number // 视频数量
  createdAt: string
}

// subscription order
export interface SubscriptionOrder {
  id: number
  uid: number // 用户id
  subKey: string // 订阅key
  subName: string // 订阅名称
  prices: number // 订单金额
  point: number // 订单点数
  type: number // 扣费类型
  voiceSize: number // 语音数量
  imageSize: number // 图像数量
  videoSize: number // 视频数量
  status: number // 订单状态 1-待支付 100-支付成功 80-支付过期 90-支付失败
  createdAt: string // 订单创建时间
  payAt: string // 支付时间
  payLimitTime: string // 支付时限 （分钟）
}

// Chat message result
export interface ChatMessage {
  sessionId: string // 会话id
  modelId: string // ai id
  uid: string // user id
  requestTxt: string // 收到的请求消息
  desc: string
  res: SessionChatMessage
  other: ModelItem
}

// send message
export interface SendMessageParams {
  sessionId: string
  modelId: string
  reqTxt: string
}

// user session list
export interface SessionItem {
  id: string
  uid: string
  model: ModelItem
}

export interface ResetPassword {
  email: string
}

export interface DropdownMenu {
  label: string
  icon: string
  path: string
}

export interface Message {
  id: number
  message: string
  type: string
  isPicture: boolean
  time: string
  picture: string
}

export interface ModelInfo {
  id: number
  name: string
  photo: Object
  lastMsg: string
}

export interface PaymentResponse {
  roles: string[]
  token: Token
}

export interface SessionChatMessage {
  type: number // 文件类型
  from: number // 1 模特 2 用户
  txt?: string // 文本信息
  txtVoice?: string // 文本消息对应的语音地址
  respTxt?: string // 返回的文本信息
  respTxtVoice?: string // 返回的文本消息的语音地址
  previewPath?: string // 预览图片地址
  sourcePath?: string // 原始图片地址
}

// 获取AI会话历史记录
export interface SessionChatMessageQuery extends PagingQuery {
  sessionId: string
  sort: string
}

export interface SessionChatParams {
  sessionId: string
  modelId: string
  newSession: number // 新会话 1 是 0 否
}

export interface Gallery {
  model: ModelSimple
  records: MediaImageSimple[]
}

export interface ModelSimple {
  id: string
  name: string
}

export interface MediaImageSimple {
  type: number
  from: number
  previewPath: string
  sourcePath: string
}
