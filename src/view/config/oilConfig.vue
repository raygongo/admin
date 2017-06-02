<template>
	<div>
		<div class="top-container">
			<div class="breadcrumb-container">
				<mis-breadcrumb separator="-"
				                :attr="[{name: '业务配置', to: '/oilConfig'}, {name: '油价设置'}]"></mis-breadcrumb>
			</div>
		</div>
		<div class="oil-price-container">
			<el-form ref="oilPriceForm" :model="oilInfo" label-width="80px">
				<el-form-item
						label="柴油："
						class="oil-price-form-item"
						prop="price">
					<el-input v-model="oilInfo.price"
					          style="width: 200px"
					          @focus="lastValue = oilInfo.price"
					          @blur="saveOilPrice"></el-input>
					<span>元/升</span>
				</el-form-item>
			</el-form>
		</div>
		<div class="oil-gun-title">
			<mis-title title="油枪号管理">
				<el-button style="margin-left: 30px" @click="addOilGun">＋添加油枪</el-button>
			</mis-title>
		</div>
		<div class="oil-gun-list-container">
			<el-form ref="oilGunForm" label-width="80px">
				<el-form-item label="油枪号：" class="oil-gun-form-item" v-for="item, index in oilGunList" :key="item.id">
					<el-input
							v-model="item.oil_gun"
							@focus="lastValue = item.oil_gun"
							:disabled="!item.status"
							@blur="updateOilGun(item.status,item.id,item.oil_gun)"
							style="width: 200px"></el-input>
					<el-switch
							v-model="item.status"
							on-color="#13ce66"
							on-text=""
							off-text=""
							@change="changeStatus(item.status,item.id)"
							class="oil-gun-switch">
					</el-switch>
					<a href="javascript:void(0)" class="oil-gun-delete" @click="deleteOilGun(item.id)">删除</a>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import misBreadcrumb from '@/components/breadcrumb'
	import misTitle from '@/components/title'

	export default {
		components: {
			misBreadcrumb,
			misTitle
		},

		data() {
			return {
				lastValue: '',
				oilInfo  : {
					price: '',
				},

				oilGunList: []
			}
		},

		methods: {

			// 添加油枪
			addOilGun() {

				this.$prompt('请输入油枪号', '添加油枪', {
					confirmButtonText: '确定',
					cancelButtonText : '取消',
					inputPattern     : /^[0-9]{1,2}$/,
					inputErrorMessage: '油枪号格式不正确(只能输入2位)'
				}).then(({value}) => {
					this.saveOilGun(value)
				}).catch(() => {

				});
			},

			// 删除该油枪
			deleteOilGun(id) {
				this.$http.post(this.API.editBusiness, {
					mode      : 'oil',
					oil_gun_id: id,
					status    : '2',
				}).then(res => {
					this.$showSuccess(res.data.msg)
					this.getOilData()
				})
			},

			/**
			 * 设置 油 价
			 */
			saveOilPrice(){
				// 油价更改后
				if (this.oilInfo.price !== this.lastValue) {
					this.$http.post(this.API.addBusiness, {
						mode     : 'oil_price',
						oil_price: this.oilInfo.price
					}).then(res => {
						this.$showSuccess(res.data.msg)
						this.oilGunList = res.data.oil_guns
					})
				}
			},

			/**
			 * 获取汽油配置数据
			 */
			getOilData(params){
				let config = {
					mode    : 'oil',
					pageNum : 1,
					pageSize: 10,
				}
				Object.assign(config, params)
				this.$http.get(this.API.businessList, config).then(res => {
					console.log(res.data)
					this.oilInfo.price = res.data.oil_price.price

					res.data.oil_guns.forEach((item, index, arr) => {
						arr[index].status = arr[index].status == '0' ? true : false
						console.log(arr[index].status)
					})

					this.oilGunList = res.data.oil_guns
				})
			},
			/**
			 * 切换油枪状态
			 */
			changeStatus(status, oil_gun_id, oil_gun){

				this.$http.post(this.API.editBusiness, {
					mode      : 'oil',
					oil_gun_id: oil_gun_id,
					status    : status ? '0' : '1',
					oil_gun   : oil_gun ? oil_gun : ''
				}).then(res => {
					this.$showSuccess(res.data.msg)
				})

			},

			/**
			 * 保存油枪
			 */
			saveOilGun(oil_gun){
				if (oil_gun) {
					this.$http.post(this.API.addBusiness, {
						mode: 'oil',
						oil_gun,
					}).then(res => {
						this.$showSuccess(res.data.msg)
						res.data.oil_guns.forEach((item, index, arr) => {
							arr[index].status = arr[index].status == '0' ? true : false
							console.log(arr[index].status)
						})

						this.oilGunList = res.data.oil_guns
					})
				}
			},
			/**
			 * 修改油枪名字
			 */
			updateOilGun(status, oil_gun_id, oil_gun){
				if(this.lastValue != oil_gun){
					this.changeStatus(status, oil_gun_id, oil_gun)
				}
			}
		},
		created(){
			this.getOilData()
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

	.oil-price-container {
		padding: 50px 30px;
		background-color: #fff;

		.oil-price-form-item {
			margin-bottom: 0;
		}
	}

	.oil-gun-title {
		margin-top: 20px;
	}

	.oil-gun-list-container {
		margin-top: 1px;
		padding: 30px 25px;
		background-color: #fff;

		.oil-gun-switch {
			margin: 0 20px;
		}

		.oil-gun-delete {
			color: #000;
		}
	}
</style>