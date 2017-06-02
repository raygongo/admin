import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 登录
const login = resolve => require(['@/view/login'], resolve)

const home = resolve => require(['@/view/home'], resolve)
const index = resolve => require(['@/view/index'], resolve)

// 员工管理
const staffList = resolve => require(['@/view/staff/staffList'], resolve)
const staffAdd = resolve => require(['@/view/staff/staffAdd'], resolve)
const staffEdit = resolve => require(['@/view/staff/staffEdit'], resolve)
const staffDetail = resolve => require(['@/view/staff/staffDetail'], resolve)

// 账户管理
const accountManage = resolve => require(['@/view/account/accountManage'], resolve)
const userIdentify = resolve => require(['@/view/account/userIdentify'], resolve)
const alipayAccount = resolve => require(['@/view/account/alipayAccount'], resolve)
const cashPassword = resolve => require(['@/view/account/cashPassword'], resolve)
const companyCard = resolve => require(['@/view/account/companyCard'], resolve)
const personCard = resolve => require(['@/view/account/personCard'], resolve)
const companyIdentify = resolve => require(['@/view/account/companyIdentify'], resolve)
const cashAccount = resolve => require(['@/view/account/cashAccount'], resolve)


// 积分管理
const scoreList = resolve => require(['@/view/score/scoreList'], resolve)

// 提现管理
const cashList = resolve => require(['@/view/cash/cashList'], resolve)

// 订单管理
const orderList = resolve => require(['@/view/order/orderList'], resolve)
const orderDetail = resolve => require(['@/view/order/orderDetail'], resolve)

// 发票管理
const invoice = resolve => require(['@/view/invoice/invoice'], resolve)
const invoiceDetail = resolve => require(['@/view/invoice/invoiceDetail'], resolve)
const invoiceEdit = resolve => require(['@/view/invoice/invoiceEdit'], resolve)

// 公告管理
const noticeList = resolve => require(['@/view/notice/noticeList'], resolve)
const noticeDetail = resolve => require(['@/view/notice/noticeDetail'], resolve)

// 个人中心
const userCenter = resolve => require(['@/view/user/userCenter'], resolve)
const EditPassword = resolve => require(['@/view/user/EditPassword'], resolve)

// 业务配置
const oilConfig = resolve => require(['@/view/config/oilConfig'], resolve)
const gasConfig = resolve => require(['@/view/config/gasConfig'], resolve)
const tyreConfig = resolve => require(['@/view/config/tyreConfig'], resolve)

const repairConfig = resolve => require(['@/view/config/repairConfig'], resolve)


export default new Router({
	routes: [{
		path: '/login',
		name: 'login',
		component: login,
		meta: {
			noAuth: true
		}
	}, {
		path: '/',
		component: home,
		children: [{
			path: '',
			name: 'index',
			component: index,
			meta: {
				tag: 'index'
			}
		}, {
			path: '/staffList',
			name: 'staffList',
			component: staffList,
			meta: {
				tag: 'staff'
			}
		}, {
			path: '/staffAdd',
			name: 'staffAdd',
			component: staffAdd,
			meta: {
				tag: 'staff'
			}
		}, {
			path: '/staffEdit/:id',
			name: 'staffEdit',
			component: staffEdit,
			meta: {
				tag: 'staff'
			}
		}, {
			path: '/staffDetail/:id',
			name: 'staffDetail',
			component: staffDetail,
			meta: {
				tag: 'staff'
			}
		}, {
			path: '/accountManage',
			name: 'accountManage',
			component: accountManage,
			meta: {
				tag: 'account'
			}
		}, {
			path: '/userIdentify',
			name: 'userIdentify',
			component: userIdentify,
			meta: {
				tag: 'account'
			}
		}, {
			path: '/alipayAccount',
			name: 'alipayAccount',
			component: alipayAccount,
			meta: {
				tag: 'account'
			}
		}, {
			path: '/cashPassword',
			name: 'cashPassword',
			component: cashPassword,
			meta: {
				tag: 'account'
			}
		}, {
			path: '/companyCard',
			name: 'companyCard',
			component: companyCard,
			meta: {
				tag: 'account'
			}
		},{
			path: '/personCard',
			name: 'personCard',
			component: personCard,
			meta: {
				tag: 'account'
			}
		}, {
			path: '/scoreList',
			name: 'scoreList',
			component: scoreList,
			meta: {
				tag: 'score'
			}
		}, {
			path: '/cashList',
			name: 'cashList',
			component: cashList,
			meta: {
				tag: 'cash'
			}
		}, {
			path: '/orderList',
			name: 'orderList',
			component: orderList,
			meta: {
				tag: 'order'
			}
		}, {
			path: '/orderDetail/:id',
			name: 'orderDetail',
			component: orderDetail,
			meta: {
				tag: 'order'
			}
		}, {
			path: '/invoice',
			name: 'invoice',
			component: invoice,
			meta: {
				tag: 'invoice'
			}
		}, {
			path: '/invoiceDetail',
			name: 'invoiceDetail',
			component: invoiceDetail,
			meta: {
				tag: 'invoice'
			}
		}, {
			path: '/invoiceEdit',
			name: 'invoiceEdit',
			component: invoiceEdit,
			meta: {
				tag: 'invoice'
			}
		}, {
			path: '/noticeList',
			name: 'noticeList',
			component: noticeList,
			meta: {
				tag: 'notice'
			}
		}, {
			path: '/noticeDetail/:id',
			name: 'noticeDetail',
			component: noticeDetail,
			meta: {
				tag: 'notice'
			}
		}, {
			path: '/userCenter',
			name: 'userCenter',
			component: userCenter,
			meta: {
				tag: 'user'
			}
		}, {
			path: '/editPassword',
			name: 'editPassword',
			component: EditPassword,
			meta: {
				tag: 'user'
			}
		}, {
			path: '/oilConfig',
			name: 'oilConfig',
			component: oilConfig,
			meta: {
				tag: 'oilConfig'
			}
		}, {
			path: '/gasConfig',
			name: 'gasConfig',
			component: gasConfig,
			meta: {
				tag: 'gasConfig'
			}
		}, {
			path: '/tyreConfig',
			name: 'tyreConfig',
			component: tyreConfig,
			meta: {
				tag: 'tyreConfig'
			}
		}, {
			path: '/repairConfig',
			component: repairConfig,
			meta: {
				tag: 'repair'
			}
		},{
			path: '/companyIdentify',
			name: 'companyIdentify',
			component: companyIdentify,
			meta: {
				tag: 'account'
			}
		},{
			path: '/cashAccount',
			name: 'cashAccount',
			component: cashAccount,
			meta: {
				tag: 'account'
			}
		}
		]
	}]
})