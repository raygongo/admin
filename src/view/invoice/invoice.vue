<template>
	<div>
		<div class="top-container">
			<div class="breadcrumb-container">
				<mis-breadcrumb separator="-" :attr="[{name: '发票管理', to: '/scoreList'}, {name: '积分信息'}]"></mis-breadcrumb>
			</div>
		</div>
		<div class="table-container">
			<mis-tab :data="tabData" @click="tabClick"></mis-tab>
			<div class="search-container" v-show="currentTab === 'list'">
				<el-form ref="searchForm" :model="searchParams" label-width="80px">
					<el-form-item label="日期" class="searchBox">
						<el-date-picker
							v-model="searchParams.daterange"
							type="daterange"
							placeholder="选择日期范围">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="发票状态" class="searchBox">
						<el-select v-model="searchParams.invoiceStatus" placeholder="请选择发票状态">
							<el-option
								v-for="item in invoiceStatus"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-button>搜索</el-button>
				</el-form>
			</div>
			<el-table style="width: 100%" :data="invoiceData" v-show="currentTab === 'list'">
				<el-table-column
        			type="index"
        			label="序号"
        			width="80"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="invoiceType"
        			label="发票类型"
        			min-width="180"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="invoiceStatus"
        			label="发票状态"
        			min-width="130"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="orderNo"
        			label="订单号"
        			min-width="120"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="invoiceAmount"
        			label="发票金额"
        			min-width="120"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="company"
        			label="公司名称"
        			min-width="180"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="needMail"
        			label="是否邮寄"
        			min-width="120"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="applyTime"
        			label="申请时间"
        			min-width="120"
        			align="center">
      			</el-table-column>
      			<el-table-column
					label="操作"
					min-width="100"
					align="center"
					fixed="right"
					inline-template>
					<div>
						<el-button 
							size="small" 
							v-if="row.invoiceStatus === '待处理'"
							@click="routerPush('invoiceEdit', {id: row.id})">处理</el-button>
						<el-button 
							size="small" v-if="row.invoiceStatus === '已处理'" 
							@click="routerPush('invoiceDetail', {id: row.id})">详情</el-button>
					</div>
				</el-table-column>
			</el-table>
			<div class="switch-container" v-show="currentTab === 'switch'">
				<el-form>
					<el-form-item label="是否可开发票">
						<el-switch
							v-model="canInvoice"
							on-color="#13ce66"
							on-text=""
							off-text="">
						</el-switch>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import misBreadcrumb from '@/components/breadcrumb'
	import misTab from '@/components/tab'

	export default {
		components: {
			misBreadcrumb,
			misTab
		},

		data() {
			return {
				tabData: [
				{key: 'list', title: '列表'},
				{key: 'switch', title: '发票开关'}
				],

				currentTab: 'list',

				invoiceStatus: [
				{label: '待处理', value: '1'},
				{label: '已处理', value: '2'}
				],

				searchParams: {
					invoiceStatus: '',
					daterange: ''
				},

				invoiceData: [
				{id: '1', invoiceType: '普通发票', invoiceStatus: '待处理', orderNo: '32142142142424', invoiceAmount: '1990.00', company: '谷歌', needMail: '否', applyTime: '2017-04-12 19:00:00'},
				{id: '2', invoiceType: '普通发票', invoiceStatus: '已处理', orderNo: '32142142142424', invoiceAmount: '1990.00', company: '谷歌', needMail: '否', applyTime: '2017-04-12 19:00:00'}
				],

				canInvoice: false
			}
		},

		methods: {
			tabClick(key) {
				this.currentTab = key
			}
		}
	}
</script>

<style lang="less" scoped>
	.top-container {
		height: 36px;
		padding-left: 10px;

		.breadcrumb-container {
			float: left;
		}
	}

	.total-score-container {
		background-color: #fff;
		padding: 40px 60px;
	}

	.switch-container {
		padding: 30px;
		background-color: #fff;
	}
</style>