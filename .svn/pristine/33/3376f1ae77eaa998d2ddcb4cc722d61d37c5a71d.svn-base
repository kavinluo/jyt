<template>
	<div ref="content">
		<el-row style="margin-bottom:20px">
			<!-- 	<el-col align="left" style="width:70px;float:left;margin-right:15px;">
				<el-button class="blueBtn" @click="add">
					新建
				</el-button>
			</el-col> -->
			<el-col align="right" style="width:70px;float:right;margin-left:15px;">
				<el-button class="blueBtn" @click="search">
					搜索
				</el-button>
			</el-col>
			<el-col :span="3" style="float:right;">
				<el-input v-model="formInline.searchValue" placeholder="请输入关键性文字" />
			</el-col>
		</el-row>
		<div id="appversionmanageTable" ref="appversionmanageTable">
			<el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#eef1f6' }"
				 @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" />
				<el-table-column type="index" label="序号" align="center" />
				<el-table-column prop="nickname" label="用户名称" align="center" />
				<el-table-column prop="mobile" label="用户手机号" align="center" />
				<el-table-column prop="school" label="学校" align="center" />
				<el-table-column prop="institute" label="院系" align="center" />
				<el-table-column prop="scheduleNum" label="课表数量" align="center" />
				<el-table-column prop="classTimeNum" label="时间表数量" align="center" />
				<el-table-column prop="sharedNum" label="分享次数" align="center" />
				<!-- 	<el-table-column prop="updateTime" label="更新时间" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.updateTime === null">-</span>
						<span v-if="scope.row.updateTime !== null">{{ scope.row.updateTime | filterTime }}</span>
					</template>
				</el-table-column> -->
				<el-table-column prop="updateTime" label="操作" align="center">
					<template slot-scope="scope">
						<el-button class="blueBtn" @click="selectDetails(scope.row.creator)">
							查看
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin: 10px">
				<div style="float: right">
					<el-pagination id="el-pagination" :page-sizes="myPages.pageSizes" :page-size="myPages.pageSize"
						layout="total, sizes, prev, pager, next, jumper" :total="listTotal"
						 />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	/* 当前组件必要引入*/
	let Util = null
	import api from './api'

	export default {
		components: {},
		data() {
			return {
				api,
				formInline: {
					searchValue: ''
				},
				operailityData: {},
				multipleSelection: [],
				listTotal: 0,
				tableData: [],
				dynamicHt: 300,
				// 初始化加载页面信息
				listMessTitle: {
					ajaxSuccess: 'updateListData',
					ajaxParams: {
						url: api.listPage.path,
						method: api.listPage.method,
						params: {}
					}
				}
			}
		},
		created() {
			this.init()
		},
		mounted() {
			// 页面dom稳定后调用
			this.$nextTick(function() {
				// 初始表格高度及分页设置
				this.setTableDynHeight()
				// 为窗体绑定改变大小事件
				let Event = Util.events
				Event.addHandler(window, 'resize', this.setTableDynHeight)
			})
		},
		methods: {
			//查看课表详情
			selectDetails(e) {
				this.$router.push({path:'/manage/courseDetails/'+e})
			},
			selectData(res) {
				console.log(res)
			},
			// 初始化请求列表数据
			init() {
				Util = this.$util
				// ajax请求参数设置
				this.myPages = Util.pageInitPrams
				this.queryQptions = {
					params: {
						pageNo: 1,
						pageSize: Util.pageInitPrams.pageSize
					}
				}
				this.setTableData()
			},
			// 初始化加载列表数据
			setTableData() {
				this.listMessTitle.ajaxParams.params = Object.assign(
					this.listMessTitle.ajaxParams.params,
					this.queryQptions.params,
					this.formInline
				)
				this.ajax(this.listMessTitle)
			},
			// 表格数据列表
			updateListData(res) {
				let data = res.data
				let that = this
				that.tableData = that.addIndex(data.list)
				this.listTotal = data.total || 0
			},
			search() {
				this.setTableData()
			},
			add() {},
			handleSelectionChange(val) {
				this.multipleSelection = val
			},
			isSelected() {
				let len = this.multipleSelection.length
				console.log(this.multipleSelection, 'len')
				let flag = true
				if (len === 0) {
					this.showMess('请选择数据')
					flag = false
				} else if (len > 1) {
					this.showMess('仅选择一条数据')
					flag = false
				}
				return flag
			},
			subCallback(target, title, updata) {
				this.cancel(target)
				if (title) {
					this.successMess(title)
				}
				if (!updata) {
					this.setTableData()
				}
			},
			// 设置表格及分页的位置
			setTableDynHeight(n) {
				// 操作dom
				let content = this.$refs.content
				let parHt = content.parentNode.offsetHeight
				let appversionmanageTable = this.$refs.appversionmanageTable
				let paginationHt = 60
				this.dynamicHt = parHt - appversionmanageTable.offsetTop - paginationHt
			}
		}
	}
</script>
<style scoped>
	.box-select-btn {
		width: 92px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		background: inherit;
		background-color: rgba(11, 138, 236, 1);
		border: none;
		border-radius: 2px;
		-moz-box-shadow: none;
		-webkit-box-shadow: none;
		box-shadow: none;
		font-family: '微软雅黑';
		font-weight: 400;
		font-style: normal;
		font-size: 14px;
		color: #FFFFFF;
	}
</style>