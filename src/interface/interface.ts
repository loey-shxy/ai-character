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

// 用户信息
export interface UserDetail {
	id: string
	account: string
	roles: string[]
	data: {}
}

// 留言
export interface ContactUsParams {
  msg: string
}

export interface ResetPassword {
	email: string
}

export interface ModelInfo {
	id: number
	name: string
	photo: string
	lastMsg: string
}

export interface ChatMessage {
	id: number
	message: string
	type: string
	isPicture: boolean
	time: string
}

export interface DropdownMenu {
	label: string
	icon: string
	path: string
}
