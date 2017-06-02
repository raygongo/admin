<template>
	<div>
		<div class="bead-title">
			<mis-breadcrumb separator="-"
			                :attr="[{name: '账户管理', to: '/accountManage'},{name: '提现账户', to: '/cashAccount'},{name: '提现账户'}]"></mis-breadcrumb>
		</div>

		<div class="main">
			<mis-title :title="'提现账户-支付宝账户'"></mis-title>
			<div class="form-content">

				<div class="form-box">
					<el-form
							:label-position="'right'"
							label-width="100px"
							:model="userForm"
							:rules="rules"
							ref="userForm">
						<el-form-item label="账户所有人" prop="username">
							<el-input v-model="userForm.username" placeholder="请输入真实姓名"></el-input>
						</el-form-item>
						<el-form-item label="微信账户" prop="alipayID">
							<el-input v-model="userForm.alipayID" placeholder="请输入支付宝账户号码"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<span style="margin-left: 100px;color: #bfcbd9">温馨提示：支付宝账户在完成首次提现后不可修改，如需修改请联系区域经理</span>

				<div class="bottom-btn">
					<el-button type="danger" style="width: 100px" @click="submitForm('userForm')">确认</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">

	import misBreadcrumb from '@/components/breadcrumb'
	import misTitle from '@/components/title'

	export default {
		data() {
			return {
				userForm: {
					alipayID: '',
					username: '',
				},
				rules: {
					username: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					},],
					alipayID: [{
						required: true,
						message: '请输入支付宝账户号码',
						trigger: 'blur'
					},]
				}
			}
		},
		created() {

		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('提交!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		},
		components: {
			misBreadcrumb,
			misTitle
		}
	}
</script>

<style lang="less" scoped>
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
			}
			.bottom-btn {
				margin-top: 80px;
				padding-left: 100px;
			}
		}
	}
</style>
