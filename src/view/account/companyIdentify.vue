<template>
	<div>
		<div class="bead-title">
			<mis-breadcrumb separator="-"
			                :attr="[{name: '账户管理', to: '/accountManage'},{name: titleName}]"></mis-breadcrumb>
		</div>

		<div class="identify-main">
			<mis-title :title="titleName"></mis-title>
			<div class="identify-content">
				<div class="form-box">
					<el-form :label-position="'right'" label-width="100px" :model="userForm" :rules="rules"
					         ref="userForm">
						<el-form-item label="企业名称" prop="username">
							<el-input v-model="userForm.username" placeholder="必须与营业执照名称一致"></el-input>
						</el-form-item>
						<el-form-item label="营业执照" prop="idCard">
							<!--<el-input v-model="userForm.idCard" placeholder="请输入身份证号码"></el-input>-->
							<el-upload
									class="uploader-box"
									action="https://jsonplaceholder.typicode.com/posts/"
									:show-file-list="false"
									:on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload">
								<img v-if="imgURL" :src="imgURL" class="uploader-img">
								<div class="uploader-bg" v-if="!imgURL">
									<span class="uploader-title">点击上传营业执照</span>
								</div>
							</el-upload>
						</el-form-item>
					</el-form>
				</div>
				<span style="margin-left: 100px;color: #bfcbd9">* 照片大小不超过1MB</span>


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

	export default{
		data(){
			return {
				titleName: '企业认证',
				imgURL: '',
				userForm: {
					idCard: '',
					username: '',
				},
				rules: {
					username: [
						{required: true, message: '请输入企业名称', trigger: 'blur'},
					],
					idCard: [
						{required: true, message: '请输入身份证号码', trigger: 'blur'},
						{min: 18, max: 19, message: '请输入正确的身份证号码', trigger: 'blur'}
					]
				}
			}
		},
		created(){

		},
		methods: {
			submitForm(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('提交!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			/**
			 * 上传图片 图片的验证
			 * @param file
			 * @returns {boolean}
			 */
			beforeAvatarUpload(file) {
//				const isJPG  = file.type === 'image/jpeg';
//				const isLt2M = file.size / 1024 / 1024 < 2;
//
//				if (!isJPG) {
//					this.$message.error('上传头像图片只能是 JPG 格式!');
//				}
//				if (!isLt2M) {
//					this.$message.error('上传头像图片大小不能超过 2MB!');
//				}
//				return isJPG && isLt2M;
			},
			/**
			 * 上传成功之后
			 * @param res
			 * @param file
			 */
			handleAvatarSuccess(res, file) {
				this.imgURL = URL.createObjectURL(file.raw);
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

	.identify-main {
		background: #fff;
		min-height: 500px;

		.identify-content {
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

	.uploader-box{
		height: 200px;
		width: 100%;


		.uploader-bg{
			position: absolute;
			top:0;
			left:0;
			width: 100%;
			height: 100%;
			background: url(/static/image/camera1.png) center 35% no-repeat;
			background-color: #f8f8f8;
			.uploader-title{
				margin-top: 30%;
				display: inline-block;
				color: #898989;
				font-size: 16px;
			}

		}
		.uploader-img{
			max-width: 100%;
			max-height: 100%;

		}
	}
</style>
