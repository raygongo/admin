<template>
	<div>
		<div class="top-container">
			<div class="breadcrumb-container">
				<mis-breadcrumb separator="-" :attr="[{name: '公告', to: '/noticeList'}, {name: '公告列表'}]"></mis-breadcrumb>
			</div>
		</div>
		<div class="table-container">
			<el-table style="width: 100%" :data="noticeData.data">
				<el-table-column
        			type="index"
        			label="序号"
        			width="80"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="theme"
        			label="公告主题"
        			min-width="280"
        			align="center">
      			</el-table-column>
      			<el-table-column
        			prop="time"
        			label="时间"
        			min-width="180"
        			align="center">
      			</el-table-column>
      			<el-table-column
					label="操作"
					min-width="100"
					align="center"
					fixed="right"
					inline-template>
					<div>
						<el-button size="small" @click="routerPush('noticeDetail', {id: row.id})">详情</el-button>
					</div>
				</el-table-column>
			</el-table>
			<div class="page-container">
				<el-pagination
					:page-size="10"
					layout="total, prev, pager, next"
					:total="noticeData.total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import misBreadcrumb from '@/components/breadcrumb'

	export default {
		data() {
			return {
				noticeData: {
					total: 1000,
					data: [
					{theme: '货车兄弟上市了！', time: '2017-05-12', id: '1'},
					{theme: '货车兄弟上市了！', time: '2017-05-12', id: '2'},
					{theme: '货车兄弟上市了！', time: '2017-05-12', id: '3'},
					{theme: '货车兄弟上市了！', time: '2017-05-12', id: '4'},
					{theme: '货车兄弟上市了！', time: '2017-05-12', id: '5'},
					{theme: '货车兄弟上市了！', time: '2017-05-12', id: '6'}
					]
				}
			}
		},

		components: {
			misBreadcrumb
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
</style>