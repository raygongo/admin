<template>
	<div>
		<div class="bead-title">
			<mis-breadcrumb separator="-" :attr="[{name: '个人中心'}]"></mis-breadcrumb>
		</div>

		<section class="user-main">
			<!--个人信息-->
			<div class="user-info">
				<mis-title title="个人信息" style="border-bottom: 1px solid #ddd"></mis-title>
				<div class="user-info-content">
					<div class="user-info-row">
						<div class="user-info-col">
							<span class="info-name">{{ user.userType | userTypeName}}名称：</span>
							<span class="info-value">{{ userInfo.name }}</span>
						</div>
						<div class="user-info-col">
							<span class="info-name">{{ user.userType | userTypeName}}ID：</span>
							<span class="info-value">{{ userInfo.id }}</span>
						</div>
					</div>

					<div class="user-info-row" v-if="userType.isRepair">
						<div class="user-info-col">
							<span class="info-name">维修类型：</span>
							<span class="info-value">{{ userInfo.repair_type }}</span>
						</div>
						<div class="user-info-col">
							<span class="info-name">维修资质：</span>
							<span class="info-value">{{ userInfo.repair_qualified | qualifiedFilter }}</span>
						</div>
					</div>

					<div class="user-info-row">
						<div class="user-info-col">
							<span class="info-name">地&emsp;&emsp;址：</span>
							<span class="info-value">{{ userInfo.address }}</span>
						</div>
						<div class="user-info-col">
							<span class="info-name">注册时间：</span>
							<span class="info-value">{{ userInfo.create_date}}</span>
						</div>
					</div>
				</div>
				<div class="user-info-form">
					<el-form :model="userInfoForm" :rules="rules" ref="userInfoForm">
						<el-form-item label="经营范围" prop="business_scope">
							<el-input type="textarea" v-model="userInfoForm.business_scope"
							          placeholder="可重新编辑，字数不超过1000字。"></el-input>
						</el-form-item>
					</el-form>
					<div class="user-info-bottom" style="text-align:right;">
						<el-button :plain="true" type="success" style="width:90px;" @click="submitForm('userInfoForm')">
							保存
						</el-button>
					</div>
				</div>

			</div>
			<!--个人头像-->
			<div class="user-header">
				<div class="user-header-top">
					<div class="user-header-img">

						<el-upload
								:headers="{token:user.token}"
								class="avatar-uploader"
								:action="API.upload"
								:show-file-list="false"
								:on-success="uploadHeaderSuccess"
								:before-upload="beforeUploadHeader">
							<img :src="userInfo.header_img">
							<p class="user-header-edit"><i class="el-icon-edit"></i>编辑</p>
						</el-upload>
					</div>
					<p class="user-header-label">管理员：<span>{{userInfo.manager_name}}</span></p>
					<p class="user-header-label">手机：<span>{{userInfo.phone}}</span></p>
					<el-button type="danger" @click="routerPush('editPassword')">修改密码</el-button>
				</div>
				<div class="user-header-bottom">
					<div class="user-code" id="codeDom" ref="codeDom">
					</div>
					<div class="user-code-number">推荐码：&nbsp;123123</div>
				</div>

			</div>

		</section>
	</div>
</template>

