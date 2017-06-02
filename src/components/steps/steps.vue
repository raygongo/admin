<template>
	<div style="display: inline-block">
		<div class="guide-list">

			<div class="guide-step " :class="{complete:guide.state}" v-for="(guide,index) in guideContent">
	            <span class="guide-item " @click="goLink(guide.state,guide.link)">
		            <i class="guide-icon "
	                   :class="[ guide.state ? 'el-icon-circle-check':'el-icon-warning' ]"></i>
	                {{guide.label}}
	            </span>
				<div class="guide-line" v-if="!(index == guideContent.length-1)"></div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	/**
	 * 传入 一个数组对象 {
	 *           label,  //标签显示内容  string
	 *           state ,  //状态         bool
	  *           link   // 链接         string
	  *           }
	 */
	export default{
		props   : {
			guideContent: Array
		},
		data(){
			return {}
		},
		methods : {
			/**
			 * 跳转到对应引导页面
			 * @param state  状态
			 * @param link   页面
			 */
			goLink(state, link){
				try {
					state || this.$router.push({path:link})
				}
				catch (err) {
					console.warn('页面路由配置错误')
				}

			}
		},
		computed: {
			guideStateIconClass(){
				let isSuccess = this.guideContent.every((item) => {
					return item.state;
				})
				if (isSuccess)
					return 'el-icon-circle-check';
				else {
					return 'el-icon-warning'
				}
			}
		}
	}
</script>
<style lang="less">
	.guide-list {
		display: inline-block;
		margin-left: 20px;
		text-align: left;
		.guide-step {
			display: inline-block;
			width: 200px;
			position: relative;
			.guide-item {
				cursor: pointer;
				padding-right: 20px;
				display: inline-block;

				.guide-icon {
					display: inline-block;
					vertical-align: middle;
					font-size: 30px;
					margin-right: 15px;
				}
			}
			.guide-line {
				top: 50%;
				transform: translateY(-50%);
				right: 20px;
				position: absolute;
				height: 0;
				width: 50px;
				border: 1px dashed #8b8787;

			}

		}

		.complete {
			color: #13ce66;
			border-bottom-color: #13ce66;
		}

		.last {
			width: auto;
		}
	}
</style>
