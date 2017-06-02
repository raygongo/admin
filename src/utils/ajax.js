/**
 * 封装请求方法
 */

import axios from 'axios'
import vue from 'vue'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { baseUrl } from '@/config/env'

const fetch = options => {
	return new Promise((resolve, reject) => {
		const instance = axios.create({
			baseUrl
		})

		// instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

		/**
		 * 请求拦截
		 * 发起请求时带上token，开启loading动画
		 */
		instance.interceptors.request.use(req => {
			store.commit('SHOW_LOADING')

			let token = store.state.user.token
			if (token) req.headers.token = token

			return req
		}, err => {
			return Promise.reject(err)
		})

		/**
		 * 响应拦截
		 * 关闭loading动画
		 */
		instance.interceptors.response.use(res => {
			store.commit('HIDE_LOADING')

			return res
		}, err => {
			return Promise.reject(err)
		})

		instance(options)
			.then(response => {
				const res = response.data

				/**
				 * 接口状态等于1，resolve数据
				 * 接口状态不等于1：
				 * 等于0，则弹出返回的错误信息，且errno为10002（未登录状态）时直接返回登录界面并清除用户信息
				 * 不等于0，则直接报错
				 */
				if (res.status !== 1) {
					if (res.status === 0) {
						Message.warning({message: res.errmsg})

						if (res.errno === '10002') {
							store.commit('LOGOUT')
							router.push({name: 'login'})
						}
					} else {
						Message.warning({message: '出错啦！请刷新重试或联系系统管理员'})
					}
				} else {
					resolve(res)
				}
			})
			.catch(err => {
				Message.warning({message: '出错啦！请刷新重试或联系系统管理员'})
			})
	})
}

export default {
	get(url, params = {}) {
		return fetch({method: 'get', url, params})
	},

	post(url, data = {}) {
		return fetch({method: 'post', url, data})
	}
}