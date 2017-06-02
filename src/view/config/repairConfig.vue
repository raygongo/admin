<template>
	<div>
		<mis-tab :data="tabData" @click="changeTab"  ref="tab"></mis-tab>
		<!--列表-->
		<div class="config-list" v-if="curTab === 'list'">
			<div class="config-list-title">
				日期
				<el-date-picker
						v-model="selectDate"
						type="daterange"
						placeholder="选择日期范围"
						:picker-options="pickerOptions">
				</el-date-picker>

				<span>
					作业类型：
					<el-form :inline="true" style="display: inline;">
						<el-form-item>
							<el-select v-model="workType" placeholder="请选择作业类型">
						      <el-option label="区域一" value="shanghai"></el-option>
						      <el-option label="区域二" value="beijing"></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item>
							<el-input></el-input>
						</el-form-item>
						<el-form-item>
							<el-button>查询</el-button>
						</el-form-item>
					</el-form>
				</span>
			</div>
			<div class="config-list-table">
				<el-table
						:data="tableData"
						border
						width="100%">
					<el-table-column
							align="center"
							label="品牌型号">

						<el-table-column
								prop="workType"
								label="作业类型"
								align="center">
						</el-table-column>
						<el-table-column
								align="center"
								prop="vender"
								label="厂商">
						</el-table-column>
						<el-table-column
								align="center"
								prop="brand"
								label="品牌名称">
						</el-table-column>
						<el-table-column
								align="center"
								prop="engine"
								label="发动机品牌">
						</el-table-column>
						<el-table-column
								align="center"
								prop="model"
								label="型号">
						</el-table-column>
						<el-table-column
								align="center"
								prop="ratio"
								label="速比型号">
						</el-table-column>
						<el-table-column
								align="center"
								prop="car"
								label="车辆类型">
						</el-table-column>
					</el-table-column>

					<el-table-column
							align="center"
							label="作业项目">
						<el-table-column
								label="故障现象"
								width="150px"
								align="center">
							<template scope="scope">
								<el-popover trigger="hover" placement="top">
									<p>{{ scope.row.fault }}</p>
									<div slot="reference" class="hidden-row-much">
										<el-tag>{{ scope.row.fault }}</el-tag>
									</div>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column
								align="center"
								prop="faultDiagnosis"
								label="故障原因">
						</el-table-column>
						<el-table-column
								align="center"
								prop="workItems"
								label="作业项目">
						</el-table-column>
						<el-table-column
								align="center"
								prop="workCount"
								label="作业个数">
						</el-table-column>
						<el-table-column
								align="center"
								prop="workCost"
								label="工时费">
						</el-table-column>
					</el-table-column>

					<el-table-column
							align="center"
							label="配件项">
						<el-table-column
								prop="partsName"
								label="配件名称"
								align="center">
						</el-table-column>
						<el-table-column
								align="center"
								prop="partsCount"
								label="配件个数">
						</el-table-column>
						<el-table-column
								align="center"
								prop="partsPrice"
								label="配件单价">
						</el-table-column>
						<el-table-column
								align="center"
								prop="partsTotal"
								label="配件总价">
						</el-table-column>

					</el-table-column>
					<el-table-column
							fixed="right"
							align="center"
							width="150"
							label="操作">
						<template scope="scope">
							<el-button @click="editConfig" size="small">编辑</el-button>
							<el-button size="small">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="page-box">
				<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page.sync="currentPage"
						:page-size="100"
						layout="total, prev, pager, next"
						:total="1000">
				</el-pagination>
			</div>
		</div>

		<!--业务配置-->
		<div class="config-business" v-if="curTab ==='config'">


			<div class="config-head">
				<span>请选择车辆部件(单选)</span>
			</div>
			<!--车辆部件-->
			<div class="config-car-part">
				<ul class="car-part-list">
					<li class="engine-icon"
					    :class="{'active-car-part':selectCartPart=='engine'}"
					    @click="selectCartPart='engine'"><span>发动机</span></li>
					<li class="clutch-icon"
					    :class="{'active-car-part':selectCartPart=='clutch'}"
					    @click="selectCartPart='clutch'"
					>
						<span>离合变速</span>
					</li>
					<li class="swerve-icon"
					    :class="{'active-car-part':selectCartPart=='swerve'}"
					    @click="selectCartPart='swerve'"
					><span>转向制动</span></li>
					<li class="hang-icon"
					    :class="{'active-car-part':selectCartPart=='hang'}"
					    @click="selectCartPart='hang'"
					><span>车轿悬挂</span></li>
					<li class="electric-icon"
					    :class="{'active-car-part':selectCartPart=='electric'}"
					    @click="selectCartPart='electric'"
					><span>电气</span></li>
					<li class="carbody-icon"
					    :class="{'active-car-part':selectCartPart=='carbody'}"
					    @click="selectCartPart='carbody'"
					><span>车身</span></li>
					<li class="upkeep-icon"
					    :class="{'active-car-part':selectCartPart=='upkeep'}"
					    @click="selectCartPart='upkeep'"
					><span>保养</span></li>
				</ul>
			</div>

			<!--保养类型 二级菜单-->
			<ul class="upkeep-item-list" v-if="selectCartPart=='upkeep'">
				<li class="upkeep-item "
				    @click="upkeepData.selectUpkeepType = '0'"
				    :class="{'active-upkeep-item':upkeepData.selectUpkeepType=='0'}">变速箱车轿保养</li>
				<li class="upkeep-item"
				    @click="upkeepData.selectUpkeepType = '1'"
				    :class="{'active-upkeep-item':upkeepData.selectUpkeepType=='1'}">车轮保养</li>
				<li class="upkeep-item"
				    @click="upkeepData.selectUpkeepType = '2'"
				    :class="{'active-upkeep-item':upkeepData.selectUpkeepType=='2'}">转向器保养</li>
				<li class="upkeep-item"
				    @click="upkeepData.selectUpkeepType = '3'"
				    :class="{'active-upkeep-item':upkeepData.selectUpkeepType=='3'}">发动机保养</li>
			</ul>
			<!--保养类型 三级菜单-->
			<ul class="upkeep-item-list engine-upkeep" v-if="upkeepData.selectUpkeepType=='3'">
				<li class="upkeep-item "
				    @click="upkeepData.selectEngineUpkeepType = '0'"
				    :class="{'active-upkeep-item':upkeepData.selectEngineUpkeepType=='0'}">更换机油</li>
				<li class="upkeep-item"
				    @click="upkeepData.selectEngineUpkeepType = '1'"
				    :class="{'active-upkeep-item':upkeepData.selectEngineUpkeepType=='1'}">更换三滤</li>
				<li class="upkeep-item"
				    @click="upkeepData.selectEngineUpkeepType = '2'"
				    :class="{'active-upkeep-item':upkeepData.selectEngineUpkeepType=='2'}">更换三滤</li>
			</ul>

			<!--车辆(发动机)品牌-->
			<div class="config-head">
				<span>请选择发动机品牌(单选)</span>
			</div>
			<div class="check-brand">
				<el-tabs v-model="activeBrand" >
					<el-tab-pane label="A-E" name="a-e">
						<el-radio-group v-model="engineData.selectBrand">
							<el-radio label="东风">东风</el-radio>
							<el-radio label="啊">啊</el-radio>
						</el-radio-group>
					</el-tab-pane>
					<el-tab-pane label="F-J" name="f-j">
						<el-radio-group v-model="engineData.selectBrand">
							<el-radio label="f">f</el-radio>
							<el-radio label="j">j</el-radio>
						</el-radio-group>
					</el-tab-pane>
					<el-tab-pane label="K-O" name="k-o">
						<el-radio-group v-model="engineData.selectBrand">
							<el-radio label="k">f</el-radio>
							<el-radio label="o">j</el-radio>
						</el-radio-group>
					</el-tab-pane>
					<el-tab-pane label="P-T" name="p-t">
						<el-radio-group v-model="engineData.selectBrand">
							<el-radio label="p">p</el-radio>
							<el-radio label="t">t</el-radio>
						</el-radio-group>
					</el-tab-pane>
					<el-tab-pane label="U-Y" name="u-y">
						<el-radio-group v-model="engineData.selectBrand">
							<el-radio label="u">u</el-radio>
							<el-radio label="u">y</el-radio>
						</el-radio-group>
					</el-tab-pane>
					<el-tab-pane label="Z" name="z">
						<el-radio-group v-model="engineData.selectBrand">
							<el-radio label="z">z</el-radio>
						</el-radio-group>
					</el-tab-pane>
				</el-tabs>
			</div>

			<!--车辆(型号)-->
			<div class="config-head">
				<span>请选择发动机型号(多选)</span>
			</div>
			<div class="config-select-items">
				<el-checkbox-group v-model="engineData.selectModel">
					<el-checkbox label="1" name="type">D38.01</el-checkbox>
					<el-checkbox label="2" name="type">D38.013</el-checkbox>
					<el-checkbox label="3" name="type">D38.013</el-checkbox>
					<el-checkbox label="4" name="type">D38.013</el-checkbox>
				</el-checkbox-group>
			</div>

			<div class="submit-button">
				<el-button type="danger" style="width: 150px">确定</el-button>
			</div>

			<!--设置工时费和配件价格-->
			<div class="config-money">

				<div class="config-work-cost">
					<div class="config-head">
						<span>设置工时费</span>
						<!--<span class="config-filter">-->
						<!--条件筛选-->
						<!--<el-select v-model="filterFault" placeholder="根据故障现象">-->
						<!--<el-option label="发动机抖动" value="shanghai"></el-option>-->
						<!--<el-option label="刹车失灵" value="beijing"></el-option>-->
						<!--</el-select>-->
						<!--<el-select  v-model="filterWork" placeholder="根据作业项目">-->
						<!--<el-option label="换刹车" value="shanghai"></el-option>-->
						<!--<el-option label="换离合器" value="beijing"></el-option>-->
						<!--</el-select>-->
						<!--</span>-->
					</div>
					<div class="work-cost-list">
						<el-table
								:data="engineData.workCostData"
								width="100%"
								border>

							<el-table-column
									prop="fault"
									label="故障现象"
									align="center"
							>
							</el-table-column>

							<el-table-column
									prop="workItems"
									label="作业项目"
									align="center"
							>
							</el-table-column>

							<el-table-column
									label="数量"
									prop="count"
									align="center"
							>
							</el-table-column>
							<el-table-column
									label="工时费"
									prop="workCost"
									align="center"
							>
							</el-table-column>
							<el-table-column
									label="推荐工时费"
									prop="suggestCost"
									align="center"
							>
							</el-table-column>
						</el-table>
					</div>
					<div class="list-page-box">
						<el-pagination
								@size-change="handleSizeChange"
								@current-change="handleSizeChange"
								:current-page.sync="currentPage"
								:page-size="100"
								layout="total, prev, pager, next"
								:total="1000">
						</el-pagination>
					</div>
				</div>

				<div class="config-parts-price">
					<div class="config-head">
						<span>设置配件价</span>
						<el-button type="info" style="float: right;position: relative;top: -10px;">使用模板价格</el-button>
					</div>
					<div class="parts-price-list">
						<el-table
								:data="engineData.workCostData"
								width="100%"
								border>

							<el-table-column
									prop="fault"
									label="名称"
									align="center">
							</el-table-column>

							<el-table-column
									prop="workItems"
									label="图号"
									align="center">
							</el-table-column>

							<el-table-column
									label="个数"
									prop="count"
									align="center">
							</el-table-column>
							<el-table-column
									label="单价"
									prop="workCost"
									align="center"
							>
							</el-table-column>
							<el-table-column
									label="复价"
									prop="suggestCost"
									align="center">
							</el-table-column>
							<el-table-column
									label="推荐工时费"
									prop="suggestCost"
									align="center"
							>
							</el-table-column>
						</el-table>
					</div>
					<div class="list-page-box">
						<el-pagination
								@size-change="handleSizeChange"
								@current-change="handleSizeChange"
								:current-page.sync="currentPage"
								:page-size="100"
								layout="total, prev, pager, next"
								:total="1000">
						</el-pagination>
					</div>
				</div>
			</div>

		</div>

		<!--里程费-->
		<div  v-if="curTab == 'kil'">
			<div class="config-kil-price">
				<el-form :inline="true">
					<el-form-item label="里程费：">
						<el-input  placeholder="里程费"></el-input>
					</el-form-item>
					<el-form-item>元/公里</el-form-item>
				</el-form>
			</div>
			<div class="config-kil-info">
				配置每公里里程收取价格
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import misTab from '@/components/tab'


	export default{
		data(){
			return {
				tabData: [
					{key: 'list', title: '列表'},
					{key: 'config', title: '业务配置'},
					{key:'kil',title:'里程费'}
				],
				curTab:'list',
				/*列表*/
				selectDate   : '',           // 选中日期
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e7;
					}
				},
				workType:'',       //选中的作业类型
				tableData: [{
					workType: '发动机', // 作业类型
					vender: '东风',   // 厂商
					brand: '东风',   //品牌名称
					engine: '重汽',  //发动机品牌
					model: 'DSA-s03',  //型号
					ratio: 3411.2,   //速比型号
					car:'奔驰',     //车辆类型
					fault:'发动机报警发动机报警发动警发动机报警发动机报警',  //故障现象
					faultDiagnosis:'故障原因', //故障原因
					workItems:'更换轮胎',     //作业项目
					workCount:1,             // 作业个数
					workCost:'100',         // 工时费
					partsName:'配件名称', //配件名称
					partsCount:2,    // 配件个数
					partsPrice:'100',   // 配件单价
					partsTotal:'200'    // 配件总价

				},],


				/*业务配置*/
				selectCartPart:'engine',
				activeBrand:'a-e',   // 选中品牌

				engineData:{
					selectBrand:'',    // 选中的发动机品牌
					selectModel:'',    //  都选中的发动机型号
					workCostData:[
						{
							fault:'发动机抖动',
							workItems:'更换飞轮',
							count:5,
							workCost:'100',
							suggestCost:'200'
						},{
							fault:'发动机抖动',
							workItems:'更换飞轮',
							count:5,
							workCost:'100',
							suggestCost:'200'
						},{
							fault:'发动机抖动',
							workItems:'更换飞轮',
							count:5,
							workCost:'100',
							suggestCost:'200'
						},{
							fault:'发动机抖动',
							workItems:'更换飞轮',
							count:5,
							workCost:'100',
							suggestCost:'200'
						},{
							fault:'发动机抖动',
							workItems:'更换飞轮',
							count:5,
							workCost:'100',
							suggestCost:'200'
						}
					]
				},
				upkeepData:{
					selectUpkeepType:'0',
					selectEngineUpkeepType:'0'
				},
				filterFault:'',
				filterWork:'',
				currentPage:1,
				optinons:{

				}
			}
		},
		computed:{

		},
		methods:{
			changeTab(key){
				this.curTab = key;
			},
			handleSizeChange(page){
				console.log(page)
			},
			handleCurrentChange(page){
				console.log(page)
			},
			/**
			 *  编辑业务
			 */
			editConfig(){
				// 跳转到业务配置页面
				this.$refs.tab.tabClick('config')
			}

		},
		components:{
			misTab
		}
	}
