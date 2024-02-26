import es6Promise from 'es6-promise'
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { hasToken, getToken, removeToken, getGuestToken, hasGuestToken } from '@/utils/cookie'
import { ElMessage, ElLoading } from 'element-plus'
import router from '@/router'

es6Promise.polyfill()
let tokenIsInvalid = false

const loadingOptions = { fullscreen: true, background: 'rgba(0, 0, 0, 0.5)' }
let loadingTimer: any = null // loading 定时器
let loadingOpenedCount = 0 // loading 打开次数

/**
 * @description 响应
 */
export interface Response {
  error?: any
  code?: string | number
  data?: any
  msg: string
  response: AxiosResponse
}

// 创建一个 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 60000, // 请求超时时间毫秒
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    clearTimeout(loadingTimer)
    loadingOpenedCount++
    if (hasGuestToken()) {
      config.headers.Authorization = getGuestToken()
    } else if (hasToken() && config.headers) {
      config.headers.Authorization = getToken()
    }
    ElLoading.service(loadingOptions)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    loadingOpenedCount--
    if (loadingOpenedCount <= 0) {
      loadingTimer = setTimeout(() => {
        ElLoading.service(loadingOptions).close()
      }, 100)
    }
    return response.data
  },
  (error) => {
    loadingOpenedCount--
    if (loadingOpenedCount <= 0) {
      loadingTimer = setTimeout(() => {
        ElLoading.service(loadingOptions).close()
      }, 100)
    }
    let { response } = error
    if (!response) {
      response = {
        status: 504,
        data: {},
      }
    }
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
          removeToken()
          router.replace({
            name: 'sign-in',
          })
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
    return error
  }
)

export default instance
