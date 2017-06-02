<template>
	<div>
		<div class="top-container">
			<div class="breadcrumb-container">
				<mis-breadcrumb 
					separator="-" 
					:attr="[{name: '员工管理', to: '/staffList'}, {name: '员工详情'}]"></mis-breadcrumb>
			</div>
		</div>
		<div class="staff-info-container">
			<div class="staff-base-info-container">
				<mis-title title="员工基本信息"></mis-title>
				<div class="staff-input-container">
					<el-form ref="form" :model="staffInfo" label-width="80px">
						<el-form-item label="姓名">
							<div>{{ staffInfo.realname }}</div>
						</el-form-item>
						<el-form-item label="手机号">
							<div>{{ staffInfo.phone }}</div>
						</el-form-item>
						<el-form-item label="性别">
							<div>{{ staffInfo.sex | sexFilter }}</div>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div class="staff-avatar-container">
				<mis-title title="头像"></mis-title>
				<div class="staff-avatar-upload-container">
					<div class="avatar-uploader">
						<img :src="staffInfo.headerImg" class="avatar">
					</div>
				</div>
			</div>
		</div>
		<div class="staff-skill-container">
			<mis-title title="员工技能信息"></mis-title>
			<div class="skill-wrap">
				<div class="tips-container">
					<span class="tips">厂商品牌</span>
				</div>
				<div class="skill-container brand-container">
					<div class="skill-checked-box" v-if="!staffInfo.factoryBrands.length">无</div>
					<div class="skill-checked-box" v-for="item in staffInfo.factoryBrands">{{ item }}</div>
				</div>
			</div>
			<div class="skill-wrap">
				<div class="tips-container">
					<span class="tips">发动机品牌</span>
				</div>
				<div class="skill-container brand-container">
					<div class="skill-checked-box" v-if="!staffInfo.engineBrands.length">无</div>
					<div class="skill-checked-box" v-for="item in staffInfo.engineBrands">{{ item }}</div>
				</div>
			</div>
			<div class="skill-wrap">
				<div class="tips-container">
					<span class="tips">变速箱品牌</span>
				</div>
				<div class="skill-container brand-container">
					<div class="skill-checked-box" v-if="!staffInfo.transBrands.length">无</div>
					<div class="skill-checked-box" v-for="item in staffInfo.transBrands">{{ item }}</div>
				</div>
			</div>
			<div class="skill-wrap">
				<div class="tips-container">
					<span class="tips">车桥</span>
				</div>
				<div class="skill-container">
					<div class="skill-checked-box" v-if="!staffInfo.blockBridge && !staffInfo.blockBrake">无</div>
					<div class="skill-checked-box" v-if="staffInfo.blockBridge">前桥</div>
					<div class="skill-checked-box" v-if="staffInfo.blockBrake">后桥</div>
				</div>
			</div>
			<div class="skill-wrap">
				<div class="tips-container">
					<span class="tips">保养</span>
				</div>
				<div class="skill-container">
					<div class="skill-checked-box" v-if="!staffInfo.blockMaintain.length">无</div>
					<div class="skill-checked-box" v-for="item in staffInfo.blockMaintain">{{ item }}</div>
				</div>
			</div>
			<div class="skill-wrap">
				<div class="tips-container">
					<span class="tips">其它</span>
				</div>
				<div class="skill-container">
					<div class="skill-checked-box" v-if="!staffInfo.blockBody && !staffInfo.blockElec">无</div>
					<div class="skill-checked-box" v-if="staffInfo.blockBody">车身</div>
					<div class="skill-checked-box" v-if="staffInfo.blockElec">电气</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import misBreadcrumb from '@/components/breadcrumb'
	import misTitle from '@/components/title'

	export default {
		data() {
			return {
				staffInfo: {
					realname: '',
					phone: '',
					sex: '1',
					headerImg: '',
					factoryBrands: [],
					engineBrands: [],
					transBrands: [],
					blockMaintain: [],
					blockBridge: false,
					blockBrake: false,
					blockElec: false,
					blockBody: false
				}
			}
		},

		created() {
			this.getDetail(this.$route.params.id)
		},

		methods: {
			getDetail(id) {
				this.$http.get(this.API.staffDetail, {staff_id: id}).then(res => {
					let data = res.data,
						staffInfo = this.staffInfo

					staffInfo.realname = data.realname
					staffInfo.phone = data.phone
					staffInfo.sex = data.sex
					staffInfo.headerImg = data.header_img
					staffInfo.factoryBrands = data.block_brand ? data.block_brand.split(',') : []
					staffInfo.engineBrands = data.block_engine ? data.block_engine.split(',') : []
					staffInfo.transBrands = data.block_trans ? data.block_trans.split(',') : []
					staffInfo.blockMaintain = data.block_maintain ? data.block_maintain.split(',') : []
					staffInfo.blockBridge = Boolean(data.block_bridge)
					staffInfo.blockBrake = Boolean(data.block_brake)
					staffInfo.blockElec = Boolean(data.block_elec)
					staffInfo.blockBody = Boolean(data.block_body)
				})
			}
		},

		components: {
			misBreadcrumb,
			misTitle
		}
	}
</script>

<style lang="less" scoped>
	@import '../../style/mixin.less';

	.top-container {
		height: 36px;
		padding-left: 10px;

		.breadcrumb-container {
			float: left;
		}
	}

	.staff-info-container {
		.clearfix;
	}

	.staff-base-info-container {
		width: 69%;
		float: left;
	}

	.staff-avatar-container {
		width: 30%;
		float: right;
	}

	.staff-input-container,
	.staff-avatar-upload-container {
		margin-top: 2px;
		height: 300px;
		background-color: #fff;
		padding-top: 30px;
	}

	.staff-avatar-upload-container {
		text-align: center;
	}

	.avatar-uploader {
		display: inline-block;
		border-radius: 50%;
		border: 1px solid #bebebe;
		overflow: hidden;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.staff-skill-container {
		margin-top: 20px;

		.tips-container {
			padding: 20px;
			background-color: #f7f8fa;
			margin: 2px 0;
			font-size: 14px;
		}

		.skill-container {
			padding: 20px;
			background-color: #fff;
		}

		.brand-container {
			font-size: 0;
		}

		.skill-checked-box {
			display: inline-block;
			width: 20%;
			font-size: 14px;
			&:nth-child(n+6) {
				margin-top: 20px;
			}
		}
	}
</style>