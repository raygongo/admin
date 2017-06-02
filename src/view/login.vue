<template>
	<div class="login-container">
		<div class="login-header">
			<a class="app-download" href="javascript:void(0)">手机APP下载</a>
		</div>
		<div class="login-box">
			<div class="login-box-title">帐号密码登录</div>
			<div class="login-input-box">
				<div class="login-input-wrap" v-show="loginType === 'accountPwd'">
					<el-form ref="accountPwdForm" :model="accountPwdInfo" :rules="accountPwdRules">
						<label>登录帐号</label>
						<el-form-item prop="telephone">
							<el-input 
								v-model="accountPwdInfo.telephone" 
								:maxlength="11"></el-input>
						</el-form-item>
						<label>密码</label>
						<el-form-item class="pwd-input-wrap" prop="password">
							<el-input 
								:type="telInputType" 
								v-model="accountPwdInfo.password" 
								:maxlength="18"
								@keyup.enter.native="userLogin"></el-input>
							<div class="show-pwd" :class="{'show-pwd-focus': telInputType === 'text'}" @click="showPwd"></div>
						</el-form-item>
					</el-form>
				</div>
				<div class="login-input-wrap" v-show="loginType === 'mobileCode'">
					<el-form ref="mobileCodeForm" :model="mobileCodeInfo" :rules="mobileCodeRules">
						<label>手机号</label>
						<el-form-item prop="telephone">
							<el-input 
								v-model="mobileCodeInfo.telephone" 
								:maxlength="11"></el-input>
						</el-form-item>
						<label>验证码</label>
						<el-form-item prop="verify_code">
							<el-input 
								v-model="mobileCodeInfo.verify_code" 
								:maxlength="4" 
								style="width: 152px"></el-input>
							<div
								class="code-btn"
								:class="{'code-btn-active': isCode}"
								@click="getCode">{{ codeBtnText }}</div>
						</el-form-item>
					</el-form>
				</div>
				<div class="login-input-wrap">
					<button class="login-btn" @click="userLogin" v-loading="loading.isLoading">登录</button>
				</div>
				<div class="login-input-wrap switch-login-wrap">
					<a href="javascript:void(0)" class="switch-login-method" @click="switchLogin">{{ switchLoginText }}</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState } from 'vuex'

	export default {
		data() {
			const checkPwd = (rule, value, callback) => {
				const reg = /^[a-zA-Z0-9]{6,18}$/

				if (!reg.test(value)) {
					callback(new Error('请输入6-18位的数字和英文字母组合'))
				} else {
					callback()
				}
			}

			const checkCode = (rule, value, callback) => {
				const reg = /^\d{4}$/

				if (!reg.test(value)) {
					callback(new Error('请输入4位的数字验证码'))
				} else {
					callback()
				}
			}

			return {
				telInputType: 'password',

				code: 30,
				isCode: false,

				loginType: 'accountPwd',

				accountPwdInfo: {
					telephone: '',
					password: ''
				},

				mobileCodeInfo: {
					telephone: '',
					verify_code: ''
				},

				accountPwdRules: {
					telephone: [
					{required: true, message: '请输入帐号', trigger: 'blur'},
					{min: 11, max: 11, message: '请输入正确的11位帐号', trigger: 'blur'}
					],

					password: [
					{required: true, message: '请输入密码', trigger: 'blur'},
					{validator: checkPwd, trigger: 'blur'}
					]
				},

				mobileCodeRules: {
					telephone: [
					{required: true, message: '请输入手机号', trigger: 'blur'},
					{min: 11, max: 11, message: '请输入正确的11位手机号号', trigger: 'blur'}
					],

					verify_code: [
					{required: true, message: '请输入验证码', trigger: 'blur'},
					{validator: checkCode, trigger: 'blur'}
					]
				},

				timer: null
			}
		},

		computed: {
			...mapState(['loading']),

			switchLoginText() {
				return this.loginType === 'accountPwd' ? '使用手机号快捷登录 >' : '手机不在身边？切换密码登录'
			},

			codeBtnText() {
				return this.isCode ? '重新获取 '+this.code+'s' : '获取验证码'
			}
		},

		methods: {
			...mapActions(['login']),

			showPwd() {
				this.telInputType = this.telInputType === 'password' ? 'text' : 'password'
			},

			switchLogin() {
				if (this.loginType === 'accountPwd') {
					this.$refs['mobileCodeForm'].resetFields()
					this.loginType = 'mobileCode'
				} else {
					this.$refs['accountPwdForm'].resetFields()
					this.loginType = 'accountPwd'
				}
			},

			getCode() {
				this.$refs.mobileCodeForm.validateField('telephone', errMsg => {
					if (!errMsg) {
						this.$http.get(this.API.getVerifyCode, {telephone: this.mobileCodeInfo.telephone}).then(res => {
							this.isCode = true

							if (this.timer) {
								clearInterval(this.timer)
								this.code = 30
							}

							this.timer = setInterval(() => {
								if (this.code > 0) {
									this.code = this.code - 1
								} else {
									clearInterval(this.timer)
									this.timer = null
									this.isCode = false
									this.code = 30
								}
							}, 1000)
						})
					}
				})
			},

			userLogin() {
				let loginType = this.loginType,
					refForm,
					loginInfo,
					loginApi

				if (loginType === 'accountPwd') {
					refForm = 'accountPwdForm'
					loginInfo = this.accountPwdInfo
					loginApi = this.API.login
				} else {
					refForm = 'mobileCodeForm'
					loginInfo = this.mobileCodeInfo
					loginApi = this.API.verifyLogin
				}

				this.$refs[refForm].validate(valid => {
					if (valid) {
						this.$http.get(loginApi, loginInfo).then(res => {
							this.login({
								token: res.data.token,
								userType: res.data.user_type
							})
							this.$router.push({name: 'index'})
						})
					} else {
						return false
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.login-container {
		position: relative;
		width: 100%;
		height: 100%;
		background: url(/static/image/login_bg.png) center no-repeat;
		background-size: cover;

		.login-header {
			width: 100%;
			height: 80px;
			background: url(/static/image/logo.png) 40px center no-repeat;
			background-color: rgba(0, 0, 0, 0.5);

			.app-download {
				display: block;
				float: right;
				height: 80px;
				margin-right: 40px;
				padding-left: 20px;
				line-height: 80px;
				font-size: 14px;
				color: #fff;
				background: url(/static/image/phone.png) left center no-repeat;
				cursor: pointer;
				text-decoration: none;
			}
		}

		.login-box {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 340px;
			height: 409px;
			background: url(/static/image/login_box_bg.png) center no-repeat;

			.login-box-title {
				height: 78px;
				line-height: 78px;
				font-size: 20px;
				text-align: center;
				color: #d70d18;
			}

			.login-input-box {
				padding: 40px;
			}

			.login-input-wrap {
				&:not(:last-child) {
					margin-bottom: 22px;
				}
			}

			.pwd-input-wrap {
				position: relative;

				.show-pwd {
					position: absolute;
					right: 0;
					top: 0;
					width: 38px;
					height: 38px;
					background: url(/static/image/show-password.png) center no-repeat;
				}

				.show-pwd-focus {
					background-image: url(/static/image/show-password2.png);
				}
			}

			.verification-wrap {
				display: inline-block;
				width: 148px;
				margin-right: 5px;
			}

			.code-btn {
				width: 100px;
				height: 36px;
				display: inline-block;
				font-size: 12px;
				vertical-align: top;
				background-color: #fff;
				border: 1px solid #000;
				outline: none;
				text-align: center;
				border-radius: 4px;
			}

			.code-btn-active {
				background-color: #9a9a9a;
				border-color: #9a9a9a;
				color: #fff;
			}

			.switch-login-wrap {
				text-align: center;
				cursor: pointer;

				.switch-login-method {
					display: inline-block;
					color: #000;
					text-decoration: none;
					border-bottom: 1px solid #000;
					font-size: 14px;
				}
			}

			label {
				display: block;
				font-size: 14px;
				color: #bababa;
				margin-bottom: 12px;
			}

			input {
				width: 100%;
				height: 38px;
				line-height: 38px;
				padding: 0 9px;
				outline: none;
				border: none;
				border: 1px solid #bababa;
				color: #bababa;

				&:focus {
					border: 1px solid #000;
					color: #000;
				}
			}

			.login-btn {
				width: 100%;
				height: 40px;
				background-color: #d80d18;
				border: none;
				outline: none;
				color: #fff;
				cursor: pointer;

				&:active {
					opacity: .8;
				}
			}
		}
	}
</style>