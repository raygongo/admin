<template>
	<div>
		<ul class="table-tab">
			<li :class="{'tab-active': currentTab === item.key}" @click="tabClick(item.key)" v-for="item, index in data">{{ item.title }}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: ''
			}
		},

		props: {
			data: Array,
			route:{
				type:Boolean,
				default:false
			}
		},
		created() {
			if(this.route){
				this.currentTab = this.$router.currentRoute.name
			}else {
				this.currentTab = this.data[0].key
			}

		},

		methods: {
			tabClick(key) {
				this.currentTab = key
				this.$emit('click', key)
			}
		}
	}
</script>

<style lang="less" scoped>
	.table-tab {
		padding: 20px;

		li {
			display: inline-block;
			font-size: 14px;
			padding: 0 10px;
			cursor: pointer;
		}

		.tab-active {
			color: #fa5151;
		}
	}
</style>