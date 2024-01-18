import es6Promise from 'es6-promise'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { isArray, merge, isObject } from 'lodash'

es6Promise.polyfill()

/**
 * @description 请求方法
 */
export enum RequestMethods {
	Get = 'get',
	Post = 'post',
	Put = 'put',
	Delete = 'delete',
	Options = 'options',
}

/**
 * @description 请求配置
 */
export interface RequestConfig extends AxiosRequestConfig {
	loading?: boolean // loading 配置
	download?: boolean // 是否为下载请求
}

/**
 * @description 响应
 */
export interface Response {
	error?: any
	code?: string | number
	data?: any
	message: string
	response: AxiosResponse
}

let loadingTimer: any = null // loading 定时器
let loadingOpenedCount = 0 // loading 打开次数

export default class Http {
	baseUrl: string | undefined = '/'
	request: AxiosInstance
	config: AxiosRequestConfig
	loadingText = '加载中，请稍等'

	constructor(config: AxiosRequestConfig, loadingText: string = '加载中...') {
		this.config = merge(
			{
				baseUrl: '/', // 根路径
				timeout: 10 * 60 * 1000, // 超时时间
				withCredentials: false, // 允许跨域携带cookie信息
			},
			config
		)

		this.baseUrl = this.config.baseURL
		this.request = axios.create(this.config)
		this.loadingText = loadingText
	}

	/**
	 * @description 请求拦截器
	 * @param onFulfill
	 * @param onRejected
	 */
	requestInterceptor(onFulfill: any, onRejected: any = null) {
		this.request.interceptors.request.use(onFulfill, onRejected)
	}

	/**
	 * @description 响应拦截器
	 * @param onFulfill
	 * @param onRejected
	 */
	responseInterceptor(onFulfill: any, onRejected: any) {
		this.request.interceptors.response.use(onFulfill, onRejected)
	}

	/**
	 * @description API 请求
	 * @param requestConfig
	 * @returns
	 */
	private async fetch(requestConfig: RequestConfig): Promise<Response> {
		if (requestConfig.loading) {
			clearTimeout(loadingTimer)
			loadingOpenedCount++
			// $q.loading.show({message: this.loadingText})
		}
		try {
			const options: RequestConfig = merge(
				{},
				{
					download: false, // true 文件下载
					method: RequestMethods.Get, // 请求模式
					url: '', // 请求地址
					headers: {
						// 请求头
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
					params: {}, // 请求地址?后面的参数
					paramsSerializer: (params: any) => {
						// ? 后面的参数序列化
						return qs.stringify(params, { indices: false, encodeValuesOnly: true })
					},
					data: {}, // 表单数据
				},
				requestConfig
			)

			const response = await this.request(options)

			// 如果是下载不能直接返回 response.data, 须返回 response，由下载点处理 response.data
			const result: Response = merge(
				options.download
					? {}
					: isObject(response.data)
						? response.data
						: {
								code: `${response.status}`,
								data: response.data,
							},
				{ response }
			)
			return result
		} catch (e) {
			return new Promise((resolve) => {
				resolve(null as any)
			})
		} finally {
			if (requestConfig.loading) {
				loadingOpenedCount--
				if (loadingOpenedCount <= 0) {
					loadingTimer = setTimeout(() => {
						// $q.loading.hide()
					}, 100)
				}
			}
		}
	}

	async get(requestConfig: RequestConfig): Promise<Response> {
		requestConfig.method = RequestMethods.Get
		return await this.fetch(requestConfig)
	}

	async post(requestConfig: RequestConfig): Promise<Response> {
		requestConfig.method = RequestMethods.Post
		return await this.fetch(requestConfig)
	}

	async put(requestConfig: RequestConfig): Promise<Response> {
		requestConfig.method = RequestMethods.Put
		return await this.fetch(requestConfig)
	}

	async delete(requestConfig: RequestConfig): Promise<Response> {
		requestConfig.method = RequestMethods.Delete
		return await this.fetch(requestConfig)
	}
}
