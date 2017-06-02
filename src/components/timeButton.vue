<template>

	<div style="display: inline-block;">
		<el-button
				style="font-size: 12px;"
				:type="type"
				type="primary"
				:disabled="disabled">
			<span v-if="!value">{{text}}</span>
			<span v-else>{{waitText}}{{second}}s</span>
		</el-button>
	</div>
</template>
<script type="text/ecmascript-6">
	/**
	 * <time-button
	 *  text="确定"         //按钮内容
	 *  :time="60"          //倒计时 时间  秒
	 *  type="success"      //参考elementui button type
	 *  waitText="重新获取"  //禁用按钮式 显示内容
	 *  @click=""
	 * >
	 * </time-button>
	 */
	export default{
		props   : {
			text    : {
				type   : String,
				default: '确定'
			},
			time    : {
				type   : Number,
				default: 0
			},
			type    : {
				type: String,
			},
			waitText: {
				type   : String,
				default: '重新获取'
			},
			value:{
				type:Boolean,
				default:false
			}

		},
		data(){
			return {
				shouldClick: true,
				second     : 0
			}
		},
		computed: {
			disabled(){
				return !this.shouldClick
			},
		},
		methods : {
			// 按钮点击事件
			clickButton(){
				//1.判断是否能够点击 shouldClick 为 true
				if (this.shouldClick) {
					this.shouldClick = false
				}
				//2.判断time是否有值 如果 有值 则执行 定时操作 进行减值

			},
			minusSecond(){

				let timeID = setInterval(() => {
					this.second && (this.second -= 1)
					if (this.second === 0) {
						this.$emit('input',false)
						this.shouldClick = true
						this.second      = this.time;
						clearInterval(timeID)
					}
				}, 1000)
			}
		},
		watch:{
			value:function(newValue,old){
				console.log(newValue)
				if(newValue){
					this.second      = this.time
					this.minusSecond()
				}
			}
		}
	}
</script>
<style lang="less">

</style>
