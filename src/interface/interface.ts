export interface SignIn {
	email: string
	password: string
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
