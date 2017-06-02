import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store/'
import request from '@/utils/ajax'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '@/style/normalize.css'
import '@/style/common.css'
import * as filters from '@/utils/filters'
import * as API from '@/config/api'
Vue.use(ElementUI)

// 开发环境开启vue-devtools，生产环境关闭
Vue.config.devtools = process.env.NODE_ENV === 'development' ? true : false

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

/**
 * 请求方法挂载到Vue
 * 实例中: this.$http.get(url, params) this.$http.post(url, data)
 */
Vue.prototype.$http = request

Vue.prototype.API = API

Vue.prototype.$showSuccess = function (msg) {
	this.$notify({
		title: '成功',
		message: msg,
		type: 'success'
	});
}

Vue.prototype.routerPush = (name, params = {}) => {
	router.push({
		name,
		params
	})
}

router.beforeEach((to, from, next) => {
	let token = store.state.user.token
	if (!to.meta.noAuth) {
		token 
			? next() 
			: next('/login')
	} else {
		token 
			? next('/') 
			: next()
	}
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
