import { defineStore } from 'pinia'
import { UserDetail } from '../interface'

interface UserStore {
	userInfo: UserDetail
}
export const useUserStore = defineStore('userInfo', {
	state: (): UserStore => {
		return {
			userInfo: {} as UserDetail,
		}
	},
	actions: {
		setUserInfo(userInfo: UserDetail) {
			this.userInfo = userInfo
		},
	},
})
