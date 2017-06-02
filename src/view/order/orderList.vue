<template>
	<div>
		<div class="top-container">
			<div class="breadcrumb-container">
				<mis-breadcrumb separator="-" :attr="[{name: '订单管理', to: '/orderList'}, {name: '订单列表'}]"></mis-breadcrumb>
			</div>
		</div>
		<div class="table-container">
			<div class="search-container">
				<el-form ref="searchForm" :model="searchParams" label-width="80px">
					<el-form-item label="日期" class="searchBox">
						<el-date-picker
							v-model="searchParams.daterange"
							type="daterange"
							placeholder="选择日期范围">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="审核状态" class="searchBox">
						<el-select v-model="searchParams.reviewStatus" placeholder="请选择">
							<el-option
								v-for="item in reviewStatus"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-button>搜索</el-button>
					<el-button type="danger">导出</el-button>
				</el-form>
			</div>
			<el-table style="width: 100%" :data="tableData.data">
				<el-table-column
					type="index"
					label="序号"
					width="80"
					align="center">
				</el-table-column>
				<el-table-column
					prop="orderId"
					label="订单号"
					min-width="180"
					align="center">
				</el-table-column>
				<el-table-column
					prop="driverName"
					label="司机姓名"
					min-width="130"
					align="center">
				</el-table-column>
				<el-table-column
					prop="driverMoblie"
					label="司机手机号"
					min-width="180"
					align="center">
				</el-table-column>
				<el-table-column
					prop="driverPlate"
					label="司机车牌号"
					min-width="120"
					align="center">
				</el-table-column>
				<el-table-column
					prop="orderProject"
					label="订单项目"
					min-width="180"
					align="center">
				</el-table-column>
				<el-table-column
					prop="orderAmount"
					label="订单金额"
					min-width="120"
					align="center">
				</el-table-column>
				<el-table-column
					prop="mechanicName"
					label="技工姓名"
					min-width="120"
					align="center">
				</el-table-column>
				<el-table-column
					prop="mechanicMobile"
					label="技工手机号"
					min-width="180"
					align="center">
				</el-table-column>
				<el-table-column
					prop="orderStatus"
					label="订单状态"
					min-width="120"
					align="center">
				</el-table-column>
				<el-table-column
					prop="reviewStatus"
					label="审核状态"
					min-width="120"
					align="center">
				</el-table-column>
				<el-table-column
					prop="reviewRemark"
					label="审核备注"
					min-width="180"
					align="center">
				</el-table-column>
				<el-table-column
					prop="orderTime"
					label="下单时间"
					min-width="180"
					align="center">
				</el-table-column>
				<el-table-column
					prop="completeTime"
					label="完成时间"
					min-width="180"
					align="center">
				</el-table-column>
				<el-table-column
					label="操作"
					min-width="100"
					align="center"
					fixed="right"
					inline-template>
					<div>
						<el-button size="small" @click="routerPush('orderDetail', {id: row.orderId})">详情</el-button>
					</div>
				</el-table-column>
			</el-table>
			<div class="page-container">
				<el-pagination
					:page-size="10"
					layout="total, prev, pager, next"
					:total="tableData.total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import misBreadcrumb from '@/components/breadcrumb'

	export default {
		components: {
			misBreadcrumb
		},

		data() {
			return {
				reviewStatus: [
				{label: '审核未通过', val: '1'},
				{label: '审核通过', val: '2'},
				{label: '待审核', val: '3'},
				],

				searchParams: {
					daterange: [],
					reviewStatus: ''
				},

				tableData: {
					data: [
					{orderId: '203210402421421', driverName: '练俊廷', driverMoblie: '13808204594', driverPlate: '川A AE990', orderProject: '发动机、电气', orderAmount: 9999, mechanicName: '廷俊练', mechanicMobile: '13808204594', orderStatus: '已完成', reviewStatus: '已通过', reviewRemark: '太帅', orderTime: '2017-03-17 16:00:00', completeTime: '2017-03-17 16:00:00'},
					{orderId: '203210402421421', driverName: '练俊廷', driverMoblie: '13808204594', driverPlate: '川A AE990', orderProject: '发动机、电气', orderAmount: 9999, mechanicName: '廷俊练', mechanicMobile: '13808204594', orderStatus: '已完成', reviewStatus: '已通过', reviewRemark: '太帅', orderTime: '2017-03-17 16:00:00', completeTime: '2017-03-17 16:00:00'},
					{orderId: '203210402421421', driverName: '练俊廷', driverMoblie: '13808204594', driverPlate: '川A AE990', orderProject: '发动机、电气', orderAmount: 9999, mechanicName: '廷俊练', mechanicMobile: '13808204594', orderStatus: '已完成', reviewStatus: '已通过', reviewRemark: '太帅', orderTime: '2017-03-17 16:00:00', completeTime: '2017-03-17 16:00:00'}
					],
					total: 1000
				}
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
</style>