import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import userInfo from './modules/userInfo'
import loading from './modules/loading'

Vue.use(Vuex)

export default new Vuex.Store({
	strict : process.env.NODE_ENV !== 'production',
	modules: {
		user,
		loading,
		userInfo
	}
})