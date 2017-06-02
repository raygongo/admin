<template>
	<div>
		<div class="top-container">
			<div class="breadcrumb-container">
				<mis-breadcrumb separator="-" :attr="[{name: '员工管理', to: '/staffList'}, {name: '编辑员工'}]"></mis-breadcrumb>
			</div>
		</div>
		<div class="staff-info-container">
			<div class="staff-base-info-container">
				<mis-title title="员工基本信息"></mis-title>
				<div class="staff-input-container">
					<el-form ref="form" :model="staffInfo" :rules="staffInfoRules" label-width="80px">
						<el-form-item label="姓名" prop="realname">
							<el-input 
								v-model="staffInfo.realname"
								:maxlength="20"
								style="width: 60%" 
								placeholder="请输入员工姓名"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="phone">
							<el-input 
								v-model="staffInfo.phone"
								:maxlength="11"
								style="width: 60%" 
								placeholder="登录帐号与手机号一致"></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="sex">
							<el-radio-group v-model="staffInfo.sex">
								<el-radio label="1">男</el-radio>
								<el-radio label="0">女</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div class="staff-avatar-container">
				<mis-title title="上传头像"></mis-title>
				<div class="staff-avatar-upload-container">
					<el-upload
						class="avatar-uploader"
						:headers="{token: user.token}"
						:action="API.upload"
						:show-file-list="false"
						:on-success="uploadSuccess"
						:on-error="uploadError"
						>
						<img v-if="staffInfo.headerImg" :src="staffInfo.headerImg" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
			</div>
		</div>
		<div class="staff-skill-container">
			<mis-title title="员工技能信息"></mis-title>
			<div class="skill-wrap">
				<div class="tips-container">
					<span class="tips">请选择厂商品牌（可多选）</span>
				</div>
				<div class="skill-container brand-container">
					<div class="skill-checked-box">
						<el-button @click="add('请选择厂商品牌（可多选）', 'factory')">＋添加</el-button>
					</div>
					<div class="skill-checked-box" v-for="item in staffInfo.factoryBrands">{{ item }}</div>
				</div>
			</div>
			<div class="skill-wrap">
				<div class="tips-container">
					<span class="tips">请选择发动机品牌（可多选）</span>
				</div>
				<div class="skill-container brand-container">
					<div class="skill-checked-box">
						<el-button @click="add('请选择发动机品牌（可多选）', 'engine')">＋添加</el-button>
					</div>
					<div class="skill-checked-box" v-for="item in staffInfo.engineBrands">{{ item }}</div>
				</div>
			</div>
			<div class="skill-wrap">
				<div class="tips-container">
					<span class="tips">请选择变速箱品牌（可多选）</span>
				</div>
				<div class="skill-container brand-container">
					<div class="skill-checked-box">
						<el-button @click="add('请选择变速箱品牌（可多选）', 'trans')">＋添加</el-button>
					</div>
					<div class="skill-checked-box" v-for="item in staffInfo.transBrands">{{ item }}</div>
				</div>
			</div>
			<div class="skill-wrap">
				<div class="tips-container">
					<span class="tips">车桥</span>
				</div>
				<div class="skill-container">
					<el-checkbox v-model="staffInfo.blockBridge">前桥</el-checkbox>
					<el-checkbox v-model="staffInfo.blockBrake">后桥</el-checkbox>
				</div>
			</div>
			<div class="skill-wrap">
				<div class="tips-container">
					<span class="tips">保养</span>
				</div>
				<div class="skill-container">
					<el-checkbox-group v-model="staffInfo.blockMaintain">
						<el-checkbox label="底盘保养">底盘保养</el-checkbox>
						<el-checkbox label="发动机保养">发动机保养</el-checkbox>
					</el-checkbox-group>
				</div>
			</div>
			<div class="skill-wrap">
				<div class="tips-container">
					<span class="tips">其它</span>
				</div>
				<div class="skill-container">
					<el-checkbox v-model="staffInfo.blockBody">车身</el-checkbox>
					<el-checkbox v-model="staffInfo.blockElec">电气</el-checkbox>
				</div>
			</div>
		</div>
		<div class="confirm-btn">
			<el-button 
				type="danger"
				@click="handleSubmit">确定</el-button>
		</div>
		<el-dialog :title="dialogConfig.title" :visible.sync="dialogConfig.visible">
			<el-checkbox-group v-model="staffInfo.factoryBrands" v-show="currentTab === 'factory'">
				<el-tabs v-model="factoryTab">
					<el-tab-pane label="ABCDE" name="ABCDE">
						<el-checkbox :label="item.factoryName" v-for="item in factoryData.ABCDE" :key="item.factoryName" class="tab-checkbox">{{item.factoryName}}</el-checkbox>
					</el-tab-pane>
					<el-tab-pane label="FGHJK" name="FGHJK">
						<el-checkbox :label="item.factoryName" v-for="item in factoryData.FGHJK" :key="item.factoryName" class="tab-checkbox">{{item.factoryName}}</el-checkbox>
					</el-tab-pane>
					<el-tab-pane label="LMNPQ" name="LMNPQ">
						<el-checkbox :label="item.factoryName" v-for="item in factoryData.LMNPQ" :key="item.factoryName" class="tab-checkbox">{{item.factoryName}}</el-checkbox>
					</el-tab-pane>
					<el-tab-pane label="RSTWX" name="RSTWX">
						<el-checkbox :label="item.factoryName" v-for="item in factoryData.RSTWX" :key="item.factoryName" class="tab-checkbox">{{item.factoryName}}</el-checkbox>
					</el-tab-pane>
					<el-tab-pane label="YZ" name="YZ">
						<el-checkbox :label="item.factoryName" v-for="item in factoryData.YZ" :key="item.factoryName" class="tab-checkbox">{{item.factoryName}}</el-checkbox>
					</el-tab-pane>
				</el-tabs>
			</el-checkbox-group>
			<el-checkbox-group v-model="staffInfo.engineBrands" v-show="currentTab === 'engine'">
				<el-tabs v-model="engineTab">
					<el-tab-pane label="ABCDE" name="ABCDE">
						<el-checkbox :label="item.engineName" v-for="item in engineData.ABCDE" :key="item.engineName" class="tab-checkbox">{{item.engineName}}</el-checkbox>
					</el-tab-pane>
					<el-tab-pane label="FGHJK" name="FGHJK">
						<el-checkbox :label="item.engineName" v-for="item in engineData.FGHJK" :key="item.engineName" class="tab-checkbox">{{item.engineName}}</el-checkbox>
					</el-tab-pane>
					<el-tab-pane label="LMNPQ" name="LMNPQ">
						<el-checkbox :label="item.engineName" v-for="item in engineData.LMNPQ" :key="item.engineName" class="tab-checkbox">{{item.engineName}}</el-checkbox>
					</el-tab-pane>
					<el-tab-pane label="RSTWX" name="RSTWX">
						<el-checkbox :label="item.engineName" v-for="item in engineData.RSTWX" :key="item.engineName" class="tab-checkbox">{{item.engineName}}</el-checkbox>
					</el-tab-pane>
					<el-tab-pane label="YZ" name="YZ">
						<el-checkbox :label="item.engineName" v-for="item in engineData.YZ" :key="item.engineName" class="tab-checkbox">{{item.engineName}}</el-checkbox>
					</el-tab-pane>
				</el-tabs>
			</el-checkbox-group>
			<el-checkbox-group v-model="staffInfo.transBrands" v-show="currentTab === 'trans'">
				<el-tabs v-model="transTab">
					<el-tab-pane label="ABCDE" name="ABCDE">
						<el-checkbox :label="item.transName" v-for="item in transData.ABCDE" :key="item.transName" class="tab-checkbox">{{item.transName}}</el-checkbox>
					</el-tab-pane>
					<el-tab-pane label="FGHJK" name="FGHJK">
						<el-checkbox :label="item.transName" v-for="item in transData.FGHJK" :key="item.transName" class="tab-checkbox">{{item.transName}}</el-checkbox>
					</el-tab-pane>
					<el-tab-pane label="LMNPQ" name="LMNPQ">
						<el-checkbox :label="item.transName" v-for="item in transData.LMNPQ" :key="item.transName" class="tab-checkbox">{{item.transName}}</el-checkbox>
					</el-tab-pane>
					<el-tab-pane label="RSTWX" name="RSTWX">
						<el-checkbox :label="item.transName" v-for="item in transData.RSTWX" :key="item.transName" class="tab-checkbox">{{item.transName}}</el-checkbox>
					</el-tab-pane>
					<el-tab-pane label="YZ" name="YZ">
						<el-checkbox :label="item.transName" v-for="item in transData.YZ" :key="item.transName" class="tab-checkbox">{{item.transName}}</el-checkbox>
					</el-tab-pane>
				</el-tabs>
			</el-checkbox-group>
			<div class="confirm-btn">
				<el-button 
					@click="dialogConfig.visible = false">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import misBreadcrumb from '@/components/breadcrumb'
	import misTitle from '@/components/title'
	import { getInitial } from '@/utils/utils'
	import { mapState } from 'vuex'

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
				},

				staffInfoRules: {
					realname: [
					{required: true, message: '请输入员工姓名', trigger: 'blur'}
					],
					phone: [
					{min: 11, max: 11, required: true, message: '请输入正确的11位手机号', trigger: 'blur'}
					],
					sex: [
					{required: true, message: '请选择员工性别', trigger: 'change'}
					]
				},

				dialogConfig: {
					title: '',
					visible: false,
				},

				currentTab: '',

				factoryTab: 'ABCDE',
				engineTab: 'ABCDE',
				transTab: 'ABCDE',

				factoryData: {
					ABCDE: [],
					FGHJK: [],
					LMNPQ: [],
					RSTWX: [],
					YZ: []
				},

				engineData: {
					ABCDE: [],
					FGHJK: [],
					LMNPQ: [],
					RSTWX: [],
					YZ: []
				},

				transData: {
					ABCDE: [],
					FGHJK: [],
					LMNPQ: [],
					RSTWX: [],
					YZ: []
				}
			}
		},

		computed: {
			...mapState(['user'])
		},

		created() {
			this.getDetail(this.$route.params.id)
			this.getFactoryBrand()
			this.getEngineBrand()
			this.getTransBrand()
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
					staffInfo.factoryBrands = data.block_brand.split(',')
					staffInfo.engineBrands = data.block_engine.split(',')
					staffInfo.transBrands = data.block_trans.split(',')
					staffInfo.blockMaintain = data.block_maintain.split(',')
					staffInfo.blockBridge = Boolean(data.block_bridge)
					staffInfo.blockBrake = Boolean(data.block_brake)
					staffInfo.blockElec = Boolean(data.block_elec)
					staffInfo.blockBody = Boolean(data.block_body)
				})
			},

			getFactoryBrand() {
				this.$http.get(this.API.getFactoryBrand).then(res => {
					this.brandFilter('factory', res.data)
				})
			},

			getEngineBrand() {
				this.$http.get(this.API.getEngineBrand).then(res => {
					this.brandFilter('engine', res.data)
				})
			},

			getTransBrand() {
				this.$http.get(this.API.getTransBrand).then(res => {
					this.brandFilter('trans', res.data)
				})
			},

			brandFilter(key, data) {
				data.forEach(item => {
					let oldName = key+'_name',
						newName = key+'Name',
						filterData = key+'Data'

					let initial = getInitial(item[oldName])
					switch(true) {
						case 'ABCDE'.indexOf(initial) > -1:
						this[filterData].ABCDE.push({[newName]: item[oldName]})
						break

						case 'FGHJK'.indexOf(initial) > -1:
						this[filterData].FGHJK.push({[newName]: item[oldName]})
						break

						case 'LMNPQ'.indexOf(initial) > -1:
						this[filterData].LMNPQ.push({[newName]: item[oldName]})
						break

						case 'RSTWX'.indexOf(initial) > -1:
						this[filterData].RSTWX.push({[newName]: item[oldName]})
						break

						case 'YZ'.indexOf(initial) > -1:
						this[filterData].YZ.push({[newName]: item[oldName]})
						break
					}
				})
			},

			uploadSuccess(res, file) {
				this.staffInfo.headerImg = res.data[0].url
			},

			uploadError(err, file, fileList) {
				this.$message.warning({message: '上传失败'})
			},

			add(title, key) {
				this.currentTab = key
				this.dialogConfig = {
					title: title,
					visible: true
				}
			},

			handleSubmit() {
				this.$refs.form.validate(valid => {
					if (valid) {
						let staffInfo = this.staffInfo

						let params = {
							block_body: staffInfo.blockBody ? '1' : '',
							block_brake: staffInfo.blockBrake ? '1' : '',
							block_bridge: staffInfo.blockBridge ? '1' : '',
							block_elec: staffInfo.blockElec ? '1' : '',
							block_maintain: staffInfo.blockMaintain.join(','),
							engine_brands: staffInfo.engineBrands.join(','),
							factory_brands: staffInfo.factoryBrands.join(','),
							trans_brands: staffInfo.transBrands.join(','),
							header_img: staffInfo.headerImg,
							phone: staffInfo.phone,
							realname: staffInfo.realname,
							sex: staffInfo.sex,
							username: staffInfo.phone,
							mode: 'edit',
							staff_id: this.$route.params.id
						}

						this.$http.post(this.API.staffEdit, params).then(res => {
							this.$message.success({message: '编辑成功!'})
							this.$router.push({name: 'staffList'})
						})
					} else {
						return false
					}
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

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #20a0ff;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
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

	.tab-checkbox {
		margin: 0;
		width: 160px;
		margin-bottom: 10px;
	}
</style>