<template>
	<div>
		<transition name="el-zoom-in-top">
			<div class="guide-content" v-show="showGuide">
				<span>设置向导</span>

				<mis-guide-steps :guideContent="guideItems" style="margin-left: 10%;"></mis-guide-steps>

				<el-button type="danger" style="float: right" @click="showGuide = false">关闭向导</el-button>
			</div>
		</transition>

		<div class="guide-switch" v-show="!showGuide" @click="showGuide = true">
			<i class="el-icon-arrow-left"></i>
			<span>打开向导</span>
		</div>

		<div class="card-title">
			<span class="title-message">运营状况</span>
		</div>
		<div class="card-list">
			<ul>
				<li class="card-detail-count">
					<div class="detail-count-name">总营金额</div>
					<p class="detail-count-number">123,112,123.00</p>
				</li>
				<li class="card-detail-count">
					<div class="detail-count-name">接单总数</div>
					<p class="detail-count-number">123,112,123.00</p>
				</li>
				<li class="card-detail-count">
					<div class="detail-count-name">奖励总额</div>
					<p class="detail-count-number">{{number | priceNumber}}</p>
				</li>
				<li class="card-detail-count red">
					<div class="detail-count-name">交易余额</div>
					<p class="detail-count-number">123,112,123.00</p>
				</li>
				<li class="card-detail-count red">
					<div class="detail-count-name">奖励余额</div>
					<p class="detail-count-number">123,112,123.00</p>
				</li>
				<li class="card-detail-count red">
					<div class="detail-count-name">可兑换积分</div>
					<p class="detail-count-number">123,112,123.00</p>
				</li>
			</ul>
		</div>

		<div class="echarts">
			<el-date-picker
					v-model="selectDate"
					type="daterange"
					placeholder="选择日期范围"
					class="date-picker"
					:picker-options="pickerOptions">
			</el-date-picker>

			<div style="height: 500px;width: 100%;">
				<IEcharts :option="echartsData" :loading="echartsLoading" ></IEcharts>
			</div>

		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import IEcharts from 'vue-echarts-v3/src/lite.vue';
	import 'echarts/lib/chart/bar';
	import 'echarts/lib/chart/line';
	import 'echarts/lib/component/tooltip';
	import 'echarts/lib/component/legend';
	import misGuideSteps from '@/components/steps/steps';
	export default {
		name: 'index',
		data () {
			return {
				number: 1000.01,
				guideItems:[
					{
						label:'添加员工',
						state:false,
						link:'staffAdd'
					},
					{
						label:'业务设置',
						state:false,
						link:'repairConfig/config'
					},
					{
						label:'账户设置',
						state:true,
						link:'accountManage'
					}
				],
				showGuide: true,
				echartsLoading: true,   //echarts loading
				selectDate: '',      // 日期属性
				guideState: false,    // 向导状态
				echartsData: {     // echarts 数据
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					legend: {
						data: ['每日交易额度', '每日成交量'],
						right: '5%',
						itemGap: 100,
						top: 0,
						padding: [
							0, 0, 20, 0
						]
					},
					xAxis: [
						{
							type: 'category',
							data: [],
							axisPointer: {
								type: 'shadow'
							}
						}
					],
					yAxis: [
						{
							type: 'value',
							name: '成交量',
							min: 0,
							max: 250,
							interval: 50,
							axisLabel: {
								formatter: '{value}'
							}
						},
						{
							type: 'value',
							name: '交易额',
							min: 0,
							max: 25,
							interval: 5,
							axisLabel: {
								formatter: '{value}'
							}
						}
					],
					series: [
						{
							name: '每日交易额度',
							type: 'bar',
							data: [],

						},
						{
							name: '每日成交量',
							type: 'line',
							yAxisIndex: 1,
							data: [],
							itemStyle:{
								normal:{
									color:'#398fd8'
								}
							}
						}
					]
				},
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e7;
					}
				},
			}
		},
		methods: {

		},
		created(){
			setTimeout(()=>{
				this.echartsData.xAxis[0].data = ['2017.5.15','2017.5.15','2017.5.15','2017.5.15','2017.5.15','2017.5.15','2017.5.15','2017.5.15','2017.5.15','2017.5.15','2017.5.15','2017.5.15','2017.5.15','2017.5.15','2017.5.15','2017.5.15'];
				this.echartsData.series[0].data = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,20,3.3,3.3,10];
				this.echartsData.series[1].data = [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,3.3,3.3,3.3,3.3];
				this.echartsLoading = false
			},2000)

		},
		computed:{
		},
		watch:{
			/**
			 * 监听用户选择时间 进行 表格数据
			 * @param newValue
			 * @param old
			 */
			selectDate(newValue,old){
				newValue[0] && console.log(newValue[0].getDate())
			}
		},
		components: {
			IEcharts,
			misGuideSteps
		}
	}
</script>

<style lang="less" scoped>

	.guide-switch {
		cursor: pointer;
		position: absolute;
		right: 0;
		padding-left: 5px;
		line-height: 2;
		width: 110px;
		color: #fff;
		border-radius: 20px 0px 0px 20px;
		background: #1a1e28;
		& > span {
			margin-left: 5px;
		}
	}

	.guide-content {
		background: #ffffff;
		margin: 0px -20px 0 -20px;
		padding: 30px 20px;
		position: relative;
		width: e("calc(100% + 40px)");



	}

	.card-title {
		padding: 30px;
		font-size: 20px;
		padding-left: 0;

		.title-message {
			display: inline-block;
			border-left: 5px solid #d80d18;
			padding-left: 10px;
		}
	}

	.card-list {
		& > ul {
			overflow: hidden;

			.card-detail-count {
				text-align: center;
				color: #fff;
				width: 15.5%;
				float: left;
				background: #398fd8;
				height: 100px;
				margin-right: 1.3%;
				&:last-child {
					margin-right: 0;
				}

				.detail-count-name {
					margin-top: 26px;
					margin-bottom: 20px;
				}

				.detail-count-number {
					font-size: 18px;
				}

			}

			.red {
				background: #d70d18;
			}
		}
	}

	.echarts {
		width: 100%;
		background: #fff;
		margin-top: 30px;
		.date-picker {
			z-index: 99;
			position: relative;
			top: 20px;
			left: 5%;
		}
	}

</style>
