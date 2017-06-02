<template>
	<div>
		<div class="bead-title">
			<mis-breadcrumb separator="-"
			                :attr="[{name: '账户管理', to: '/accountManage'},{name: '提现账户'}]"></mis-breadcrumb>
		</div>

		<div class="cash-type-config">
			<ul class="cash-type-list">
				<li class="cash-type-item cash-bank">
					<p class="cash-title">个人银行卡 <span class="cash-add" @click="addPersonBankCard">去添加</span></p>
					<p class="cash-title">企业银行卡 <span class="cash-add" @click="addCompanyBankCard">去添加</span></p>
				</li>
				<li class="cash-type-item cash-alipay">
					<p class="cash-title">支付宝账户 <span class="cash-add" @click="routerPush('alipayAccount')">去添加</span>
					</p>
					<p class="cash-title cash-account">未绑定 </p>
				</li>
				<li class="cash-type-item cash-wechat">
					<p class="cash-title">微信账户 </p>
					<p class="cash-title cash-account" @click="dialog.wechatAccount = true">未绑定 </p>
				</li>
			</ul>
		</div>

		<div class="cash-bank-main">
			<ul class="cash-bank-list">
				<li class="cash-bank-item">
					<div class="cash-bank-top">
						<img src="/static/image/Agricultural-Bank.png" alt="" class="cash-bank-icon">
						<span class="cash-bank-name">中国银行</span>
						<span class="cash-bank-owner">企业</span>
					</div>
					<div class="cash-bank-bottom">
						1231*********123
						<span class="cash-bank-del" @click="dialog.delBank=true">删除</span>
					</div>
				</li>
				<li class="cash-bank-item">
					<div class="cash-bank-top">
						<img src="/static/image/Agricultural-Bank.png" alt="" class="cash-bank-icon">
						<span class="cash-bank-name">中国银行</span>
						<span class="cash-bank-owner">企业</span>
					</div>
					<div class="cash-bank-bottom">
						1231*********123
						<span class="cash-bank-del" @click="dialog.delBank=true">删除</span>
					</div>
				</li>
				<li class="cash-bank-item">
					<div class="cash-bank-top">
						<img src="/static/image/Agricultural-Bank.png" alt="" class="cash-bank-icon">
						<span class="cash-bank-name">中国银行</span>
						<span class="cash-bank-owner">企业</span>
					</div>
					<div class="cash-bank-bottom">
						1231*********123
						<span class="cash-bank-del" @click="dialog.delBank=true">删除</span>
					</div>
				</li>
				<li class="cash-bank-item">
					<div class="cash-bank-top">
						<img src="/static/image/Agricultural-Bank.png" alt="" class="cash-bank-icon">
						<span class="cash-bank-name">中国银行</span>
						<span class="cash-bank-owner">企业</span>
					</div>
					<div class="cash-bank-bottom">
						1231*********123
						<span class="cash-bank-del" @click="dialog.delBank=true">删除</span>
					</div>
				</li>
			</ul>
		</div>
		<!--删除银行卡提示信息-->
		<el-dialog
				:visible.sync="dialog.delBank"
				size="small">
			<div class="del-bank-dialog">
				<img class="top-img" src="/static/image/warn-img.png" alt="">
				<div class="del-dialog-title">是否确定删除该银行卡？</div>
				<p class="del-dialog-info">
					删除该银行卡账户之后，将不能再使用此银行卡进行提现操作；不影响已经发出的提现申请，平台审核完成之后依然会提现到申请账户
				</p>
			</div>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="dialog.delBank = false">取 消</el-button>
		    <el-button type="primary" @click="dialog.delBank = false">确 定</el-button>
		  </span>
		</el-dialog>

		<!--未实名认证提示信息-->
		<el-dialog
				:visible.sync="dialog.approve"
				size="small">
			<div class="del-bank-dialog">
				<img v-if="dialog.approveType=='person'" class="top-img" src="/static/image/ICON-Verified.png" alt="">
				<img v-else-if="dialog.approveType=='company'" class="top-img" src="/static/image/ICON-Enterprise%20Certification.png" alt="" >
				<div class="del-dialog-title">请先完成
					<span v-if="dialog.approveType=='person'">个人</span>
					<span v-else-if="dialog.approveType=='company'">企业</span>认证</div>
				<p class="del-dialog-info">
					为保障银行卡账户的真实性，请务必先完成认证操作
				</p>
			</div>
			<span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="dialog.approve = false">确 定</el-button>
		  </span>
		</el-dialog>

		<!--绑定微信账户提示信息-->
		<el-dialog
				:visible.sync="dialog.wechatAccount"
				size="small">
			<div class="bind-wechat">
				<div class="bind-wechat-title">去货车兄弟技工端APP绑定微信账户</div>
				<div class="bind-wechat-info">
					微信提现账户只能在货车兄弟技工端APP进行绑定，扫描下方
					<br>货车兄弟技工端APP二维码下载绑定微信账户吧!</div>
				<div class="bottom-qrcode">
					<img src="/static/image/qrcode.png" alt="">
					<span>货车兄弟（技工端）</span>
				</div>
			</div>
		</el-dialog>

	</div>