<script>
	/**
	 * 个人中心首页
	 */
	import misBreadcrumb from '@/components/breadcrumb'
	import misTitle from '@/components/title'
	import { getStorage, jsonParse } from '@/utils/utils'
	import { defUserType } from '@/utils/type'
	import VueQr from 'vue-qr'
	import { mapState, mapActions, mapGetters } from 'vuex'

	export default {
		data() {
			return {
				isQrcode    : false,          // 是否已经生成二维码
				rules       : {
					business_scope: [{
						max    : 1000,
						message: '最多输入1000个字符',
						trigger: 'blur'
					}, {
						min    : 10,
						message: '请输入经营范围',
						trigger: 'blur'
					}]
				},
				userInfoForm: {
					business_scope: ''
				},
			}
		},
		methods   : {
			...mapActions(['editHeaderImg', 'editScope']),
			updateUserInfo(){
				this.$http.get(this.API.editUserInfo, {
					buss_info : this.userInfo.business_scope || '',
					header_img: this.userInfo.header_img || '',
					mode      : 'edit'
				}).then(data => {
					this.$message({
						              message: data.data.msg,
						              type   : 'success'
					              });
					this.getUserInfoData()

				})
			},
			// 修改经营范围
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {

						this.$http.get(this.API.editUserInfo, {
							buss_info : this.userInfoForm.business_scope,
							header_img: this.userInfo.header_img || '',
							mode      : 'edit'
						}).then(data => {
							this.$message({
								              message: data.data.msg,
								              type   : 'success'
							              });
							this.editScope(this.userInfoForm.business_scope)

						})

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			/**
			 * 生成二维码
			 */
			createQRCode(){
				if (this.isQrcode)
					return
				new QRCode(document.getElementById("codeDom"), {
					text        : this.userInfo.QRCode,
					width       : 150,
					height      : 150,
					colorDark   : "#000000",
					colorLight  : "#ffffff",
					correctLevel: QRCode.CorrectLevel.H
				});
				this.isQrcode = true;
			},

			/**
			 * 上传头像之前验证  图片格式和大小
			 * @param file
			 * @returns {boolean}
			 */
			beforeUploadHeader(file) {
				const isJPG  = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isLt2M;
			},
			/**
			 * 图片上传成功后
			 */
			uploadHeaderSuccess(response, file, fileList){
				if (response.status == 1) {
					this.editHeaderImg(file.url)
				}
			}
		},
		created(){
			this.userInfoForm.business_scope = this.userInfo.business_scope;
		},
		mounted(){
			//			console.log(document.querySelector('#codeDom img').getAttribute('src')
			if (this.userInfo.QRCode) {
				this.$nextTick(() => {
					this.createQRCode()
				})

			}
		},
		computed  : {
			...mapState([
				            'user',
				            'userInfo'
			            ]),
			...mapGetters([
				              'userType',
			              ]),
		},
		components: {
			misBreadcrumb,
			misTitle,
			VueQr
		},
	}
</script>

<style lang="less" scoped>
	.user-main {
		overflow: hidden;
		height: 700px;
		margin-top: 24px;
		.user-info {
			float: left;
			width: 75%;
			background: #fff;
			height: 100%;
			.user-info-content {
				padding: 0 20px;
				margin-top: 60px;
				font-size: 14px;
				min-height: 108px;
				.user-info-row {
					margin-bottom: 20px;
					line-height: 1.6;
					overflow: hidden;
					.user-info-col {
						float: left;
						width: 50%;
						text-align: left;
						.info-name {
							vertical-align: top;
						}
						.info-value {
							margin-left: 20px;
							width: 65%;
							display: inline-block;
							overflow-wrap: break-word;
						}
					}
				}
			}
			.user-info-form {
				padding: 0 20px;
			}
		}
		.user-header {
			float: right;
			width: 24%;
			background: #fff;
			height: 100%;
			padding: 0 20px;
			font-size: 14px;
			.user-header-top {
				text-align: center;
				padding-bottom: 20px;
				border-bottom: 1px dashed #c6c7c9;
				.user-header-img {
					margin-top: 50px;
					margin-bottom: 20px;
					width: 150px;
					height: 150px;
					display: inline-block;
					border-radius: 75px;
					border: none;
					overflow: hidden;
					position: relative;
					img {
						width: 150px;
						height: 150px;
					}
					.user-header-edit {
						position: absolute;
						cursor: pointer;
						width: 100%;
						line-height: 2;
						bottom: 0;
						left: 0;
						color: #fff;
						background: rgba(0, 0, 0, .5);
						.el-icon-edit {
							font-size: 5px;
							margin-right: 6px;
						}
					}
				}
				.user-header-label {
					margin-bottom: 18px;
				}
			}
			.user-header-bottom {
				text-align: center;
				.user-code {
					margin-top: 60px;
					display: inline-block;
					/*width: 200px;*/
					/*height: 200px;*/
					margin-bottom: 25px;
				}
			}
		}
	}
</style>

