<!----------------------------------
****--@name     穿梭框（iview的实现方式，因切换数据，源数据一直刷新，会导致抖动）
****--@role     ${*}
****--@date     2018/8/2
****--@author   gx
----------------------------------->
<template>
  <div
    style="margin: 0px auto; width: 650px;"
    class="ambufTransfer"
  >
    <div class="my-select-user ivu-transfer">
      <div
        class="ivu-transfer-list"
        style="width: 250px; height: 400px;"
      >
        <div class="ivu-transfer-list-header">
          <label
            class="ivu-checkbox-wrapper"
            :class="{'ivu-checkbox-wrapper-disabled':leftData.length===0,'ivu-checkbox-wrapper-checked':leftAllSelect }"
          ><span
            class="ivu-checkbox"
            :class="{'ivu-checkbox-disabled':leftData.length===0,'ivu-checkbox-checked':leftAllSelect }"
          ><span
            class="ivu-checkbox-inner"
          /><!----> <input
            type="checkbox"
            :disabled="leftData.length===0?'disabled':false"
            class="ivu-checkbox-input"
            @click="allSelect('left')"
          ></span> <!---->
          </label> <span>源列表</span> <span
            class="ivu-transfer-list-header-count"
          >{{ leftSelectItem.length > 0 ? leftSelectItem.length + '/' : '' }}{{ leftData.length }}</span>
        </div>
        <div class="ivu-transfer-list-body ivu-transfer-list-body-with-search">
          <div class="ivu-transfer-list-body-search-wrapper">
            <div class="ivu-transfer-list-search">
              <el-input
                v-model="leftFilterValue"
                size="mini"
                placeholder="请输入搜索内容"
                @change="leftSelectValueChange"
              >
                <i @click="leftSelectValueRemove" slot="suffix" class="el-input__icon" :class="leftFilterValue === '' ? 'el-icon-search' : 'el-icon-close'"></i>
              </el-input>
            </div>
          </div>
          <div
            ref="leftDom"
            style="height:330px; position: relative; overflow: auto;"
            @scroll="leftScroll('left',$event)"
          >
            <div
              :style="{height:leftAllHeight+'px'}"
              style=" overflow: hidden;   position: relative"
            >
              <ul
                class="ivu-transfer-list-content"
                style=" overflow: initial; position: absolute"
                :style="{top:leftPosition+'px',}"
                @click="leftDataClick('left',$event)"
              >
                <li
                  v-for="(item) in leftRenderData"
                  :tId="item.key"
                  :key="item.key"
                  class="ivu-transfer-list-content-item"
                >
                  <span
                    class="ivu-checkbox "
                    :class="{'ivu-checkbox-checked':item.check}"
                  ><span
                    class="ivu-checkbox-inner"
                  /></span>
                  <span
                    :tId="item.key"
                    v-html="renderFormat(item)"
                  />
                </li>
                <li class="ivu-transfer-list-content-not-found">
                  无信息,请选择左侧菜单!
                </li>
              </ul>
            </div>
          </div>
        </div> <!---->
      </div>
      <div class="ivu-transfer-operation">
        <div>
          <el-button
            type="primary"
            size="small"
            :disabled="!rightSelectItem.length"
            @click="movesClick('left')"
          >
            <Icon type="ios-arrow-back" />
            向左移动
          </el-button>
        </div>
        <br>
        <div>
          <el-button
            type="primary"
            size="small"
            :disabled="!leftSelectItem.length"
            @click="movesClick('right')"
          >
            向右移动
            <Icon type="ios-arrow-forward" />
          </el-button>
        </div>
        <!--<button type="button" disabled="disabled" class="ivu-btn ivu-btn-primary ivu-btn-small">&lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; <span> 向左移动-->
        <!--</span></button>-->
        <!--<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-small" disabled="disabled">&lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; <span>-->
        <!--向右移动 <i class="ivu-icon ivu-icon-ios-arrow-right"></i></span></button>-->
      </div>
      <div
        class="ivu-transfer-list"
        style="width: 250px; height: 400px;"
      >
        <div class="ivu-transfer-list-header">
          <label
            class="ivu-checkbox-wrapper "
            :class="{'ivu-checkbox-wrapper-disabled':rightData.length===0,'ivu-checkbox-wrapper-checked':rightAllSelect }"
          ><span
            class="ivu-checkbox "
            :class="{'ivu-checkbox-disabled':rightData.length===0 ,'ivu-checkbox-checked':rightAllSelect}"
          ><span
            class="ivu-checkbox-inner"
          /> <!----> <input
            type="checkbox"
            :disabled="rightData.length===0?'disabled':false"
            class="ivu-checkbox-input"
            @click="allSelect('right')"
          ></span> <!---->
          </label> <span>目的列表</span> <span
            class="ivu-transfer-list-header-count"
          >{{ rightSelectItem.length > 0 ? rightSelectItem.length + '/' : '' }}{{ rightData.length }}</span>
        </div>
        <div class="ivu-transfer-list-body ivu-transfer-list-body-with-search">
          <div class="ivu-transfer-list-body-search-wrapper">
            <div class="ivu-transfer-list-search">
              <el-input
                v-model="rightFilterValue"
                size="mini"
                placeholder="请输入搜索内容"
                @change="rightSelectValueChange"
              >
                <i @click="rightSelectValueRemove" slot="suffix" class="el-input__icon" :class="rightFilterValue === '' ? 'el-icon-search' : 'el-icon-close'"></i>
              </el-input>
            </div>
          </div>
          <div
            ref="rightDom"
            style="height:330px; position: relative; overflow: auto;"
            @scroll="leftScroll('right',$event)"
          >
            <div
              :style="{height:rightAllHeight+'px'}"
              style=" overflow: hidden;   position: relative"
            >
              <ul
                class="ivu-transfer-list-content"
                style=" overflow: initial; position: absolute"
                :style="{top:rightPosition+'px',}"
                @click="leftDataClick('right',$event)"
              >
                <li
                  v-for="(item) in rightRenderData"
                  :tId="item.key"
                  :key="item.key"
                  class="ivu-transfer-list-content-item"
                >
                  <span
                    class="ivu-checkbox"
                    :class="{'ivu-checkbox-checked':item.check}"
                  ><span
                    class="ivu-checkbox-inner"
                  /> </span>
                  <span
                    :tId="item.key"
                    v-html="renderFormat(item)"
                  />
                </li>
                <li class="ivu-transfer-list-content-not-found">
                  无信息,请选择左侧菜单!
                </li>
              </ul>
            </div>
          </div>
        </div> <!---->
      </div>
      <div v-if="show" />
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入*/

