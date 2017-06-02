<template>
	<div>
		<div class="breadcrumb-label">当前位置：</div>
		<div class="breadcrumb-container">
			<el-breadcrumb :separator="separator">
				<el-breadcrumb-item :to="item.to" v-for="item in attr" :key="item.name">{{ item.name }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			separator: String,
			attr: Array
		}
	}
</script>

<style lang="less" scoped>
	.breadcrumb-label {
		display: inline-block;
		font-size: 13px;
	}

	.breadcrumb-container {
		display: inline-block;
		vertical-align: middle;
	}
</style>