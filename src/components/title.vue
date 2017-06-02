<template>
	<div class="mis-title-container">
		<h2 class="mis-title">{{ title }}</h2>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			title: String
		}
	}
</script>

<style lang="less" scoped>
	.mis-title-container {
		position: relative;
		width: 100%;
		background-color: #fff;
		padding: 30px 25px;

		.mis-title {
			display: inline-block;
			font-size: 20px;
			border-left: 3px solid #d10e17;
			padding-left: 8px;
		}
	}
</style>