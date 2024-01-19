import { handlerObjectData } from '../http/request-util'
import { SignInParams, SignUpParams, UserDetail, ContactUsParams } from '../interface/interface'
import service from '../http/axios'

// 登录
export const signInApi = async (params: SignInParams): Promise<Response> => {
	return await service({
		url: '/auth/login',
		data: params,
		method: 'post',
	})
}
// 注册
export const signUpApi = async (params: SignUpParams): Promise<Response> => {
	return await service({
		method: 'post',
		url: '/front/user/register',
		data: params,
	})
}

// 获取服务条款
export const termsOfServiceApi = async (): Promise<Response> => {
	return await service({
		url: '/front/info/team-of-service',
		method: 'get',
	})
}
