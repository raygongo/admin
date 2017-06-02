import Vue from 'vue'
import { setStorage, getStorage, removeStorage, jsonParse, jsonStringify } from '@/utils/utils'

export default {
	state    : {
		QRCode          : '',
		address         : '',
		business_scope  : '',
		create_date     : '',
		header_img      : '',
		id              : "",
		manager_name    : "",
		name            : "",
		phone           : "",
		repair_qualified: "",
		repair_type     : "",
		user_type       : ""
	},
	mutations: {
		/**
		 * 获取
		 */
		GET_USER_INFO(state, userInfo) {
			Object.assign(state, userInfo)
		},
		/**
		 * 修改头像
		 */
		EDIT_HEADER_IMG(state, url) {
			state.header_img = url
		},
		/**
		 * 修改经营范围
		 */
		EDIT_SCOPE(state, text) {
			state.business_scope = text
		},

	},
	actions  : {
		getUserInfo({commit}, userInfo) {
			commit('GET_USER_INFO', userInfo)
			document.getElementById("codeDom") && new QRCode(document.getElementById("codeDom"), {
				text        : userInfo.QRCode,
				width       : 150,
				height      : 150,
				colorDark   : "#000000",
				colorLight  : "#ffffff",
				correctLevel: QRCode.CorrectLevel.H
			});

		},

		editHeaderImg({commit}, url) {
			commit('EDIT_HEADER_IMG', url)
		},

		editScope({commit}, text){
			commit('EDIT_SCOPE', text)
		}
	}
}