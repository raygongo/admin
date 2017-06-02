<template>
	<div class="mis-rate">
		<img src="./star_active.png" v-for="i in rate">
		<img src="./star_default.png" v-for="j in 5-rate">
	</div>
</template>

<script>
	export default {
		props: {
			rate: Number
		}
	}
</script>

<style lang="less" scoped>
	.mis-rate {
		img {
			width: 20px;
			display: inline-block;

			&:not(:last-child) {
				margin-right: 5px;
			}
		}
	}
</style>