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
} from '@/interface'

// login
export const signInApi = async (params: SignInParams): Promise<Response> => {
  return await service({
    method: 'post',
    url: '/auth/login',
    data: params,
  })
}
// register
export const signUpApi = async (params: SignUpParams): Promise<Response> => {
  return await service({
    method: 'post',
    url: '/api/front/user/register',
    data: params,
  })
}
// user information
export const userInfoApi = async (): Promise<UserDetail> => {
  return handlerObjectData(
    await service({
      method: 'get',
      url: '/api/front/user/detail',
    })
  ) as UserDetail
}

// email auth
export const emailAuthApi = async (params: EmailAuthParams): Promise<Response> => {
  return await service({
    method: 'post',
    url: '/api/front/user/email/auth',
    data: params,
  })
}

// contact us
export const contactUsApi = async (params: ContactUsParams): Promise<Response> => {
  return await service({
    method: 'post',
    url: '/api/front/connect-us',
    data: params,
  })
}

// terms of service
export const termsOfServiceApi = async (): Promise<Response> => {
  return handlerObjectData(
    await service({
      method: 'get',
      url: '/api/front/info/team-of-service',
    })
  ) as Response
}

// ai character list
export const getModelListApi = async (params: ModelListQuery): Promise<Paging<ModelItem>> => {
  return handlerTableData(
    await service({
      method: 'post',
      url: '/api/front/models/list',
      data: params,
    })
  ) as Paging<ModelItem>
}

// subscription package
export const getSubscriptionPackageApi = async (): Promise<Array<SubscriptionPackage>> => {
  return handlerArrayData(
    await service({
      method: 'get',
      url: '/api/front/sub/list',
    })
  )
}

// create order
export const createSubscribeOrderApi = async (subKey: string): Promise<SubscriptionOrder> => {
  return handlerObjectData(
    await service({
      method: 'post',
      url: '/api/front/sub/create-order',
      data: { subKey },
    })
  ) as SubscriptionOrder
}

// payment
export const orderPaymentApi = async (orderId: string): Promise<PaymentResponse> => {
  return handlerObjectData(
    await service({
      method: 'post',
      url: `/api/front/sub/payment/${orderId}`,
    })
  ) as PaymentResponse
}

// create session
export const createSessionApi = async (params: SessionChatParams): Promise<ChatMessage> => {
  return handlerObjectData(
    await service({
      method: 'post',
      url: `/api/front/session/chat`,
      data: params,
    })
  ) as ChatMessage
}

// delete session
export const deleteSessionApi = async (sessionId: string): Promise<Response> => {
  return service({
    method: 'get',
    url: `/api/front/session/del/${sessionId}`,
  })
}

// refresh session
export const refreshSessionApi = async (sessionId: string): Promise<Response> => {
  return service({
    method: 'get',
    url: `/api/front/session/refresh/${sessionId}`,
  })
}

// send message
export const sendMessageApi = async (params: SendMessageParams): Promise<ChatMessage> => {
  return handlerObjectData(
    await service({
      method: 'post',
      url: '/api/front/session/send-msg',
      data: params,
    })
  ) as ChatMessage
}

// user session list
export const userSessionListApi = async (): Promise<Array<SessionItem>> => {
  return handlerArrayData(
    await service({
      method: 'get',
      url: '/api/front/session/list',
    })
  )
}

// session chat list
export const sessionChatListApi = async (
  params: SessionChatMessageQuery
): Promise<Paging<SessionChatMessage>> => {
  return handlerTableData(
    await service({
      method: 'post',
      data: params,
      url: '/api/front/session/chat-list',
    })
  )
}