</template>
<script type="text/ecmascript-6">
	import misBreadcrumb from '@/components/breadcrumb'
	import misTitle from '@/components/title'

	export default{
		data(){
			return {
				delBankCardWarn:false,
				dialog:{
					delBank:false,
					approve:false,
					approveType:'',
					wechatAccount:false,
				}

			}
		},
		methods:{
			/**
			 * 添加个人银行卡
			 */
			addPersonBankCard(){
				this.dialog.approveType = 'person';
				this.dialog.approve = true
//				this.routerPush('personCard')
			},
			/**
			 * 添加企业银行卡
			 */
			addCompanyBankCard(){
				this.dialog.approveType = 'company';
				this.dialog.approve = true
//				this.routerPush('companyCard')
			}
		},
		components: {
			misBreadcrumb,
			misTitle
		}
	}
</script>
<style lang="less">
	.bead-title {
		padding-left: 20px;
		margin-bottom: 20px;
	}

	.cash-type-config {
		.cash-type-list {
			overflow: hidden;
			.cash-bank {
				background: url(/static/image/ICON-Bank-card.png) no-repeat 10% center;
			}
			.cash-alipay {
				background: url(/static/image/ICON-zhifupay.png) no-repeat 10% center;
			}
			.cash-wechat {
				background: url(/static/image/ICON-wechat.png) no-repeat 10% center;
			}
			.cash-type-item {
				float: left;
				margin-right: 5%;
				background-color: #fff;
				height: 150px;
				width: 30%;
				padding-top: 30px;
				&:last-child {
					margin-right: 0;
				}

				.cash-title {
					margin-top: 15px;
					padding-left: 40%;
					.cash-add {
						margin-right: 20%;
						font-size: 14px;
						float: right;
						color: #398fd8;
						text-decoration: solid;
						cursor: pointer;
					}
				}
				.cash-account {
					color: #bbb;
				}

			}

		}
	}

	.cash-bank-main {
		margin-top: 20px;
		background: #fff;
		padding: 40px 35px;
		min-height: 600px;

		.cash-bank-list {
			overflow: hidden;
			.cash-bank-item {
				margin-right: 5%;
				float: left;
				width: 30%;
				height: 170px;
				background: #36ace3;
				margin-bottom: 30px;
				border-radius: 15px;
				padding: 20px;
				&:nth-child(3n) {
					margin-right: 0;
				}

				.cash-bank-top {
					margin-top: 20px;

					.cash-bank-name {
						margin-left: 20px;
						color: #fff;
					}
					.cash-bank-icon {
						display: inline-block;
						width: 50px;
						height: 50px;
						border-radius: 25px;
						vertical-align: middle;
						border: none;
					}
					.cash-bank-owner {
						margin-top: 10px;
						float: right;
						background: #fff;
						color: #888;
						padding: 5px 10px;
						border-radius: 20px;
					}

				}

				.cash-bank-bottom {
					font-size: 16px;
					margin-top: 30px;
					color: #fff;

					.cash-bank-del {
						float: right;
						margin-right: 15px;
						text-decoration: underline;
						cursor: pointer;
					}
				}
			}
		}
	}

	/* 删除银行卡提示框*/
	.del-bank-dialog{
		text-align: center;
		.top-img{
			display: inline-block;
		}
		.del-dialog-title{
			font-size: 26px;
			margin-top: 20px;
		}
		.del-dialog-info{
			margin-top: 20px;
			padding: 0 60px;
			font-size: 16px;
			line-height: 1.8;
			color: #888;
		}
	}

	.bind-wechat{
		text-align: center;
		padding: 0 50px;
		.bind-wechat-title{
			font-size: 26px;
			border-bottom: 1px solid #aaa;
			padding: 30px 0;
		}
		.bind-wechat-info{
			margin:30px 0;
			line-height: 1.8;
		}
		.bottom-qrcode{
			text-align: center;
			padding-top: 20px;
			&>img{
				display: inline-block;

			}
			&>span{
				margin-top: 10px;
				display: block;
				color: #f39033;
			}
		}
	}
</style>
