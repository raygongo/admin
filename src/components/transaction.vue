<template>
	<div class="transaction-box">
		<div class="transaction-icon">
			<img :src="icon">
		</div>
		<div class="transaction-ctrl">
			<div class="transaction-label">{{ title }}</div>
			<div class="transaction-val" :style="{color: color}">{{ val }}</div>
			<div class="transaction-btn" @click="btnClick" :style="{backgroundColor: color}">{{ btn }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			icon: String,
			title: String,
			val: [String, Number],
			to: [String, Object],
			btn: String,
			color: String
		},

		methods: {
			btnClick() {
				if (this.to) {
					this.$router.push(this.to)
				} else {
					this.$emit('click')
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.transaction-box {
		width: 300px;
		height: 150px;
		padding: 40px;
		background-color: #f6f7f9;
		border: 1px solid #efeff1;

		.transaction-icon {
			float: left;
			width: 80px;
			height: 80px;
			border-radius: 50%;

			img {
				width: 80px;
				height: 80px;
				border-radius: 50%;
			}
		}

		.transaction-ctrl {
			float: right;
			text-align: right;
			font-size: 14px;

			.transaction-val {
				color: #3c8ad4;
				text-align: right;
				margin-top: 5px;
				font-size: 18px;
			}

			.transaction-btn {
				display: inline-block;
				width: 64px;
				height: 24px;
				line-height: 24px;
				text-align: center;
				color: #fff;
				font-size: 12px;
				margin-top: 10px;
				cursor: pointer;
			}
		}
	}
</style>