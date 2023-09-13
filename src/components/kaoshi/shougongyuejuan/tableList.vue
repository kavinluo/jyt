<template>
  <div class="table-container" style="overflow-y:scroll;height:300px;">
    <table class="el-table">
      <thead style="position: sticky;top: 0;">
        <tr>
          <th class="el-table_thead_th">序号</th>
          <th class="el-table_thead_th">考生</th>
          <th class="el-table_thead_th">考试开始时间</th>
          <th class="el-table_thead_th">考试结束时间</th>
          <th class="el-table_thead_th">
            <span style="cursor: pointer;" v-if="type !== 'dislodge'">选择丨</span>
            <span style="cursor: pointer;" v-else>去除丨</span>
            <span @click="allRows" style="cursor: pointer;">全部</span>
            <label>
              <input type="checkbox" v-model="selectAll" @change="selectAllRows">
            </label>
          </th>
        </tr>
      </thead>
      <tbody v-if="type!== 'dislodge'">
        <tr v-for="(item, index) in justiciaData" :key="index">
          <td class="el-table_cell">{{ item.name }}</td>
          <td class="el-table_cell">{{ item.age }}</td>
          <td class="el-table_cell">{{ item.time }}</td>
          <td class="el-table_cell">{{ item.times }}</td>
          <td class="el-table_cell">
            <label>
              <input type="checkbox" v-model="selectedItems" :value="item" @change="selectRow($event,item)">
            </label>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(item, index) in selectedData" :key="index">
          <td class="el-table_cell">{{ item.name }}</td>
          <td class="el-table_cell">{{ item.age }}</td>
          <td class="el-table_cell">{{ item.time }}</td>
          <td class="el-table_cell">{{ item.times }}</td>
          <td class="el-table_cell">
            <label>
              <input type="checkbox" v-model="selectedItems" :value="item" @change="selectRow($event,item)">
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['type', 'justiciaData', 'selectedData'],
  data() {
    return {
      selectedItems: [],
      selectAll: false,
      optionsData: []
    }
  },
  methods: {
    selectAllRows() {
      if (this.selectAll && this.type !== 'dislodge') {
        this.selectedItems = [...this.justiciaData]
        this.optionsData= [...this.justiciaData]
      } else if (this.selectAll && this.type === 'dislodge') {
        this.selectedItems = [...this.selectedData]
        this.optionsData= [...this.selectedData]
      }else {
        this.selectedItems = []
        this.optionsData= []
      }
    },
    allRows () {
      this.selectAll =!this.selectAll
      this.selectAllRows()
    },
    selectRow(event,item) {
      if (event.target.checked) {
        this.optionsData.push(item) // 将项添加到数组中
      } else {
        const index = this.optionsData.indexOf(item)
        if (index > -1) {
          this.optionsData.splice(index, 1) // 从数组中删除取消选中的项
        }
      }
      if (this.type !== 'dislodge') {
        if (this.selectedItems.length === this.justiciaData.length) {
          this.selectAll = true
        } else {
          this.selectAll = false
        }
      }else {
        if (this.selectedItems.length === this.selectedData.length) {
          this.selectAll = true
        } else {
          this.selectAll = false
        }
      }
    }
  }
}
</script>
<style>
.table-container {
  width: 100%;
}

.el-table {
  width: 100%;
  border-collapse: collapse;
  overflow-y: scroll;
}

.el-table_thead_th {
  background-color: #d4e4fd;
  color: #909399;
  padding: 15px;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid #ebeef5;
}
th.el-table_thead_th {
  text-align: center;
}
.el-table_cell {
  text-align: center;
  padding: 10px 15px;
  border-bottom: 1px solid #ebeef5;
}
.el-table_thead_th input[type="checkbox"],
.el-table_cell input[type="checkbox"] {
  margin-right: 5px;
}

.el-table_cell--centered {
  text-align: center !important;
}
.selected {
  background-color: lightblue;
}
</style>
