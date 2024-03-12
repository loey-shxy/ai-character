import service from '../http/request'
import { Response } from '../http/request'
import { handlerArrayData, handlerObjectData, handlerTableData } from '../http/request-utils'
import {
  SignInParams,
  SignUpParams,
  //SignUpResult,
  EmailAuthParams,
  UserDetail,
  ContactUsParams,
  ModelListQuery,
  ModelItem,
  Paging,
  SubscriptionPackage,
  SubscriptionOrder,
  ChatMessage,
  SendMessageParams,
  SessionItem,
  PaymentResponse,
  SessionChatMessage,
  SessionChatMessageQuery,
  SessionChatParams,
  Gallery,
} from '@/interface'

// login
export const signInApi = async (params: SignInParams, loading = true): Promise<Response> => {
  return await service({
    method: 'post',
    url: '/auth/login',
    data: params,
    loading,
  })
}
// register
export const signUpApi = async (params: SignUpParams, loading = true): Promise<Response> => {
  return await service({
    method: 'post',
    url: '/api/front/user/register',
    data: params,
    loading,
  })
}
// user information
export const userInfoApi = async (loading = true): Promise<UserDetail> => {
  return handlerObjectData(
    await service({
      method: 'get',
      url: '/api/front/user/detail',
      loading,
    })
  ) as UserDetail
}

// email auth
export const emailAuthApi = async (params: EmailAuthParams, loading = true): Promise<Response> => {
  return await service({
    method: 'post',
    url: '/api/front/user/email/auth',
    data: params,
    loading,
  })
}

// contact us
export const contactUsApi = async (params: ContactUsParams, loading = true): Promise<Response> => {
  return await service({
    method: 'post',
    url: '/api/front/connect-us',
    data: params,
    loading,
  })
}

// terms of service
export const termsOfServiceApi = async (loading = true): Promise<Response> => {
  return handlerObjectData(
    await service({
      method: 'get',
      url: '/api/front/info/team-of-service',
      loading,
    })
  ) as Response
}

// ai character list
export const getModelListApi = async (
  params: ModelListQuery,
  loading = true
): Promise<Paging<ModelItem>> => {
  return handlerTableData(
    await service({
      method: 'post',
      url: '/api/front/models/list',
      data: params,
      loading,
    })
  ) as Paging<ModelItem>
}

// subscription package
export const getSubscriptionPackageApi = async (
  loading = true
): Promise<Array<SubscriptionPackage>> => {
  return handlerArrayData(
    await service({
      method: 'get',
      url: '/api/front/sub/list',
      loading,
    })
  )
}

// create order
export const createSubscribeOrderApi = async (
  subKey: string,
  loading = true
): Promise<SubscriptionOrder> => {
  return handlerObjectData(
    await service({
      method: 'post',
      url: '/api/front/sub/create-order',
      data: { subKey },
      loading,
    })
  ) as SubscriptionOrder
}

// payment
export const orderPaymentApi = async (
  orderId: string,
  loading = true
): Promise<PaymentResponse> => {
  return handlerObjectData(
    await service({
      method: 'post',
      url: `/api/front/sub/payment/${orderId}`,
      loading,
    })
  ) as PaymentResponse
}

// create session
export const createSessionApi = async (
  params: SessionChatParams,
  loading = true
): Promise<ChatMessage> => {
  return handlerObjectData(
    await service({
      method: 'post',
      url: `/api/front/session/chat`,
      data: params,
      loading,
    })
  ) as ChatMessage
}

// delete session
export const deleteSessionApi = async (sessionId: string, loading = true): Promise<Response> => {
  return service({
    method: 'get',
    url: `/api/front/session/del/${sessionId}`,
    loading,
  })
}

// refresh session
export const refreshSessionApi = async (sessionId: string, loading = true): Promise<Response> => {
  return service({
    method: 'get',
    url: `/api/front/session/refresh/${sessionId}`,
    loading,
  })
}

// send message
export const sendMessageApi = async (
  params: SendMessageParams,
  loading = false
): Promise<ChatMessage> => {
  return handlerObjectData(
    await service({
      method: 'post',
      url: '/api/front/session/send-msg',
      data: params,
      loading,
    })
  ) as ChatMessage
}

// user session list
export const userSessionListApi = async (loading = true): Promise<Array<SessionItem>> => {
  return handlerArrayData(
    await service({
      method: 'get',
      url: '/api/front/session/list',
      loading,
    })
  )
}

// session chat list
export const sessionChatListApi = async (
  params: SessionChatMessageQuery,
  loading = true
): Promise<Paging<SessionChatMessage>> => {
  return handlerTableData(
    await service({
      method: 'post',
      data: params,
      url: '/api/front/session/chat-list',
      loading,
    })
  )
}

export const userGalleryApi = async (loading = true): Promise<Array<Gallery>> => {
  return handlerArrayData(
    await service({
      method: 'get',
      url: '/api/front/user/gallery',
      loading,
    })
  )
}