export default {
  name: 'AmbufTransfer',
  components: {},
  props: ['data', 'targetKeys', 'renderFormat', 'operations', 'notFoundText', 'filterable'],
  data () {
    return {

      stepHeight: {
        left: [],
        right: []
      },
      leftAllHeight: 0,
      leftPosition: 0,
      leftRenderData: [], // 左侧实际渲染数据
      leftOldLength: 0,
      leftSelectItem: [], // 选中的Item
      leftAllSelect: false, // 左侧数据全选
      leftData: [], // 左侧所有数据
      leftFilterData: [], // 左侧筛选的数据（供渲染使用）
      leftFilterValue: '', // 左侧过滤的值
      leftIndex: [], // 左侧的索引关系

      rightAllHeight: 0,
      rightPosition: 0,
      rightRenderData: [], // 右侧实际渲染数据
      rightOldLength: 0,
      rightSelectItem: [], // 选中的Item
      rightAllSelect: false, // 右侧数据全选
      rightData: [], // 右侧所有数据
      rightFilterData: [], // 右侧筛选的数据（供渲染使用）
      rightFilterValue: '', // 右侧过滤的值
      rightIndex: [], // 右侧的索引关系

      oldTargetKeys: [],
      show: false,
      height: 34,

      leftRenderIndexNumber: 1,
      rightRenderIndexNumber: 1,
      canRender: 1
    }
  },
  watch: {
    data (val) {
      this.refreshScroll()
      this.extractRight(val, this.targetKeys)
    },
    targetKeys (val) {
      this.extractRight(this.data, val)
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  methods: {
    // 初始化请求列表数据
    init () {
      this.extractRight(this.data, this.targetKeys)
    },

    // 提取又值
    extractRight (data = [], targetKeys = [], dataChange) {
      // 左右移动值
      let isMoveClick = this.canRender !== this.rightRenderIndexNumber || this.canRender !== this.leftRenderIndexNumber
      this.stepHeight = {
        left: [],
        right: []
      }
      targetKeys = targetKeys.map(item => item + '')// 变为字符串，因为传过来的会有字符串和数字，统一变成字符串
      let leftData = []
      let rightData = []

      // 可能父组件不允许移动操作，所以子组件要和父组件同步
      let rightSelectItem = this.rightSelectItem = this.rightSelectItem.filter(item => {
        if (targetKeys.includes(item.key + '')) {
          return item
        }
      })
      // 选中的右侧id
      let rightSelectIds = this.getKey(this.rightSelectItem, 'key')
      let leftSelectIds = this.getKey(this.leftSelectItem, 'key')
      data.map(item => {
        item.check = false
        item.key = +item.key// key变为数字
        if (targetKeys.includes(item.key + '')) {
          if (rightSelectIds.includes(item.key)) {item.check = true}// 重置为选中状态
          rightData.push(item)
        } else {
          if (leftSelectIds.includes(item.key) && isMoveClick) {item.check = true}// 只有为左右移动值 才 重置为选中状态
          leftData.push(item)
        }
      })
      // 根据targetKeys来保存数据

      this.filterData('left', leftData)
      this.filterData('right', rightData)
      // 过滤数据
      if (isMoveClick) {
        // 重新渲染刷新
        this.refreshView()
      } else {
        // 重置选中状态
        this.leftAllSelect = false//
        // 初始化选中的数据
        this.leftSelectItem = []
        // 初始渲染数据
        this.refreshData('left', leftData)
        this.refreshData('right', rightData)
      }
      this.leftData = leftData// 保存总数据
      this.rightData = rightData// 保存总数据

      this.extractIndex()// 提取左右值的索引（初始化和值发生改变的时候运行）赋值之后使用

      // 全选状态
      let leftSelectItem = this.leftSelectItem
      this.leftAllSelect = leftSelectItem.length !== 0 && leftSelectItem.length === leftData.length
      this.rightAllSelect = rightSelectItem.length !== 0 && rightSelectItem.length === rightData.length
    },

    // 初始刷新数据(过滤数据)
    refreshData (direction, data) {
      console.log(direction, data)
      this[direction + 'Position'] = 0 // 初始位置为空
      //        this[direction + 'Data'] = data;//保存总数据
      this[direction + 'RenderData'] = this[direction + 'FilterData'].slice(0, 100)// 使用过滤的数据加载
    },

    // 过滤数据（并设置总高度）
    filterData (direction, data = this[direction + 'Data'], val = this[direction + 'FilterValue']) {
      let filterData = []// 保存当前过滤的数据
      filterData = this[direction + 'FilterData'] = val === '' ? data : data.filter(item => {
        if (~(item.label + '').indexOf(val)) {
          return item
        }
      })
      // 计算总高度（初始化和值发生改变的时候运行）
      this.countHeight(direction, filterData)
      // 提取高度数组
      this.setHeightArr(direction, filterData)
      return filterData
    },
    // 计算总高度
    countHeight (direction, data = this[direction + 'filterData']) {
      this[direction + 'AllHeight'] = data.reduce((num, item) => num + (item.isParent ? 39 : 34), 0)
    },

    // 重新渲染刷新
    refreshView () {
      this.leftScroll('left')
      this.leftScroll('right')

    },
    addCanRender () {
      this.canRender++
    },

    // 提取左右值的索引（初始化和值发生改变的时候运行）
    extractIndex () {
      let key = 'key'
      this.leftIndex = this.BaseExtractIndex(this.leftData, key)
      this.rightIndex = this.BaseExtractIndex(this.rightData, key)
    },

    /** 基础提取操作
       * @param data {Array} 原数组
       * @param key {string} key值
       * */
    BaseExtractIndex (data, key) {
      return data.map(item => {
        return +item[key]
      })
    },
    leftDataClick (direction, even) {
      let dataIndex = direction === 'left' ? this.leftIndex : this.rightIndex// 获取索引
      let data = direction === 'left' ? this.leftData : this.rightData// 获取值
      let selectItem = direction === 'left' ? this.leftSelectItem : this.rightSelectItem// 获取值
      let target = even.srcElement || even.target
      if (target.localName === 'ul') {return}
      while (target.localName !== 'li') {
        target = target.parentNode
      }
      let item = data[dataIndex.indexOf(+target.attributes.tid.nodeValue)] || {}// 获取id
      item.check = !item.check
      if (item.check) {
        selectItem.push(item)
      } else {
        selectItem.splice([selectItem.indexOf(item)], 1)
      }
      this.show = !this.show

      // 是否是全选
      this[direction + 'AllSelect'] = selectItem.length === data.length

      this.addCanRender()
    },

    // 点击全选
    allSelect (direction) {
      let AllSelect = this[direction + 'AllSelect'] = !this[direction + 'AllSelect']
      let selectItem = []

      this[direction + 'Data'].map(item => {
        item.check = AllSelect
        if (AllSelect) {
          selectItem.push(item)
        }
      })

      this[direction + 'SelectItem'] = selectItem
    },

    leftScroll (direction) {
      //        let target = even.srcElement || even.target;
      let {scrollTop} = this.$refs[direction + 'Dom']
      let {index, height} = this.getHeightArr(direction, scrollTop)// 每10个更新一次
      if (this.canRender === this[direction + 'RenderIndexNumber'] && this[direction + 'OldLength'] === index) {
        return// 避免重复刷新数据
      }
      this[direction + 'RenderIndexNumber'] = this.canRender
      this[direction + 'OldLength'] = index
      let flag = this[direction + 'FilterData'].length - (index * 50 + 100) < 50
      this[direction + 'RenderData'] = this[direction + 'FilterData'].slice(index * 50, flag ? this[direction + 'FilterData'].length : index * 50 + 100)
      this[direction + 'Position'] = height
    },

    // 循环取数据
    setHeightArr (direction, data) {
      let stepHeight = this.stepHeight
      let length = data.length - 100
      let height = 0
      for (let i = 0; i < length; i++) {
        let item = data[i]
        height += item.isParent ? 39 : 34
        stepHeight[direction][Math.floor(i / 50) + 1] = height

      }
    },
    //
    getHeightArr (direction, scrollTop) {
      let heightArr = this.stepHeight[direction]
      for (let i = 0; i < heightArr.length; i++) {
        if (heightArr[i] > scrollTop) {
          return {index: i - 1, height: heightArr[i - 1] || 0}
        } else if (scrollTop > heightArr[i] && i === heightArr.length - 1) {
          return {index: i - 1, height: heightArr[i - 1] || 0}
        }
      }
      return {index: 0, height: 0}// 不需要缓存
    },

    // 左右移动
    movesClick (direction) {
      let selectItem = direction === 'right' ? this.leftSelectItem : this.rightSelectItem// 获取值
      let selectItemIds = this.getKey(selectItem, (item) => {
        item.check = false
        return item.key
      })// 获取选择的id 并清除选中状态
      // 重置选中状态
      //
      //       ;
      let rightIds = []// ;获取所有右侧的id
      if (direction === 'right') {// 如果移动方向为右
        //          this.leftData = this.leftData.filter(item => selectItemIds.includes(item.key) ? false : item.key)
        //          this.rightData = this.rightData.concat(selectItem)//合并值
        rightIds = this.getKey(this.rightData, 'key').concat(selectItemIds)// ;获取所有右侧的id
        this.leftSelectItem = []// 清空选中的数据
        this.leftAllSelect = false
      } else {// 如果移动方向为左
        //          this.leftData = this.leftData.concat(selectItem)//合并值
        //          this.rightData = this.rightData.filter(item => selectItemIds.includes(item.key) ? false : item.key)
        rightIds = this.getKey(this.rightData.filter(item => selectItemIds.includes(item.key) ? false : item.key), 'key') // 过滤已经选中的值
        //          this.rightSelectItem = [];//清空选中的数据
        this.rightAllSelect = false
      }
      this.$emit('on-change', rightIds, direction, selectItemIds)
    },

    /** 获取数组元素中的key值，返回一个所获取的元素集合
       * @param  {Array} list 需要取值的数组
       * @param  {string|function} key 需要取的key
       * */
    getKey (list, key) {
      return list.map(typeof key === 'function' ? key : (item) => item[key])
    },

    leftSelectValueChange (val) {
      this.commonFilter('left', val)
    },
    rightSelectValueChange (val) {
      this.commonFilter('right', val)
    },

    // 左侧搜索数据删除
    leftSelectValueRemove () {
      this.leftFilterValue = ''
      this.commonFilter('left', '')
    },
    // 右侧搜索数据删除
    rightSelectValueRemove () {
      this.rightFilterValue = ''
      this.commonFilter('right', '')
    },

    // 公共筛选方法
    commonFilter (direction, val) {
      console.log(direction, val)
      this.$refs[direction + 'Dom'].scrollTop = 0// 滚动条重置
      let filterData = this.filterData(direction, this[direction + 'Data'], val)// 过滤数据 并设置总高度
      console.log(filterData)
      this.refreshData(direction, this[direction + 'Data'], val)// 刷新数据
      this.leftScroll(direction)// 刷新视图
    },

    // 滚动条重置
    refreshScroll () {
      this.$refs.leftDom.scrollTop = 0
      this.$refs.rightDom.scrollTop = 0
    }

  }
}
</script>
<style>
  .ambufTransfer .ivu-checkbox-checked .ivu-checkbox-inner:after {
    /*transition:all 0s ;*/
  }
</style>
