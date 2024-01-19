import es6Promise from 'es6-promise'
import axios, { AxiosInstance } from 'axios'
import { hasToken, getToken, getTokenKey } from '@/utils/cookie'
import { ElMessage } from 'element-plus'
es6Promise.polyfill()
let tokenIsInvalid = false

// 创建一个 axios 实例
const instance: AxiosInstance = axios.create({
	baseURL: '/api',
	timeout: 60000, // 请求超时时间毫秒
	withCredentials: true, // 异步请求携带cookie
	headers: {
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
	},
})

// 添加请求拦截器
instance.interceptors.request.use(
	(config) => {
		if (hasToken() && config.headers) {
			config.headers[getTokenKey()] = getToken()
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// 添加响应拦截器
instance.interceptors.response.use(
	(response) => {
		let message = 'Server busy, please try again later'
		const { status } = response
		switch (status) {
			case 401:
				message = 'Login timeout, please log in again'
				if (!tokenIsInvalid) {
					ElMessage({
						type: 'warning',
						message,
					})
					location.href = '/sign-in'
				}
				tokenIsInvalid = true
				break
			case 403:
				message = 'You do not have permission to access, please contact the administrator'
				break
			case 404:
				message = 'The resource you accessed does not exist'
				break
			case 405:
				message = 'Server, request method is not supported'
				break
			case 408:
				message = 'Request timed out, please try again later'
				break
			case 500:
				message = 'Server busy, please try again later'
				break
			case 504:
				message = 'Network timeout, please check if the API address is accessible'
				break
			default:
				break
		}

		if (status !== 401) {
			ElMessage({
				type: 'warning',
				message,
			})
		}

		return response
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default instance
