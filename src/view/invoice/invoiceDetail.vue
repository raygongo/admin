<template>
	<div>
		<div class="top-container">
			<div class="breadcrumb-container">
				<mis-breadcrumb separator="-" :attr="[{name: '发票管理', to: '/invoice'}, {name: '发票处理'}]"></mis-breadcrumb>
			</div>
		</div>
		<el-form ref="form" label-width="80px">
			<el-form-item label="发票类型" class="form-box">{{ invoiceData.invoiceType }}</el-form-item>
			<el-form-item label="收货人" class="form-box">{{ invoiceData.consignee }}</el-form-item>
			<el-form-item label="发票金额" class="form-box">{{ invoiceData.invoiceAmount }}</el-form-item>
			<el-form-item label="手机号码" class="form-box">{{ invoiceData.mobile }}</el-form-item>
			<el-form-item label="公司名称" class="form-box">{{ invoiceData.company }}</el-form-item>
			<el-form-item label="是否自取" class="form-box">{{ invoiceData.getBySelf }}</el-form-item>
			<el-form-item label="开票地址" class="form-box">{{ invoiceData.address }}</el-form-item>
			<el-form-item label="开户行" class="form-box">{{ invoiceData.bank }}</el-form-item>
			<el-form-item label="处理状态" class="form-box">{{ invoiceData.status }}</el-form-item>
		</el-form>
		<div class="confirm-btn">
			<el-button type="danger">提交</el-button>
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
				invoiceData: {
					invoiceType: '增值税普票',
					consignee: '练俊廷',
					invoiceAmount: '1990.00',
					mobile: '13808204594',
					company: '青桔',
					getBySelf: '需邮寄',
					address: '成都市高新区天府三街腾讯大厦',
					bank: '成都银行',
					status: '待处理'
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

	.form-box {
		display: inline-block;
		width: 49%;
	}
</style>