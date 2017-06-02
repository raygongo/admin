<template>
	<div>
		<div class="bead-title">
			<mis-breadcrumb separator="-" :attr="[{name: '账户管理'}]"></mis-breadcrumb>
		</div>

		<div class="manage-main">
			<mis-title title="账户设置"></mis-title>
			<div class="manage-content">
				<ul class="content-config-list">
					<!--提现密码-->
					<li class="config-item ">
						<div class="icon-box cash-password">
							<span class="icon-name">提现密码</span>
						</div>
						<div class="item-info">
							<div class="all-text">
								<span class="info-text">设置提现密码，能更好的提升账户的资金财产安全，以免被他人盗用，加强账户资金安全管理。</span>
							</div>
						</div>
						<div class="item-button">
							<el-button type="danger" @click="routerPush('cashPassword' )" v-if="!showAccount">立即设置
							</el-button>
							<el-button type="danger" v-else style="width: 90px" @click="routerPush('cashPassword' )">
								修改
							</el-button>
						</div>

					</li>
					<!--身份认证-->
					<li class="config-item">

						<div class="icon-box user">
							<span class="icon-name">身份认证</span>
						</div>

						<div class="item-info ">
							<!--认证-->
							<div class="user-info">
								<div class="account-type">
									<div class="account-type-title">实名认证：&nbsp;
										<span v-if="!showAccount">
											<span class="not-approve">未认证</span>
											<span @click="routerPush('userIdentify')">去认证</span>
										</span>
										<span v-else>周杰伦&nbsp;(5123*********3112)</span>
									</div>
								</div>
								<div class="account-type">
									<div class="account-type-title">企业认证：&nbsp;
										<span v-if="!showAccount">
											<span class="not-approve">未认证</span>
											<span @click="routerPush('companyIdentify')">去认证</span>
										</span>
										<span v-else>
											<span style="margin-right: 40px" >成都青桔科技有限公司</span>
											<span style="cursor: pointer">重新认证</span>
										</span>
									</div>
								</div>
							</div>
						</div>
					</li>
					<!--提现账户-->
					<li class="config-item">
						<div class="icon-box cash">
							<span class="icon-name">提现账户</span>
						</div>

						<div class="item-info">
							<div class="all-text">
								<span class="info-text">设置提现账户，可进行相关账户的提现操作;可设置微信、支付宝和银行卡提现账户。</span>
							</div>
						</div>
						<div class="item-button">
							<el-button type="danger" @click="routerPush('cashAccount' )" >立即设置
							</el-button>
						</div>
					</li>

				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	/**
	 * 账户管理首页
	 */
	import misBreadcrumb from '@/components/breadcrumb'
	import misTitle from '@/components/title'

	export default {
		data() {
			return {
				showAccount: true
			}
		},
		components: {
			misBreadcrumb,
			misTitle
		}
	}
</script>

<style lang="less">
	@accountColor: #0095e2;
	@accountTextColor: #afafb0;
	@succeed: #22b573;
	.bead-title {
		padding-left: 20px;
		margin-bottom: 20px;
	}

	.manage-main {
		background: #fff;
		.manage-content {
			border-top: 1px #ddd solid;
			padding: 50px 20px 50px 20px;
			.content-config-list {
				.config-item {
					margin-bottom: 40px;
					background: #f6fbff;
					overflow: hidden;
					position: relative;
					.icon-box {
						float: left;
						width: 150px;
						height: 150px;
						text-align: center;
						position: relative;
						.icon-name {
							display: inline-block;
							margin-top: 120px;
							color: @accountColor;
						}
					}
					.user {
						background: url(/static/image/account.png) no-repeat center 30%;
					}
					.cash {
						background: url(/static/image/account_cash.png) no-repeat center 30%;
					}
					.cash-password {
						background: url(/static/image/account_password.png) no-repeat center 30%;
					}
					.item-info {
						font-size: 14px;
						color: @accountTextColor;
						position: absolute;
						top: 50%;
						left: 200px;
						transform: translateY(-50%);
						.all-text {
							line-height: 1.8;
							width: 70%;
						}
						.account-type {
							margin-bottom: 10px;
							color: @accountColor;
							.not-approve{
								color: #aaa;
								margin-right: 40px;
							}
							.account-type-title {
								display: inline-block;
							}
							.account-info {
								display: inline-block;
								color: @accountColor;
								.is-default {
									margin-left: 10px;
								}
								.edit-btn {
									margin-left: 40px;
									cursor: pointer;
								}
							}
							.new-account {
								display: inline-block;
								color: @accountTextColor;
								.add-new {
									margin-left: 30px;
									color: @accountColor;
									cursor: pointer;
								}
							}
						}
						.info-text {
							display: inline-block;
							vertical-align: top;
						}
					}
					.item-button {
						display: inline-block;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						right: 5%;
						.succeed {
							color: @succeed;
							display: inline-block;
							line-height: 30px;
							i {
								font-size: 30px;
								vertical-align: middle;
								margin-right: 6px;
							}
						}
					}
				}
			}
		}
	}
</style>
