<template>
	<div>
		<div class="top-container">
			<div class="breadcrumb-container">
				<mis-breadcrumb separator="-" :attr="[{name: '提现管理', to: '/cashList'}, {name: '提现列表'}]"></mis-breadcrumb>
			</div>
		</div>
		<div class="cash-container">
			<mis-transaction
				icon="/static/image/transaction_cash.png"
				title="交易提现余额"
				color="#3d5baa"
				val="2800.23"
				btn="提现"
				@click="transactionClick('transaction')"
				class="cash-transaction"></mis-transaction>
			<mis-transaction
				icon="/static/image/reward_cash.png"
				title="奖励提现余额"
				color="#d30d17"
				val="86.00"
				btn="提现"
				@click="transactionClick('reward')"
				class="cash-transaction"></mis-transaction>
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
					<el-form-item label="提现类型" class="searchBox">
						<el-select v-model="searchParams.cashType" placeholder="请选择">
							<el-option
								v-for="item in cashTypes"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
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
				</el-form>
			</div>
			<el-table style="width: 100%" :data="cashData.data">
				<el-table-column
        			type="index"
        			label="序号"
        			width="80"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="applyTime"
        			label="提现申请时间"
        			min-width="180"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="account"
        			label="提现账户"
        			min-width="130"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="orderOwner"
        			label="订单所有人"
        			min-width="120"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="accountType"
        			label="账户类型"
        			min-width="120"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="cashType"
        			label="提现类型"
        			min-width="180"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="cashAmount"
        			label="提现金额"
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
        			prop="reviewStatusRemark"
        			label="审核状态说明"
        			min-width="120"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="cashCompleteTime"
        			label="提现完成时间"
        			min-width="180"
        			align="center">
      			</el-table-column>
			</el-table>
			<div class="total-container">
				<div class="total-cash">
					<span>合计交易提现：</span>
					<span style="color: #3d5baa">1200</span>元
				</div>
				<div class="total-cash">
					<span>合计奖励提现：</span>
					<span style="color: #d30d17">920</span>元
				</div>
			</div>
			<div class="page-container">
				<el-pagination
					:page-size="10"
					layout="total, prev, pager, next"
					:total="cashData.total">
				</el-pagination>
			</div>
		</div>
		<el-dialog :title="dialog.title" :visible.sync="dialog.visible">
			<el-form ref="transactionForm" :model="transactionInfo" label-width="100px" v-if="dialog.type === 'transaction'">
				<el-form-item label="交易总余额">
    				<div>{{ transactionInfo.totalAmount }}</div>
  				</el-form-item>
  				<el-form-item label="可用提现金额">
    				<div>{{ transactionInfo.avaliableAmount }}</div>
  				</el-form-item>
  				<el-form-item label="提现金额" prop="cashAmount">
    				<el-input 
    					v-model="transactionInfo.cashAmount"
    					placeholder="提现金额不得超过可用余额"></el-input>
  				</el-form-item>
  				<el-form-item label="提现账户">
  					<el-select v-model="transactionInfo.amount" placeholder="请选择提现账户">
  						<el-option label="微信" value="1"></el-option>
  						<el-option label="支付宝" value="2"></el-option>
  					</el-select>
  				</el-form-item>
  				<el-form-item label="提现密码" prop="cashPwd">
    				<el-input
    					type="password"
    					v-model="transactionInfo.cashPwd"
    					placeholder="请输入提现密码"></el-input>
  				</el-form-item>
			</el-form>
			<el-form ref="rewardForm" :model="rewardInfo" label-width="100px" v-if="dialog.type === 'reward'">
				<el-form-item label="奖励总余额">
    				<div>{{ rewardInfo.totalAmount }}</div>
  				</el-form-item>
  				<el-form-item label="可用提现金额">
    				<div>{{ rewardInfo.avaliableAmount }}</div>
  				</el-form-item>
  				<el-form-item label="提现金额" prop="cashAmount">
    				<el-input 
    					v-model="rewardInfo.cashAmount"
    					placeholder="提现金额不得超过可用余额"></el-input>
  				</el-form-item>
  				<el-form-item label="提现账户">
  					<el-select v-model="rewardInfo.amount" placeholder="请选择提现账户">
  						<el-option label="微信" value="1"></el-option>
  						<el-option label="支付宝" value="2"></el-option>
  					</el-select>
  				</el-form-item>
  				<el-form-item label="提现密码" prop="cashPwd">
    				<el-input
    					type="password"
    					v-model="rewardInfo.cashPwd"
    					placeholder="请输入提现密码"></el-input>
  				</el-form-item>
			</el-form>
			<div class="confirm-btn">
				<el-button type="danger">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import misBreadcrumb from '@/components/breadcrumb'
	import misTransaction from '@/components/transaction'

	export default {
		components: {
			misBreadcrumb,
			misTransaction
		},

		data() {
			return {
				searchParams: {
					daterange: [],
					cashType: '',
					reviewStatus: ''
				},

				cashTypes: [
				{label: '交易提现', val: '1'},
				{label: '奖励提现', val: '2'}
				],

				reviewStatus: [
				{label: '待审核', val: '1'},
				{label: '提现成功', val: '2'},
				{label: '提现失败', val: '3'},
				],

				cashData: {
					data: [
					{applyTime: '2017-4-27 21:10:55', account: '4135315315', orderOwner: '练俊廷', accountType: '支付宝', cashType: '交易提现', cashAmount: '1232', reviewStatus: '待审核', reviewStatusRemark: '太帅', cashCompleteTime: '2017-4-27 21:10:55'},
					{applyTime: '2017-4-27 21:10:55', account: '4135315315', orderOwner: '练俊廷', accountType: '支付宝', cashType: '交易提现', cashAmount: '1232', reviewStatus: '待审核', reviewStatusRemark: '太帅', cashCompleteTime: '2017-4-27 21:10:55'},
					{applyTime: '2017-4-27 21:10:55', account: '4135315315', orderOwner: '练俊廷', accountType: '支付宝', cashType: '交易提现', cashAmount: '1232', reviewStatus: '待审核', reviewStatusRemark: '太帅', cashCompleteTime: '2017-4-27 21:10:55'},
					{applyTime: '2017-4-27 21:10:55', account: '4135315315', orderOwner: '练俊廷', accountType: '支付宝', cashType: '交易提现', cashAmount: '1232', reviewStatus: '待审核', reviewStatusRemark: '太帅', cashCompleteTime: '2017-4-27 21:10:55'}
					],
					total: 1000
				},

				transactionInfo: {
					totalAmount: 1000,
					avaliableAmount: 800,
					cashAmount: '',
					cashPwd: ''
				},

				rewardInfo: {
					totalAmount: 2000,
					avaliableAmount: 800,
					cashAmount: '',
					cashPwd: ''
				},

				dialog: {
					title: '',
					visible: false,
					type: ''
				}
			}
		},

		methods: {
			transactionClick(type) {
				this.dialog = {
					title: type === 'transaction' ? '交易提现' : '奖励提现',
					visible: true,
					type
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

	.cash-container {
		background-color: #fff;
		padding: 40px 60px;

		.cash-transaction {
			display: inline-block;

			&:first-child {
				margin-right: 80px;
			}
		}
	}

	.table-container {
		margin-top: 20px;

		.total-container {
			padding: 20px;
			background-color: #fff;

			.total-cash {
				display: inline-block;
				font-size: 14px;

				&:first-child {
					margin-right: 20px;
				}
			}
		}
	}
</style>