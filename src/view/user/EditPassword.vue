<template>
	<div>
		<div class="bead-title">
			<mis-breadcrumb separator="-"
			                :attr="[{name: '个人中心', to: '/userCenter'},{name: titleName}]"></mis-breadcrumb>
		</div>

		<div class="main">
			<mis-title :title="titleName"></mis-title>

			<div class="form-content">
				<div class="form-box">
					<el-form :label-position="'right'" label-width="100px" :model="userForm" :rules="rules"
					         ref="userForm">
						<el-form-item label="新登录密码" prop="newPWD">
							<el-input v-model="userForm.newPWD" placeholder="请设输入新登录密码" :type="inputType"></el-input>
							<div
									class="show-pwd"
									:class="{hidePwd:inputType=='text'}"
									@click="isShowPwd"></div>
						</el-form-item>
						<el-form-item label="手机号码" prop="tel">
							<el-input v-model="userForm.tel" placeholder="请输入手机号码" style="width: 64%;"></el-input>
							<mis-time-button
									text="获取验证码"
									:time="60"
									v-model="startTime"
									type="success"
									ref="timeButton"
									@click.native="getVerifyCode"></mis-time-button>
						</el-form-item>
						<el-form-item label="短信验证码" prop="verify_code">
							<el-input v-model="userForm.verify_code" placeholder="请输入短信验证码"></el-input>
						</el-form-item>
						<span class="validate-msg-btn" @click="showDialog=true;">收不到验证码?</span>
					</el-form>
				</div>
				<div class="bottom-btn">
					<el-button type="danger" style="width: 100px" @click="submitForm('userForm')">确认</el-button>

				</div>
			</div>

		</div>

		<el-dialog :visible.sync="showDialog" size="small">
			<div class="mis-dialog">
				<div class="dialog-title">收不到验证码?</div>
				<div class="dialog-info">验证码一般会在2-10分钟内发送到用户手机，请耐心等待！
					<br/>
					如收不到短信验证码：
				</div>
				<ul class="dialog-warning">
					<li>1.请检查输入手机号码是否有误</li>
					<li>2.请检查手机网通信信号是否良好</li>
					<li>3.检查无误仍然收不到短信验证码请联系客服&nbsp;400-892-2017</li>
				</ul>

			</div>
			<img class="bg-cat" src="static/image/dialog_cat.png" alt="">
		</el-dialog>

	</div>
</template>

<script type="text/ecmascript-6">
	import misBreadcrumb from '@/components/breadcrumb'
	import misTitle from '@/components/title'
	import misTimeButton from '@/components/timeButton'

	export default {
		data() {
			// 新密码验证
			let checkPwd = (rule, value, callback) => {
				let reg = /^[0-9a-zA-Z]{8,20}$/
				if (reg.test(value)) {
					return callback();
				} else {
					return callback(new Error('请输入8~20位密码'))
				}

			};
			return {
				titleName : '修改密码',
				userForm  : {
					newPWD     : '',
					tel        : '',
					verify_code: ''
				},
				startTime : false,
				rules     : {
					newPWD     : [{
						validator: checkPwd,
						trigger  : 'blur'
					}],
					tel        : [{
						required: true,
						message : '请输入正确的手机号码',
						trigger : 'blur'
					}, {
						len    : 11,
						message: '请输入正确的手机号码',
						trigger: 'blur'
					}],
					verify_code: [{
						required: true,
						message : '请输入收到的短信验证码',
						trigger : 'blur'
					},],
				},
				showDialog: false,
				inputType : 'password'
			}
		},
		methods   : {
			// 修改密码
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http.get(this.API.editUserInfo, {
							password   : this.userForm.newPWD,
							mode       : 'setPwd',
							verify_code: this.userForm.verify_code
						}).then(res => {
							// 发送通知
							this.$notify({
								title: '成功',
								message: res.data.msg,
								type: 'success'
							})
							// 清空表单值
							this.$refs['userForm'].resetFields()
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			// 是否显示密码
			isShowPwd(){
				if (this.inputType == 'password' && this.userForm.newPWD) {
					this.inputType = 'text';
				} else {
					this.inputType = 'password';
				}
			},
			/**
			 * 获取验证码
			 */
			getVerifyCode(){
				this.$refs['userForm'].validateField('tel', (err) => {
					console.log(err)
					if (!err.length && this.$refs.timeButton.shouldClick) {

						this.$http.get(this.API.getVerifyCode, {
							telephone: this.userForm.tel,
							mode     : 'setpwd'
						}).then(data => {
							this.$refs.timeButton.clickButton()
							this.startTime = true
						})
					}
				})

			}
		},
		computed  : {},
		created() {

		},
		components: {
			misBreadcrumb,
			misTitle,
			misTimeButton
		}
	}
</script>

<style lang="less">
	.bead-title {
		padding-left: 20px;
		margin-bottom: 20px;
	}

	.main {
		background: #fff;
		min-height: 500px;
		.form-content {
			border-top: 1px solid #ddd;
			padding: 70px 0 70px 60px;
			.form-box {
				width: 400px;
				.validate-msg-btn {
					cursor: pointer;
					margin-left: 100px;
					margin-top: 20px;
				}
				.show-pwd {
					position: absolute;
					width: 30px;
					height: 30px;
					background: blue;
					right: 4px;
					top: 3px;
					cursor: pointer;
					background: url(/static/image/show-password.png) no-repeat center;
				}
				.hidePwd {
					background: url(/static/image/show-password2.png) no-repeat center;
				}
			}
			.bottom-btn {
				margin-top: 80px;
				padding-left: 100px;
			}
		}
	}

	.mis-dialog {
		padding: 0 7%;
		position: relative;
		.dialog-title {
			font-size: 20px;
			padding-bottom: 30px;
			border-bottom: 1px solid #ddd;
		}
		.dialog-info {
			margin: 30px 0;
			line-height: 1.6;
		}
		.dialog-warning {
			& > li {
				line-height: 1.6;
			}
			margin-bottom: 100px;
		}
	}

	.bg-cat {
		position: absolute;
		left: -20px;
		bottom: -14px;
	}
</style>
