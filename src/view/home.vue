<template>
	<div class="app-container">
		<div class="side-container">
			<img class="side-logo" src="/static/image/logo.png">
			<el-menu :default-active="defaultActive" theme="dark" :router="true">
				<el-menu-item index="/"><i class="el-icon-setting"></i>首页</el-menu-item>
				<el-menu-item index="/staffList" ><i class="el-icon-setting"></i>员工管理</el-menu-item>
				<el-menu-item index="/tyreConfig" v-if="true"><i class="el-icon-setting"></i>业务配置（轮胎店）</el-menu-item>
				<el-menu-item index="/oilConfig" v-if="true"><i class="el-icon-setting"></i>业务配置（加油）</el-menu-item>
				<el-menu-item index="/gasConfig" v-if="true"><i class="el-icon-setting"></i>业务配置（加气）</el-menu-item>
				<el-menu-item index="/repairConfig" v-if="true"><i class="el-icon-setting"></i>业务配置（维修员）</el-menu-item>
				<el-menu-item index="/accountManage"><i class="el-icon-setting"></i>账户管理</el-menu-item>
				<el-submenu index="5">
					<template slot="title"><i class="el-icon-setting"></i>交易管理</template>
					<el-menu-item index="/scoreList">积分管理</el-menu-item>
					<el-menu-item index="/cashList">提现管理</el-menu-item>
					<el-menu-item index="/orderList">订单管理</el-menu-item>
					<el-menu-item index="/invoice">发票管理</el-menu-item>
				</el-submenu>
				<el-menu-item index="/userCenter"><i class="el-icon-setting"></i>个人中心</el-menu-item>
				<el-menu-item index="/noticeList"><i class="el-icon-setting"></i>公告管理</el-menu-item>
			</el-menu>
		</div>
		<div class="main-container">
			<div class="main-header">
				<div class="main-header-msg">欢迎使用货车兄弟后台管理系统</div>
				<div class="main-header-user">
					<div class="main-header-avatar">
						<img :src="userInfo.header_img">
					</div>
					<div class="main-header-dropdown">
						<el-dropdown>
							<span class="el-dropdown-link">
								{{ userInfo .manager_name }}<i class="el-icon-caret-bottom el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click.native="routerPush('userCenter')">个人中心</el-dropdown-item>
								<el-dropdown-item>修改密码</el-dropdown-item>
								<el-dropdown-item @click.native="userLogout">退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
			</div>
			<div class="main-content" v-loading="loading.isLoading">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState } from 'vuex'
	import { defUserType } from '@/utils/type'
	import { getStorage,jsonParse } from '@/utils/utils'
	export default {
		data() {
			return {
				defaultActive: '/',
				defUserType
			}
		},

		computed: {
			...mapState(['loading','user','userInfo']),
			userType(){

				let userType ;
				let userData = jsonParse(getStorage('user'))

				userData.userType && (userType = userData.userType)

				return userType

			},
		},

		created() {
			this.changeMenuActive(this.$route.meta.tag)
			this.getUserInfoData()
		},

		watch: {
			'$route'(val, oldVal) {
				this.changeMenuActive(val.meta.tag)
			}
		},

		methods: {
			...mapActions(['logout', 'getUserInfo']),

			getUserInfoData() {
				this.$http.get(this.API.userInfo).then(res => {
					this.getUserInfo(res.data)
				})
			},

			userLogout() {
				this.$http.get(this.API.logout).then(res => {
					this.logout()
					this.$router.push('/login')
				})
			},

			changeMenuActive(tag) {
				const obj = {
					index: '/',
					staff: '/staffList',
					score: '/scoreList',
					account: '/accountManage',
					cash: '/cashList',
					order: '/orderList',
					invoice: '/invoice',
					user: '/userCenter',
					notice: '/noticeList',
					oilConfig: '/oilConfig',
					gasConfig: '/gasConfig',
					tyreConfig: '/tyreConfig',
					repair: '/repairConfig'
				}

				if (obj[tag]) this.defaultActive = obj[tag]
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin.less';

	.app-container {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding-left: 170px;

		.side-container {
			position: fixed;
			left: 0;
			top: 0;
			width: 170px;
			height: 100%;
			overflow: scroll;
			background-color: #1A1E28;
			overflow: auto;

			.side-logo {
				display: block;
				width: 120px;
				margin: 30px auto 30px;
			}
		}

		.main-container {
			position: relative;
      		min-height: 100%;
			width: 100%;
			padding-top: 60px;
      		background-color: #e7eaf0;

			.main-header {
				position: fixed;
				left: 170px;
				top: 0;
				width: e("calc(100% - 170px)");
				height: 60px;
				line-height: 60px;
				background-color: #fff;
				color: #000;
				font-size: 14px;
				z-index: 999;

				.main-header-msg {
					float: left;
					padding-left: 30px;
					margin-left: 40px;
					background: url(/static/image/Notice.png) left center no-repeat;
				}

				.main-header-user {
					float: right;
					margin-right: 50px;

					.main-header-avatar {
						display: inline-block;
						width: 40px;
						height: 40px;
						padding-top: 10px;
						margin-right: 10px;
						border-radius: 50%;

						img {
							width: 40px;
							height: 40px;
						}
					}

					.main-header-dropdown {
						display: inline-block;
						vertical-align: top;

						.el-dropdown-link {
							cursor: pointer;
						}
					}
				}
			}

			.main-content {
				width: 100%;
				padding: 20px;
			}
		}
	}
</style>
