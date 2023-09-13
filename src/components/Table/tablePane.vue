<template>
  <div class="table-wrap">
    <Search v-if="Object.keys(searchData).length !== 0" :search-data="searchData" @handle-search="handleSearch" @handle-reset="handleReset" />
    <div class="table-container" v-loading="loading">
      <div v-if="tableData.tool" class="tool">
        <el-button
          v-for="(item) in tableData.tool"
          :key="item.key"
          class="filter-item"
          :style="{'background':item.bgColor,borderColor:item.bgColor}"
          :type="item.type || 'primary'"
          @click="item.handleClick(item.name,$event)"
        >
          {{ item.name }}
        </el-button>
      </div>
      <el-table
        ref="elTable"
        style="width: 100%"
        :data="tableData.data"
        :border="!!tableData.border"
        :stripe="!!tableData.stripe"
        :row-class-name="tableRowClassName"
        :highlight-current-row="!!tableData.currentRow"
        :row-key="getRowKeys"
        :default-sort="tableData.defaultSort"
        v-on="$listeners"
      >
        <!-- 是否开启序号 -->
        <el-table-column
          v-if="tableData.index"
          type="index"
          label="序号"
          width="50"
          align="center"
        />
        <!-- 多选 -->
        <el-table-column
          v-if="tableData.selection"
          type="selection"
          width="55"
          :selectable="isSelectable"
          :reserve-selection="true"
          align="center"
        />
        <!-- radio单选 -->
        <el-table-column
          v-if="tableData.radio"
          width="55"
          align="center"
        >
          <template slot-scope="scope">
            <el-radio v-model="tableRadio" :label="scope.$index" @change="radioChange(scope.$index, scope.row)"><i>&nbsp;</i></el-radio>
          </template>
        </el-table-column>
        <!-- 当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能 -->
        <template v-for="item in tableData.cols">
          <!-- 普通列，适用大部分情况 -->
          <el-table-column
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :fixed="item.fixed"
            :sortable="item.sortable"
            :filters="item.filters"
            :filter-placement="item.filterPlacement"
            :filter-method="item.filterHandler"
            :filter-multiple="item.filterMultiple"
            align="center"
          >
            <template slot-scope="scope">
              <template v-if="item.slot">
                <slot :name="item.prop" :data="scope.row"></slot>
              </template>
              <template v-else>
                <table-render v-if="item.render" :render="item.render" :row="scope.row" :index="scope.$index"></table-render>
                <span v-else>{{ scope.row[item.prop] }}</span>
              </template>
            </template>
          </el-table-column>
        </template>
        <!-- 操作列 -->
        <el-table-column
          v-if="tableData.operation && tableData.operation.btns.length > 0"
          :width="tableData.operation.width"
          :label="tableData.operation.label"
          :fixed="tableData.operation.fixed"
          :show-overflow-tooltip="tableData.operation.overflowTooltip"
          prop="操作"
          align="center"
        >
          <template slot-scope="scope">
            <div
              v-for="item in tableData.operation.btns"
              :key="item.label"
              class="btns"
            >
              <el-button
                :type="item.type"
                :icon="item.icon"
                :size="item.size ? item.size : 'mini'"
                :disabled="item.isDisabled ? item.isDisabled(scope.$index, scope.row) : false"
                @click.native.stop.prevent="item.btnRowClick(scope.$index, scope.row)"
              >
                {{ item.label }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div
        v-if="tableData.pageData"
        class="pagination-box"
        :style="{'text-align': tableData.pageData.align ? tableData.pageData.align : 'right' }"
      >
        <el-pagination
          v-if="tableData.pageData.total > 0"
          :current-page="tableData.pageData.pageNum"
          :page-sizes="tableData.pageData.pageSizes ? tableData.pageData.pageSizes : [10, 20, 30, 40]"
          :page-size="tableData.pageData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.pageData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Search from './search.vue'
import tableRender from './tableRender.vue'
export default {
  name: 'TablePane',
  components: {
    Search,
    tableRender
  },
  props: {
    // 搜索栏
    searchData: {
      type: Object,
      default: () => ({})
    },
    // 加载
    loading: {
      type: Boolean,
      default: false
    },
    // 表格配置数据
    tableData: {
      type: Object,
      default: () => {}
    },
    // 带状态表格 可以通过指定 Table 组件的 row-class-name 属性来为 Table 中的某一行添加 class，表明该行处于某种状态
    tableRowClassName: {
      type: Function,
      default: () => {}
    },
    selectable: {
      type: Function,
      default: res => true
    }
  },
  data () {
    return {
      tableRadio: '',
      getRowKeys (row) {
        return row.id
      }
    }
  },
  mounted () {
    // 解决在ie下el-table-column 设置fixed高度错位问题
    this.$nextTick(() => {
      this.$refs.elTable.doLayout()
    })
  },
  methods: {
    handleSearch (params) {
      this.$emit('handle-search-btn', params)
    },
    handleReset (params) {
      this.$emit('handle-reset-btn', params)
    },
    handleSizeChange (val) {
      this.$emit('handle-size-change', val)
    },
    handleCurrentChange (val) {
      this.$emit('handle-current-change', val)
    },
    // radio单选事件
    radioChange (index, row) {
      this.$emit('cell-radio-change', index, row)
    },
    // 表格单选
    highlightCurrentChange (val) {
      this.$emit('highlight-current-change', val)
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange (row) {
      this.$emit('handle-selection-change', row)
    },
    // 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选
    isSelectable (row, index) {
      return this.selectable(row, index)
    },
    // 当表格的排序条件发生变化的时候会触发该事件{ column, prop, order }
    sortChange (column, prop, order) {
      this.$emit('sort-change', column, prop, order)
    },
    // 当用户手动勾选数据行的 Checkbox 时触发的事件	selection, row
    select (selection, row) {
      this.$emit('select', selection, row)
    },
    // 当用户手动勾选全选 Checkbox 时触发的事件	selection
    selectAll (selection) {
      this.$emit('select-all', selection)
    },
    // 当单元格 hover 进入时会触发该事件	row, column, cell, event
    cellMouseEnter (row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event)
    },
    // 当单元格 hover 退出时会触发该事件	row, column, cell, event
    cellMouseLeave (row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event)
    },
    // 当某个单元格被点击时会触发该事件	row, column, cell, event
    cellClick (row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },
    // 当某个单元格被双击击时会触发该事件	row, column, cell, event
    cellDblclick (row, column, cell, event) {
      this.$emit('cell-db-click', row, column, cell, event)
    },
    // 当某一行被点击时会触发该事件	row, column, event
    rowClick (row, column, event) {
      this.$emit('row-click', row, column, event)
    },
    // 当某一行被鼠标右键点击时会触发该事件	row, column, event
    rowContextmenu (row, column, event) {
      this.$emit('row-contextmenu', row, column, event)
    },
    // 当某一行被双击时会触发该事件	row, column, event
    rowDblclick (row, column, event) {
      this.$emit('row-db-click', row, column, event)
    },
    // 当某一列的表头被点击时会触发该事件	column, event
    headerClick (column, event) {
      this.$emit('header-click', column, event)
    },
    // 当某一列的表头被鼠标右键点击时触发该事件	column, event
    headerContextmenu (column, event) {
      this.$emit('header-contextmenu', column, event)
    },
    // 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。	filters
    handleFilterChange (filters) {
      this.$emit('handle-filter-change', filters)
    }
  }
}
</script>

<style lang="less" scoped>
  .table-wrap {
    width: 100%;
    .table-container {
      background: #ffffff;
      padding: 20px;
      .btns {
        display: inline-block;
        margin-right: 8px;
      }
    }
    .pagination-box {
      margin: 10px 0 0 0;
    }
    .tool {
      margin-bottom: 10px;
    }
  }
  /deep/.el-table .warning-row {
    background: oldlace;
  }

  /deep/.el-table .success-row {
    background: #f0f9eb;
  }
</style>
