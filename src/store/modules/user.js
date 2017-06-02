import Vue from 'vue'
import { setStorage, getStorage, removeStorage, jsonParse, jsonStringify } from '@/utils/utils'


import { defUserType } from '@/utils/type'

export default {
	state: jsonParse(getStorage('user') || '{}'),
    getters: {
        userType: (state) => {
            return {
                isRepair: state.userType === defUserType.repair,
                isGas: state.userType === defUserType.gas,
                isTyre: state.userType === defUserType.tyre
            }
        }
    },
	mutations: {
        /**
         * 登录成功
         */
        LOGIN(state, user) {
            setStorage('user', jsonStringify(user))
            Object.assign(state, user)
        },
        /**
         * 退出登录
         */
        LOGOUT(state) {
            removeStorage('user')
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
    },
    actions: {
        login({commit}, user) {
            commit('LOGIN', user)
        },
        
        logout({commit}) {
            commit('LOGOUT')
        }
    }
}