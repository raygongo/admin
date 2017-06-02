<template>
	<div>
		<div class="top-container">
			<div class="breadcrumb-container">
				<mis-breadcrumb separator="-" :attr="[{name: '订单管理', to: '/orderList'}, {name: '订单详情'}]"></mis-breadcrumb>
			</div>
		</div>
		<div class="order-mis-title-wrap">
			<mis-title title="订单信息"></mis-title>
			<img class="orderStatus" src="/static/image/order_complete.png">
		</div>
		<div>
			<div class="order-info-container">
				<el-form>
					<el-form-item label="基本信息:"></el-form-item>
					<el-form-item label="订单编号:" class="base-info-item">{{ orderDetail.orderId }}</el-form-item>
					<el-form-item label="订单金额:" class="base-info-item">{{ orderDetail.orderAmount }}</el-form-item>
					<el-form-item label="司机姓名:" class="base-info-item">{{ orderDetail.driverName }}</el-form-item>
					<el-form-item label="司机手机号:" class="base-info-item">{{ orderDetail.driverMobile }}</el-form-item>
					<el-form-item label="司机车牌号:" class="base-info-item">{{ orderDetail.driverPlate }}</el-form-item>
					<el-form-item label="服务技工:" class="base-info-item">{{ orderDetail.mechanicName }}</el-form-item>
					<el-form-item label="技工手机号:" class="base-info-item">{{ orderDetail.mechanicMobile }}</el-form-item>
					<el-form-item label="下单时间:" class="base-info-item">{{ orderDetail.orderTime }}</el-form-item>
					<el-form-item label="完成时间:" class="base-info-item">{{ orderDetail.completeTime }}</el-form-item>
					<el-form-item label="司机地址:" class="base-info-item">{{ orderDetail.driverAddr }}</el-form-item>
				</el-form>
			</div>
			<div class="order-info-container">
				<el-form>
					<el-form-item label="审核状态:">
						<div style="color: #fa5151">审核状态</div>
					</el-form-item>
					<el-form-item label="审核备注:">{{ orderDetail.reviewRemark }}</el-form-item>
				</el-form>
			</div>
			<div class="order-info-container">
				<el-form>
					<el-form-item label="评价信息:"></el-form-item>
					<el-form-item label="星级:">
						<mis-rate :rate="5" style="margin-top: 2px"></mis-rate>
					</el-form-item>
					<el-form-item label="评价内容:">还将就</el-form-item>
					<el-form-item label="评价时间:">2017-05-10 17:00:00</el-form-item>
				</el-form>
			</div>
			<div class="order-info-container">
				<el-form>
					<el-form-item label="服务明细:"></el-form-item>
				</el-form>
				<div class="order-info-service-container">
					<div class="order-info-service">
						<div class="order-info-service-wrap" v-for="item1 in orderDetail.serviceData">
							<div class="order-info-service-label">{{ item1.label }}</div>
							<div class="order-info-service-value">小计 ￥{{ item1.value }}</div>
							<div class="order-info-service-wrap" v-for="item2 in item1.children">
								<div class="order-info-service-label">{{ item2.label }}</div>
								<div class="order-info-service-value">￥{{ item2.value }}</div>
								<div class="order-info-service-wrap" v-for="item3 in item2.children">
									<div class="order-info-service-label">{{ item3.label }}</div>
									<div class="order-info-service-value">￥{{ item3.value }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import misBreadcrumb from '@/components/breadcrumb'
	import misTitle from '@/components/title'
	import misRate from '@/components/rate/rate'

	export default {
		components: {
			misBreadcrumb,
			misTitle,
			misRate
		},

		data() {
			return {
				orderDetail: {
					orderId: '20170102023204204',
					orderAmount: 1970.00,
					driverName: '练俊廷',
					driverMobile: '13808204594',
					driverPlate: '川A AE793',
					mechanicName: '廷俊练',
					mechanicMobile: '13808204594',
					orderTime: '2017-05-10 17:00:00',
					completeTime: '2017-05-10 17:00:00',
					driverAddr: '天府三街',
					reviewRemark: '没啥原因',
					serviceData: [
					{
						label: '发动机',
						value: 1066.00,
						children: [
						{
							label: '检修喷油器',
							value: 66.00,
							children: [
							{
								label: '喷油器线束 x 1',
								value: 32.00
							},{
								label: '喷油器密封垫 x 1',
								value: 34.00
							}
							]
						}
						]
					}, {
						label: '发动机',
						value: 1066.00,
						children: [
						{
							label: '检修喷油器',
							value: 66.00,
							children: [
							{
								label: '喷油器线束 x 1',
								value: 32.00
							},{
								label: '喷油器密封垫 x 1',
								value: 34.00
							}
							]
						}
						]
					}
					]
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

	.order-mis-title-wrap {
		position: relative;
		height: 88px;
		background-color: #fff;
		padding-top: 20px;

		.orderStatus {
			position: absolute;
			right: 0;
			top: 0;
			height: 88px;
		}
	}

	.order-info-container {
		padding: 30px;
		background-color: #fff;
		margin-top: 2px;

		.order-info-detail {
			padding: 0 40px 0 20px;
			text-align: right;
		}

		.base-info-item {
			display: inline-block;
			width: 48%;
		}

		&:not(:first-child) {
			margin-top: 20px;
		}
	}

	.order-info-service-container {
		border: 1px solid #e7eaf0;
		font-size: 0;
		width: 50%;

		.order-info-service-label,
		.order-info-service-value {
			display: inline-block;
			width: 50%;
			font-size: 14px;
		}

		.order-info-service-value {
			text-align: right;
		}

		.order-info-service {
			> .order-info-service-wrap {
				padding-bottom: 20px;

				&:not(:first-child) {
					border-top: 1px solid #e7eaf0;
				}

				> .order-info-service-label,
				> .order-info-service-value {
					padding: 20px;
				}

				> .order-info-service-wrap {
					.order-info-service-label,
					.order-info-service-value {
						padding: 5px 20px;
					}

					> .order-info-service-wrap {
						color: #bebebe;
					}
				}
			}
		}
	}
</style>