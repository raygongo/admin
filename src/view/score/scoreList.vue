<template>
	<div>
		<div class="top-container">
			<div class="breadcrumb-container">
				<mis-breadcrumb separator="-" :attr="[{name: '积分管理', to: '/scoreList'}, {name: '积分信息列表'}]"></mis-breadcrumb>
			</div>
		</div>
		<div class="total-score-container">
			<mis-transaction
				icon="/static/image/score_cash.png"
				title="可兑换积分额"
				color="#3184d3"
				val="2000"
				btn="兑换积分"
				@click="dialog.visible = true"></mis-transaction>
		</div>
		<div class="table-container">
			<mis-tab :data="tabData" @click="tabClick"></mis-tab>
			<div class="search-container">
				<el-form ref="searchForm" :model="searchParams" label-width="80px">
					<el-form-item label="日期" class="searchBox">
						<el-date-picker
							v-model="searchParams.daterange"
							type="daterange"
							placeholder="选择日期范围">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="奖励类型" class="searchBox">
						<el-select v-model="searchParams.rewardType" placeholder="请选择">
							<el-option
								v-for="item in rewardTypes"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-button>搜索</el-button>
				</el-form>
			</div>
			<el-table style="width: 100%" :data="scoreData" v-show="currentTab === 'score'">
				<el-table-column
        			type="index"
        			label="序号"
        			width="80"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="publishDate"
        			label="积分发布时间"
        			min-width="180"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="rewardType"
        			label="奖励类型"
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
        			prop="mechanic"
        			label="交易技工"
        			min-width="120"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="plateNumber"
        			label="交易司机车牌号"
        			min-width="180"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="orderAmount"
        			label="订单价格"
        			min-width="120"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="rewardScore"
        			label="奖励积分"
        			min-width="120"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="lockScore"
        			label="锁定积分"
        			min-width="120"
        			align="center">
      			</el-table-column>
			</el-table>
			<el-table style="width: 100%" :data="recordData" v-show="currentTab === 'record'">
				<el-table-column
        			type="index"
        			label="序号"
        			width="80"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="exchangeDate"
        			label="兑换时间"
        			min-width="180"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="exchangeScore"
        			label="兑换积分"
        			min-width="130"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="rewardStatus"
        			label="兑换状态"
        			min-width="120"
        			align="center">
      			</el-table-column>
			</el-table>
			<div class="page-container">
				<el-pagination
					:page-size="10"
					layout="total, prev, pager, next"
					:total="total">
				</el-pagination>
			</div>
		</div>
		<el-dialog :title="dialog.title" :visible.sync="dialog.visible">
			<el-form ref="scoreForm" :model="scoreInfo" label-width="90px">
				<el-form-item label="可兑换积分">
    				<div>{{ scoreInfo.avaliableScore }}</div>
  				</el-form-item>
  				<el-form-item label="锁定积分">
    				<div>{{ scoreInfo.lockScore }}</div>
  				</el-form-item>
  				<el-form-item label="兑换积分" prop="exchangeScore">
    				<el-input 
    					v-model="scoreInfo.exchangeScore"
    					placeholder="兑换积分不能小于10"></el-input>
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
	import misTab from '@/components/tab'

	export default {
		data() {
			return {
				tabData: [
				{title: '积分列表', key: 'score'},
				{title: '兑换记录', key: 'record'}
				],
				currentTab: 'score',

				total: 100,

				rewardTypes: [
				{label: '管理员维修比例奖励', value: '1'},
				{label: '啥奖励', value: '2'}
				],

				searchParams: {
					daterange: [],
					rewardType: ''
				},
				
				scoreData: [
				{publishDate: '2017-4-27 21:10:55', rewardType: '管理员维修比例奖励' ,orderNo: '2017424211055111', mechanic: '练俊廷', plateNumber: '川A88888', orderAmount: '258.00', rewardScore: 200, lockScore: 0},
				{publishDate: '2017-4-27 21:10:55', rewardType: '管理员维修比例奖励' ,orderNo: '2017424211055111', mechanic: '练俊廷', plateNumber: '川A88888', orderAmount: '258.00', rewardScore: 200, lockScore: 0},
				{publishDate: '2017-4-27 21:10:55', rewardType: '管理员维修比例奖励' ,orderNo: '2017424211055111', mechanic: '练俊廷', plateNumber: '川A88888', orderAmount: '258.00', rewardScore: 200, lockScore: 0},
				{publishDate: '2017-4-27 21:10:55', rewardType: '管理员维修比例奖励' ,orderNo: '2017424211055111', mechanic: '练俊廷', plateNumber: '川A88888', orderAmount: '258.00', rewardScore: 200, lockScore: 0}
				],

				recordData: [
				{exchangeDate: '2017-4-27 21:10:55', exchangeScore: 100, rewardStatus: '兑换成功'},
				{exchangeDate: '2017-4-27 21:10:55', exchangeScore: 100, rewardStatus: '兑换成功'},
				{exchangeDate: '2017-4-27 21:10:55', exchangeScore: 100, rewardStatus: '兑换成功'}
				],

				dialog: {
					title: '兑换积分',
					visible: false
				},

				scoreInfo: {
					avaliableScore: 886.23,
					lockScore: 0,
					exchangeScore: ''
				}
			}
		},

		components: {
			misBreadcrumb,
			misTransaction,
			misTab
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
</style>