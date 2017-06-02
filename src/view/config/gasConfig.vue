<template>
	<div>
		<div class="top-container">
			<div class="breadcrumb-container">
				<mis-breadcrumb separator="-" :attr="[{name: '业务配置', to: '/gasConfig'}, {name: '气价设置'}]"></mis-breadcrumb>
			</div>
		</div>
		<div class="gas-price-container">
			<el-form ref="gasPriceForm" :model="gasInfo" label-width="80px">
				<el-form-item label="LNG：" class="gas-price-form-item">
					<el-input v-model="gasInfo.price" style="width: 200px"></el-input>
					<span>元/公斤</span>
				</el-form-item>
			</el-form>
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
				gasInfo: {
					price: ''
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

	.gas-price-container {
		padding: 50px 30px;
		background-color: #fff;

		.gas-price-form-item {
			margin-bottom: 0;
		}
	}
</style>