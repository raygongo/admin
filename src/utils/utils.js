/**
 * 封装常用方法
 */
import pinyin from 'pinyin'

/**
 * 存储localStorage
 */
export const setStorage = (key, value) => {
	if (!key) return
	window.localStorage.setItem(key, value)
}

/**
 * 获取localStorage
 */
export const getStorage = key => {
	if (!key) return
	return window.localStorage.getItem(key)
}

/**
 * 删除localStorage
 */
export const removeStorage = key => {
	if (!key) return
	return window.localStorage.removeItem(key)
}

/**
 * 解析JSON
 */
export const jsonParse = jsonStr => {
	let json

	try {
		json = JSON.parse(jsonStr)
	} catch(e) {
		console.log(e)
	}

	return json
}

/**
 * 序列化JSON
 */
export const jsonStringify = json => JSON.stringify(json)

/**
 * 获取汉字的拼音首字母
 */
export const getInitial = str => {
	if (pinyin(str)[0] && pinyin(str)[0][0] && pinyin(str)[0][0][0]) {
		return pinyin(str)[0][0][0].toUpperCase()
	}
}

/**
 * 转换为字符串
 */
export const toString = val => {
	return val == null
		? ''
		: typeof(val) === 'object'
			? JSON.stringify(val)
			: String(val)
}

/**
 * 转换为数字
 */
export const toNumber = val => {
	const num = parseFloat(val)
	return isNaN(num) ? val : num 
}