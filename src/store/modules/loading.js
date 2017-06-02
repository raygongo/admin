import Vue from 'vue'

export default {
	state: {
        isLoading: false
    },
	mutations: {
        SHOW_LOADING(state) {
            state.isLoading = true
        },

        HIDE_LOADING(state) {
            state.isLoading = false
        }
    },
    actions: {
        showLoading({commit}) {
            commit('SHOW_LOADING')
        },

        hideLoading({commit}) {
            commit('HIDE_LOADING')
        }
    }
}