<template>
	<div ref="content">
		<el-row style="margin-bottom:20px">
			<!-- 	<el-col align="left" style="width:70px;float:left;margin-right:15px;">
				<el-button class="blueBtn" @click="add">
					新建
				</el-button>
			</el-col> -->
			<el-col align="right" style="width:70px;float:right;margin-left:15px;">
				<el-button class="blueBtn" @click="returnPage">
					返回
				</el-button>
			</el-col>
			<!-- 	<el-col :span="3" style="float:right;">
				<el-input v-model="formInline.searchValue" placeholder="请输入关键性文字" />
			</el-col> -->
		</el-row>
		<div id="appversionmanageTable" ref="appversionmanageTable">
			<el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#eef1f6' }"
				 @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" />
				<el-table-column type="index" label="序号" align="center" />
				<el-table-column prop="scheduleName" label="课表" align="center">
					<template slot-scope="scope">
						<el-button class="blueBtn" @click="courseDetails(scope.row.scheduleId,0)">
							{{scope.row.scheduleName}}
						</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="classTimeName" label="时间表" align="center">
					<template slot-scope="scope">
						<el-button class="blueBtn" @click="courseDetails(scope.row.classTimeId,1)">
							{{scope.row.classTimeName}}
						</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="courseNum" label="课程" align="center">
					<template slot-scope="scope">
						<el-button class="blueBtn" @click="courseDetails(scope.row.scheduleId,2)">
							{{scope.row.courseNum}}
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
		<!--新建弹窗-->
		<Modal v-model="addModal" :mask-closable="false" height="200" title="对话框标题" class-name="vertical-center-modal"
			:width="taostIndex==2?960:560">
			<modal-header slot="header" :content="addId" />
			<template>
				<div class="cursor" v-if="taostIndex==0">
					<p>课表名称：{{cursorData.scheduleName}}</p>
					<p>上课时间：{{cursorData.classTimeName}}</p>
					<p>第一周的第一天：{{cursorData.firstDay}}</p>
					<p>一天课程节数：{{cursorData.courseNumber}}</p>
					<p>学期周数：{{cursorData.semesterWeeks}}</p>
				</div>
				<div class="times" v-if="taostIndex==1">
					<p>时间表名称：{{tableDatas.classTimeName}}</p>
					<p><span class="titles">各节时间：</span><span class="contents">
							<el-table :data="tableDatas.subList" style="width: 100%,border-radius:5px;"
								:show-header="false">
								<el-table-column prop="name" label="节数" align="center" width="180">
									<template slot-scope="scope">
										<div>第{{scope.row.name}}节</div>
									</template>
								</el-table-column>
								<el-table-column prop="startTime" label="时间" align="center" width="180">
									<template slot-scope="scope">
										<div>{{scope.row.startTime}}-{{scope.row.endTime}}</div>
									</template>
								</el-table-column>
							</el-table>
						</span></p>
				</div>
				<div class="courseNum" v-if="taostIndex==2">
					<el-table :data="courseNumtableDatas" style="width: 100%,border-radius:5px;" :show-header="true">
						<el-table-column type="index" label="序号" align="center" width="80" />
						<el-table-column prop="courseName" label="课程名称" align="center" width="180">
						</el-table-column>
						<el-table-column prop="startWeek" label="周数" align="center" width="180">
							<template slot-scope="scope">
								<div>第{{scope.row.startWeek}}-{{scope.row.endWeek}}周 {{types(scope.row.weekStatus)}}</div>
							</template>
						</el-table-column>
						<el-table-column prop="date" label="时间" align="center" width="180">
							<template slot-scope="scope">
								<div>第{{scope.row.startNodes}}-{{scope.row.endNodes}}节</div>
							</template>
						</el-table-column>
						<el-table-column prop="teacher" label="上课教师" align="center">
						</el-table-column>
						<el-table-column prop="classroom" label="教室" align="center">
						</el-table-column>
					</el-table>
				</div>
			</template>
			<div slot="footer" />
		</Modal>
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
				cursorData: {},
				taostIndex: 0,
				courseNumtableDatas: [],
				tableDatas: {},
				addModal: false,
				editModal: false,
				removeModal: false,
				addId: {
					id: 'add',
					title: '添加'
				},
				operailityData: {},
				operailityType: '',
				deleteUrl: '',
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
			console.log(this.$route)
			this.selectDetails( this.$route.params.id)
		},
		mounted() {
			// 页面dom稳定后调用
			// this.$nextTick(function() {
			// 	// 初始表格高度及分页设置
			// 	this.setTableDynHeight()
			// 	// 为窗体绑定改变大小事件
			// 	let Event = Util.events
			// 	Event.addHandler(window, 'resize', this.setTableDynHeight)
			// })
		},
		methods: {
			types(e){
				if(e==0){
					return '全周'
				}else if(e==1){
					return '单周'
				}else if(e==2){
					return '双周'
				}
			},
			courseDetails(e, index) {
				this.addModal = true;
				this.taostIndex = index;
				if (index == 0) {
					//执行单个课表查询
					this.addId.title = "课表"
					this.selectSingle(e)
				} else if (index == 1) {
					this.addId.title = "时间表"
					//执行单个时间表查询
					this.selectTimes(e)
				} else if (index == 2) {
					this.addId.title = "课程"
					//执行单个课程查询
					this.selectCursor(e)
				}
			},
			cancel(targer) {
				console.log(targer, 'targer')
				this[targer + 'Modal'] = false
			},
			returnPage() {
				this.$router.push('/manage/course')
			},
			//单个课程查询
			selectCursor(e) {
				let detailsList = {
					ajaxSuccess: 'selectCursorData',
					ajaxParams: {
						url: '/knowledge/syllabusCourseManagement/list',
						method: 'get',
						params: {
							scheduleId: e
						},
					}
				}
				this.ajax(detailsList)
			},
			selectCursorData(res) {
				console.log(res, '课程数据')
				this.courseNumtableDatas=res.data;
			},
			//单个时间表查询
			selectTimes(e) {
				let detailsList = {
					ajaxSuccess: 'selectTimesData',
					ajaxParams: {
						url: '/knowledge/syllabusClassTime/get/' + e,
						method: 'get'
					}
				}
				this.ajax(detailsList)
			},
			selectTimesData(res) {
				console.log(res, '数据')
				this.tableDatas = res.data;
			},
			//单个课表查询
			selectSingle(e) {
				let detailsList = {
					ajaxSuccess: 'selectSingleData',
					ajaxParams: {
						url: '/knowledge/syllabusScheduleManagement/get/' + e,
						method: 'get'
					}
				}
				this.ajax(detailsList)
			},
			selectSingleData(res) {
				console.log(res, '数据')
				this.cursorData = res.data;
			},
			//查看课表详情
			selectDetails(e) {
				let detailsList = {
					ajaxSuccess: 'selectData',
					ajaxParams: {
						url: '/knowledge/syllabusScheduleStatistics/back/schedule/' + e,
						method: 'get',
						params: {
							pageNo: 1,
							pageSize: 20,
							searchValue: ""
						}
					}
				}
				this.ajax(detailsList)
			},
			selectData(res) {
				console.log(res, '数据')
				let data = res.data
				let that = this
				that.tableData = res.data.list
				this.listTotal = data.total || 0
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
				// this.dynamicHt = '100vh'
			},
			getYMDHMS(timestamp) {
				let time = new Date(timestamp)
				console.log(time)
				let year = time.getFullYear()
				let month = time.getMonth() + 1
				let date = time.getDate()
				let hours = time.getHours()
				let minute = time.getMinutes()
				let second = time.getSeconds()

				if (month < 10) {
					month = '0' + month
				}
				if (date < 10) {
					date = '0' + date
				}
				if (hours < 10) {
					hours = '0' + hours
				}
				if (minute < 10) {
					minute = '0' + minute
				}
				if (second < 10) {
					second = '0' + second
				}
				return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
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

	.courseNum {
		margin-bottom: 60px;
		padding: 0 30px;
	}

	.cursor {
		margin-bottom: 60px;
		padding: 0 30px;
	}

	.times {
		margin-bottom: 60px;
		padding: 0 30px;
	}

	.times p {
		font-family: '微软雅黑';
		font-weight: 400;
		font-style: normal;
		font-size: 16px;
		color: #000000;
		margin-top: 30px;
	}

	.cursor p {
		font-family: '微软雅黑';
		font-weight: 400;
		font-style: normal;
		font-size: 16px;
		color: #000000;
		margin-top: 30px;
	}

	.times .titles {
		float: left;
		font-family: '微软雅黑';
		font-weight: 400;
		font-style: normal;
		font-size: 16px;
		color: #000000;
	}

	.contents {
		border: 1px solid #c0c0c0;
		border-radius: 5px;
		padding: 5px;
		height: 300px;
		overflow-y: auto;
	}
</style>