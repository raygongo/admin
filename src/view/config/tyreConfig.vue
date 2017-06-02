<template>
	<div>
		<div class="top-container">
			<div class="breadcrumb-container">
				<mis-breadcrumb separator="-"
				                :attr="[{name: '业务配置', to: '/tyreList'}, {name: '商品管理'}]"></mis-breadcrumb>
			</div>
		</div>
		<mis-tab :data="tabData" @click="tabClick" ref="tab"></mis-tab>

		<!--商品列表-->
		<div class="table-container" v-show="currentTab === 'list'">
			<div class="search-container">
				<el-form ref="searchForm" :model="searchParams" label-width="80px">
					<el-form-item label="商品状态" class="searchBox">
						<el-select v-model="searchParams.productStatus" placeholder="请选择商品状态">
							<el-option
									v-for="item in productStatus"
									:key="item.value"
									:label="item.label"
									:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-button @click="getBusinessList({tire_status:searchParams.productStatus})">搜索</el-button>
				</el-form>
			</div>
			<el-table style="width: 100%" :data="TireListData">
				<el-table-column
						prop="id"
						label="商品ID"
						min-width="100"
						align="center">
				</el-table-column>
				<el-table-column
						prop="good_name"
						label="商品名称"
						min-width="200"
						align="center">
				</el-table-column>
				<el-table-column
						prop="price"
						label="价格"
						min-width="120"
						align="center">
				</el-table-column>
				<el-table-column
						prop="create_time"
						label="创建时间"
						min-width="120"
						align="center">
				</el-table-column>
				<el-table-column
						inline-template
						label="商品状态"
						min-width="100"
						align="center">
					<div>
						<el-tag type="success" v-if="row.status === '1'">上架</el-tag>
						<el-tag type="danger" v-if="row.status === '2'">已下架</el-tag>
					</div>
				</el-table-column>
				<el-table-column
						label="操作"
						min-width="200"
						align="center"
						fixed="right"
						inline-template>
					<div>
						<el-button size="small" v-if="row.status === '2'" @click="putOnItem(row.id)">上架</el-button>
						<el-button size="small" v-if="row.status === '1'" @click="soldOutItem(row.id)">下架</el-button>
						<el-button size="small" @click="editItem(row)">编辑</el-button>
						<el-button size="small" @click="delItem(row.id)">删除</el-button>
					</div>
				</el-table-column>
			</el-table>
		</div>

		<!--业务配置-->
		<div class="product-container" v-show="currentTab === 'config'">
			<mis-title title="商品信息"></mis-title>
			<div class="product-attr-wrap">
				<div class="tips-container">
					<span class="tips">请选择品牌名称（单选）</span>
				</div>
				<div class="product-attr-container">
					<el-tabs v-model="productNameTab">
						<el-tab-pane label="ABCDE" name="ABCDE">
							<el-radio-group v-model="options.selectBrand">
								<el-radio
										v-for="brand in BrandsData.ABCDE"
										:key="brand.id"
										:label="brand.id">
									{{brand.name}}
								</el-radio>
							</el-radio-group>

						</el-tab-pane>
						<el-tab-pane label="FGHJK" name="FGHJK">
							<el-radio-group v-model="options.selectBrand">
								<el-radio
										v-for="brand in BrandsData.FGHJK"
										:key="brand.id"
										:label="brand.id">
									{{brand.name}}
								</el-radio>
							</el-radio-group>
						</el-tab-pane>
						<el-tab-pane label="LMNPQ" name="LMNPQ">
							<el-radio-group v-model="options.selectBrand">
								<el-radio
										v-for="brand in BrandsData.LMNPQ"
										:key="brand.id"
										:label="brand.id">
									{{brand.name}}
								</el-radio>
							</el-radio-group>
						</el-tab-pane>
						<el-tab-pane label="RSTWX" name="RSTWX">
							<el-radio-group v-model="options.selectBrand">
								<el-radio
										v-for="brand in BrandsData.RSTWX"
										:key="brand.id"
										:label="brand.id">
									{{brand.name}}
								</el-radio>
							</el-radio-group>
						</el-tab-pane>
						<el-tab-pane label="YZ" name="YZ">
							<el-radio-group v-model="options.selectBrand">
								<el-radio
										v-for="brand in BrandsData.YZ"
										:key="brand.id"
										:label="brand.id">
									{{brand.name}}
								</el-radio>
							</el-radio-group>
						</el-tab-pane>
					</el-tabs>
				</div>
			</div>
			<div class="product-attr-wrap">
				<div class="tips-container">
					<span class="tips">请选择商品型号（单选）</span>
				</div>
				<div class="product-attr-container">
					<el-radio-group v-model="options.selectMode">
						<el-radio
								:label="mode.id"
								:key="mode.key"
								v-for="mode in ModelsData">{{mode.name}}
						</el-radio>
					</el-radio-group>
				</div>
			</div>
			<div class="product-attr-wrap">
				<div class="tips-container">
					<span class="tips">请选择花纹（单选）</span>
				</div>
				<div class="product-attr-container">
					<el-radio-group v-model="options.selectStripe">
						<el-radio
								v-for="stripe in StripesData"
								:key="stripe.id"
								:label="stripe.id">{{stripe.name}}
						</el-radio>
					</el-radio-group>
				</div>
			</div>
			<div class="product-info-container">
				<div class="product-base-info-container">
					<div class="product-input-container">
						<el-form ref="form" :model="options" label-width="80px">
							<el-form-item label="单价/条">
								<el-input v-model="options.price" style="width: 200px"></el-input>
								<span>元</span>
							</el-form-item>
							<el-form-item label="状态">
								<el-radio-group v-model="options.status">
									<el-radio :label="1">上架</el-radio>
									<el-radio :label="2">下架</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<div class="product-avatar-container">
					<div class="product-avatar-upload-container">
						<el-upload
								:headers="{token:user.token}"
								class="avatar-uploader"
								:on-success="uploadHeaderSuccess"
								:action="API.upload"
								:show-file-list="false">
							<img v-if="options.imageUrl" :src="options.imageUrl" class="avatar">
							<div v-if="!options.imageUrl" class="avatar-uploader-icon">点击上传商品图片</div>
						</el-upload>
					</div>
				</div>
			</div>
			<div class="confirm-btn">
				<el-button type="danger" @click="addProduct">确定</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import misBreadcrumb from '@/components/breadcrumb'
	import misTab from '@/components/tab'
	import misTitle from '@/components/title'
	import { getInitial } from '@/utils/utils'
	import { mapState } from 'vuex'

	export default {
		components: {
			misBreadcrumb,
			misTab,
			misTitle
		},

		data() {
			return {
				tabData: [
					{key: 'list', title: '商品列表'},
					{key: 'config', title: '业务配置'}
				],

				currentTab: 'list',            // 当前tab页面的  config '业务配置'  list '商品列表'

				productStatus: [
					{label: '所有', value: ''},
					{label: '上架', value: '1'},
					{label: '已下架', value: '2'},

				],

				searchParams: {
					productStatus: ''
				},

				TireListData  : [],
				isAdd         : true,        // 判断用户是 添加新产品还是 编辑已有产品
				productNameTab: 'ABCDE',     // 轮胎品牌 tab 切换
				productInfo   : {
					productBrand: '',
					productModel: '',
					pattern     : ''
				},
				options       : {
					selectBrand : '',          // 选中的轮胎品牌
					selectMode  : '',           // 选中的轮胎型号
					selectStripe: '',         // 选中的轮胎花纹
					imageUrl    : '',             // 图片
					status      : '',
					price       : '',
					id          : '',         // 商品id 编辑产品时才有

				},     // 商品选中配置属性
				ModelsData    : [],         //  根据轮胎品牌 获取的 轮胎型号
				StripesData   : [],         //  轮胎花纹
				BrandsData    : {           //  品牌
					ABCDE: [],
					FGHJK: [],
					LMNPQ: [],
					RSTWX: [],
					YZ   : []
				},
				TireModelsCache:{},             // 轮胎型号数据缓存
			}
		},

		methods : {
			tabClick(key) {
				this.currentTab = key
			},

			// 获取已经配置的轮胎业务列表
			getBusinessList(params){

				let config = {
					pageNum    : 1,
					pageSize   : 10,
					tire_status: '',
				}

				Object.assign(config, params)

				this.$http.get(this.API.businessList, config).then(data => {
					this.TireListData = data.data.allrow

				})
			},
			// 上架商品
			putOnItem(id){
				this.handleProduct(id, 1)
			},
			// 下架商品
			soldOutItem(id){
				this.handleProduct(id, 2)
			},
			// 删除商品
			delItem(id){
				this.handleProduct(id, 3)
			},
			handleProduct(id, status){
				this.$http.post(this.API.editBusiness, {id: id, mode: 'tire_status', status: status}).then(res => {

					this.$showSuccess(res.data.msg)
					// 重新获取列表
					this.getBusinessList()
				})
			},
			// 编辑商品
			editItem(item){

				// 切换到业务配置页面
				this.currentTab = 'config'
				// 更改tab组件 的 active状态
				this.$refs.tab.tabClick('config')
				// 取出商品名字 判断 并修改产品 快捷入口
				let initial = getInitial(item.brand_name)

				switch (true) {
					case 'ABCDE'.indexOf(initial) > -1:
						this.productNameTab = 'ABCDE'
						break

					case 'FGHJK'.indexOf(initial) > -1:
						this.productNameTab = 'FGHJK'
						break

					case 'LMNPQ'.indexOf(initial) > -1:
						this.productNameTab = 'LMNPQ'
						break

					case 'RSTWX'.indexOf(initial) > -1:
						this.productNameTab = 'RSTWX'
						break

					case 'YZ'.indexOf(initial) > -1:
						this.productNameTab = 'YZ'
						break
				}

				// 将商品 属性 赋值给options
				this.options.selectBrand  = item.brand_id
				this.options.selectMode   = item.model_id
				this.options.selectStripe = item.stripe_id
				this.options.imageUrl     = item.img || ''
				this.options.status       = Number(item.status)
				this.options.price        = item.price
				this.options.id           = item.id

				// 修改 页面类型为 编辑商品
				this.isAdd = false

			},
			// 图片上传成功后
			uploadHeaderSuccess(res, file){
				if (res.status == 1) {
					this.options.imageUrl = file.url;

				}
			},
			addProduct(){

				// 添加之前保证属性都有值
				let isEmpty = Object.keys(this.options).every(key => {
					// 图片可 id 也可以为空
					if (key === 'imageUrl' || key === 'id') {
						return true
					}

					return !!this.options[key]
				})
				if (!isEmpty) {
					this.$message({
						              showClose: true,
						              message  : '请输入完整的商品信息',
						              type     : 'warning'
					              });
					return
				}
				this.$http.post(this.isAdd ? this.API.addBusiness : this.API.editBusiness, {
					tire_id  : this.isAdd ? '' : this.options.id,   //产品id
					brand_id : this.options.selectBrand,     //品牌id
					mode     : 'tire',                       //模式 默认为tire
					model_id : this.options.selectMode,      //型号ID
					price    : this.options.price,           // 价格
					status   : this.options.status,          // 上架状态 1上架 0 下架
					stripe_id: this.options.selectStripe,   // 条纹类型id
					img      : this.options.imageUrl,
				}).then( res => {

					// 将页面状态 默认 改为 添加商品
					this.isAdd = true

					// 初始化页面属性
					Object.keys(this.options).forEach(item => {
						this.options[item] = ''
					})

					// 通知
					this.$notify({
						             title  : '成功',
						             message: res.data.msg,
						             type   : 'success'
					             });
					// 重新获取列表
					this.getBusinessList()
				})
			},
			/**
			 * 获取轮胎品牌
			 */
			getTireBrands(){
				this.$http.get(this.API.getTireBrands).then(res => {
					this.brandFilter('Brands', res.data)
				})
			},
			/**
			 * 获取轮胎型号
			 */
			getTireModels(brandId){
				if(this.TireModelsCache[brandId]){
					this.ModelsData = this.TireModelsCache[brandId]
				}else {
					this.$http.get(this.API.getTireModels, {brand_id: brandId}).then(data => {
						 this.TireModelsCache[brandId] = this.ModelsData = data.data
					})
				}


			},
			/**
			 * 获取轮胎花纹
			 */
			getStripes(){
				this.$http.get(this.API.getStripes).then(data => {
					this.StripesData = data.data
				})
			},
			/**
			 * 对品牌进行拼音转换
			 * @param key
			 * @param data
			 */
			brandFilter(key, data) {
				data.forEach(item => {
					let oldName    = 'name',
					    newName    = 'name',
					    filterData = key + 'Data'
					let initial    = getInitial(item[oldName])
					switch (true) {
						case 'ABCDE'.indexOf(initial) > -1:
							this[filterData].ABCDE.push(item)
							break

						case 'FGHJK'.indexOf(initial) > -1:
							this[filterData].FGHJK.push(item)
							break

						case 'LMNPQ'.indexOf(initial) > -1:
							this[filterData].LMNPQ.push(item)
							break

						case 'RSTWX'.indexOf(initial) > -1:
							this[filterData].RSTWX.push(item)
							break

						case 'YZ'.indexOf(initial) > -1:
							this[filterData].YZ.push(item)
							break
					}
				})
			},
		},
		computed: {
			...mapState([
				            'user'
			            ]),
		},
		created(){
			this.getBusinessList()
			this.getTireBrands()
			this.getStripes()
		},
		watch   : {
			'options.selectBrand'(newVal){
				// 当品牌发生变化 重新获取轮胎型号
				newVal && this.getTireModels(newVal)

			},
			'options.selectMode'(newVal){
				console.log(newVal)
			},
			currentTab(newVal){
				if (newVal === 'list') {
					// 清空选中值
					Object.keys(this.options).forEach(key => {
						this.options[key] = ''
					})
				}
			}
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

	.total-score-container {
		background-color: #fff;
		padding: 40px 60px;
	}

	.switch-container {
		padding: 30px;
		background-color: #fff;
	}

	.product-container {

		.tips-container {
			padding: 20px;
			background-color: #f7f8fa;
			margin: 2px 0;
			font-size: 14px;
		}

		.product-attr-container {
			padding: 20px;
			background-color: #fff;
		}
	}

	.product-info-container {
		.clearfix;
		margin-top: 20px;
	}

	.product-base-info-container {
		width: 69%;
		float: left;
	}

	.product-avatar-container {
		width: 30%;
		float: right;
	}

	.product-input-container,
	.product-avatar-upload-container {
		margin-top: 2px;
		height: 260px;
		background-color: #fff;
		padding-top: 30px;
	}

	.product-avatar-upload-container {
		text-align: center;
	}

	.avatar-uploader {
		display: inline-block;
		border: 1px solid #bebebe;
		overflow: hidden;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #e6e6e6;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #20a0ff;
	}

	.avatar-uploader-icon {
		width: 178px;
		height: 178px;
		padding-top: 116px;
		color: #bebebe;
		font-size: 14px;
		background: url(/static/image/Upload.png) center 40px no-repeat;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>