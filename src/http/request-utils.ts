import { isArray, isObject } from 'lodash'
import { Response } from '../http/request'
/**
 * 处理表格数据
 * @param error
 * @param code
 * @param data
 * @returns {{total: number, records: Array}}
 */
const handlerTableData = function (
	{ error, code, data }: Response,
	preset = { total: 0, records: [] }
) {
	return !error && (code === 1000 || code === 0) && isObject(data) ? data : preset
}
/**
 * 处理返回数组的数据
 * @param error
 * @param code
 * @param data
 * @param preset
 * @returns {Array}
 */
const handlerArrayData = function ({ error, code, data }: Response, preset = []) {
	return !error && (code === 1000 || code === 0) && isArray(data) ? data : preset
}

/**
 * 处理返回对象的数据
 * @param error
 * @param code
 * @param data
 * @param preset
 * @returns {*}
 */
const handlerObjectData = function ({ error, code, data }: Response, preset = {}) {
	return !error && (code === 1000 || code === 0) && isObject(data) ? data : preset
}

/**
 * 处理返回任意类型的数据
 * @param error
 * @param code
 * @param data
 * @param preset
 * @returns {*}
 */
const handlerData = function ({ error, code, data }: Response, preset: any = '') {
	return !error && (code === 1000 || code === 0) ? data : preset
}

export { handlerTableData, handlerArrayData, handlerObjectData, handlerData }