</script>

<style lang="less">
	@import '../../style/mixin.less';

	@borderColor:#d0d0d0;
	@activeColor:#d70e18;


	/*列表*/
	.config-list {

		.config-list-title {
			background: #fff;
			padding: 25px 0 0 25px;
		}
		.page-box {
			margin-top: 30px;
		}
	}

	/* 业务配置 */
	.config-business{
		font-size: 14px;
		.config-head{
			background: #f7f8fa;
			padding: 20px;
			position: relative;
			.config-filter{
				position: absolute;
				right: 20px;
				top: 10px;
			}
		}

		.config-car-part{
			background: #fff;
			padding: 30px 30px 50px 30px;

			.car-part-list{
				overflow: hidden;
				width: 100%;
				&>li{
					width: 13.3%;
					height: 130px;
					float: left;
					text-align: center;
					color: #fff;
					cursor: pointer;
					margin-right: 1%;
					&>span{
						padding-top: 87px;
						display: inline-block;
					}
				}
				&>li:last-child{
					margin-right: 0;
				}

				.engine-icon{
					background: url(/static/image/engine-icon.png) no-repeat center 25px;
					background-color: #abaeb3;
				}
				.clutch-icon{
					background: url(/static/image/clutch-icon.png) no-repeat center 25px;
					background-color: #abaeb3;
				}
				.swerve-icon{
					background: url(/static/image/swerve-icon.png) no-repeat center 25px;
					background-color: #abaeb3;
				}
				.hang-icon{
					background: url(/static/image/hang-icon.png) no-repeat center 25px;
					background-color: #abaeb3;
				}
				.electric-icon{
					background: url(/static/image/electric-icon.png) no-repeat center 25px;
					background-color: #abaeb3;
				}
				.carbody-icon{
					background: url(/static/image/carbody-icon.png) no-repeat center 25px;
					background-color: #abaeb3;
				}
				.upkeep-icon{
					background: url(/static/image/upkeep-icon.png) no-repeat center 25px;
					background-color: #abaeb3;
				}

				.active-car-part{
					background-color: #d80d11;
				}

			}


		}

		.upkeep-item-list{
			overflow: hidden;
			background: #fff;
			padding: 50px 30px;
			border-top: 1px solid @borderColor;
			border-bottom: 1px solid @borderColor;
			.upkeep-item{
				cursor: pointer;
				font-size: 16px;
				float: left;
				width: 24%;
				margin-right: 1%;
				text-align: center;
				padding: 14px 0;
				border: 2px solid @borderColor;
				color: @borderColor;
				&:last-child{
					margin-right: 0;
				}
				&:hover{
					border: 2px solid @activeColor;
					color: @activeColor;
				}
			}
			.active-upkeep-item{
				border: 2px solid @activeColor;
				background: url(/static/image/selected-bg.png) left top no-repeat;
				color: @activeColor;
			}


		}

		.engine-upkeep{
			border:none;
			padding-top: 35px;
			padding-bottom: 45px;
			.upkeep-item{
				border: 2px solid transparent;
				width: auto;
				padding-left: 40px;
				padding-right: 30px;
				margin-bottom: 10px;
			}
			.active-upkeep-item{
				border: 2px solid @activeColor;
				background: url(/static/image/selected-bg.png) left top no-repeat;
				color: @activeColor;
			}
		}

		.check-brand{
			background: #fff;
			padding: 20px;
			min-height: 300px;
		}

		.config-select-items{
			background: #fff;
			padding: 20px;
		}

		.submit-button{
			padding: 30px;
			text-align: center;
		}

		.config-money{
			background: #fff;
			height: 500px;
			overflow: hidden;
			.config-work-cost{
				float: left;
				width: 45%;
				height: 100%;
				position: relative;
			}
			.config-parts-price{
				float: left;
				width: 55%;
				height: 100%;
				position: relative;
			}
			.config-work-cost{
				border-right: 1px solid #ddd;
			}
			.work-cost-list,.parts-price-list{
				width: 100%;
				padding: 30px 20px;

			}
			.list-page-box{
				width: 100%;
				position: absolute;
				bottom: 40px;
				left: 0;
				text-align: center;
			}
		}


	}

	/*里程费*/
	.config-kil-price{
		padding: 50px 20px;
		background: #fff;
	}

	.config-kil-info{
		background: #ffffff;
		padding: 20px;
		border-top: 1px solid #ddd;
		color: #ddd;
	}


</style>
