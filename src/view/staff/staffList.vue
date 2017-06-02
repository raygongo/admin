<template>  
	<div>
		<div class="top-container">
			<div class="breadcrumb-container">
				<breadcrumb 
					separator="-" 
					:attr="[{name: '员工管理', to: '/staffList'}, {name: '员工列表'}]"></breadcrumb>
			</div>
			<div class="button-container">
				<el-button @click="routerPush('staffAdd')">＋添加员工</el-button>
			</div>
		</div>
		<div class="staff-table-container">
			<el-table style="width: 100%" :data="tableData.allrow">
				<el-table-column
					type="index"
					label="序号"
					width="80"
					align="center">
				</el-table-column>
				<el-table-column
					prop="id"
					label="员工ID"
					min-width="100"
					align="center">
				</el-table-column>
				<el-table-column
					prop="username"
					label="员工帐号"
					min-width="130"
					align="center">
				</el-table-column>
				<el-table-column
					prop="realname"
					label="姓名"
					min-width="120"
					align="center">
				</el-table-column>
				<el-table-column
					inline-template
					label="性别"
					min-width="80"
					align="center">
					<div>{{ row.sex | sexFilter }}</div>
				</el-table-column>
				<el-table-column
					label="状态"
					min-width="120"
					align="center"
					inline-template>
					<div>
						{{ row.status | staffStatusFilter }}
					</div>
				</el-table-column>
				<el-table-column
					prop="register_date"
					label="添加时间"
					min-width="180"
					align="center">
				</el-table-column>
				<el-table-column
					label="操作"
					min-width="280"
					align="center"
					fixed="right"
					inline-template>
					<div>
						<el-button 
							size="small" 
							v-if="row.status === '8'"
							@click="handle('enable', row.id)">启用</el-button>
						<el-button 
							size="small" 
							v-if="row.status !== '8'" 
							@click="handle('disable', row.id)">禁用</el-button>
						<el-button 
							size="small"
							@click="routerPush('staffDetail', {id: row.id})">详情</el-button>
						<el-button 
							size="small"
							@click="routerPush('staffEdit', {id: row.id})">编辑</el-button>
						<el-button 
							size="small" 
							v-if="row.status !== '6'"
							@click="handle('del', row.id)">删除</el-button>
					</div>
				</el-table-column>
			</el-table>
		</div>
		<div class="page-container">
			<el-pagination
				:current-page.sync="searchParams.pageNum"
				layout="total, prev, pager, next"
				:total="tableData.allnum"
				@current-change="handleCurrentChange">
			</el-pagination>
		</div>
		<el-dialog :visible.sync="dialogConfig.visible">
			<img class="dialogImg" :src="dialogConfig.image">
			<h2 class="dialogTitle">{{ dialogConfig.title }}</h2>
			<p class="dialogContent">{{ dialogConfig.content }}</p>
			<div class="dialogBtn" @click="confirm">确定</div>
		</el-dialog>
	</div>
</template>

<script>
	import breadcrumb from '@/components/breadcrumb'

	export default {
		name: 'staff',

		components: {
			breadcrumb
		},

		data () {
			return {
				tableData: {
					allnum: 0,
					allrow: []
				},

				searchParams: {
					pageSize: 10,
					pageNum: 1
				},

				currentId: '',

				dialogType: '',
				dialogConfig: {
					title: '',
					content: '',
					image: '',
					visible: false
				}
			}
		},

		created() {
			this.getList()
		},

		methods: {
			getList() {
				this.$http.get(this.API.staffList, this.searchParams).then(res => {
					this.tableData = res.data
				})
			},

			handleCurrentChange() {
				this.getList()
			},

			handle(type, id) {
				this.dialogType = type
				this.currentId = id

				switch(type) {
					case 'disable':
					this.dialogConfig = {
						title: '是否确定禁用该用户',
						content: '禁用该用户，会导致该用户帐号不能登录和正常使用，会影响该用户的帐号情况，请谨慎操作，以免造成不必要的损失！',
						image: '/static/image/dialog_bell.png',
						visible: true
					}
					break

					case 'enable':
					this.dialogConfig = {
						title: '是否确定启用该用户',
						content: '启用该用户，使该用户能够正常进行接单等操作！',
						image: '/static/image/dialog_bell.png',
						visible: true
					}
					break

					case 'del':
					this.dialogConfig = {
						title: '是否确定删除该用户',
						content: '删除该用户，会导致该用户帐号不能登录和正常使用，会影响该用户的帐号情况，请谨慎操作，以免造成不必要的损失！',
						image: '/static/image/dialog_box.png',
						visible: true
					}
					break
				}
			},

			confirm() {
				let api,
					params

				switch(this.dialogType) {
					case 'disable':
					api = this.API.staffEdit
					params = {mode: 'disabled', staff_id: this.currentId, staff_status: 1}
					break

					case 'enable':
					api = this.API.staffEdit
					params = {mode: 'disabled', staff_id: this.currentId, staff_status: 0}
					break

					case 'del':
					api = this.API.staffDel
					params = {staff_id: this.currentId}
					break
				}

				this.$http.post(api, params).then(res => {
					this.getList()
					this.dialogConfig.visible = false
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../style/mixin.less';

	.top-container {
		height: 36px;
		padding-left: 10px;

		.breadcrumb-container,
		.button-container {
			float: left;
		}

		.button-container {
			margin-left: 30px;
		}
	}

	.staff-table-container {
		width: 100%;
		margin-top: 20px;
		background-color: #fff;
	}

	.dialogImg {
		display: block;
		width: 160px;
		margin: 0 auto;
	}

	.dialogTitle {
		margin-top: 40px;
		text-align: center;
		font-size: 26px;
		font-weight: normal;
	}

	.dialogContent {
		width: 430px;
		text-align: center;
		margin: 30px auto 0;
		color: #b8b8b8;
	}

	.dialogBtn {
		width: 140px;
		height: 36px;
		line-height: 36px;
		text-align: center;
		background-color: #000;
		color: #fff;
		margin: 30px auto 0;
		cursor: pointer;

		&:hover {
			opacity: .9;
		}
	}
</style>