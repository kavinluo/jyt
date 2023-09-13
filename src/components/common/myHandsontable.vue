<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/7/5
****--@author   gx
----------------------------------->
<template>
  <div
    :id="tId"
    style="border: 1px solid #dfe6ec;"
  />
</template>
<script>
// 参考网站 https://docs.handsontable.com/0.35.0/tutorial-introduction.html （版本 0.35.0）
/* 当前组件必要引入*/
import Handsontable from 'Handsontable'
import 'handsontable/dist/handsontable.full.css'
// 当前组件引入全局的util
// eslint-disable-next-line no-unused-vars
let Util = null
export default {
  components: {},
  /** 注 外层需要设置width为100%，作用为了避免切换包裹层造成的bug
     * @params tableId {string} 唯一标识
     * @params handsontableOptions {object} andsontable的配置项
     * @params body {Array} andsontable需要渲染的数据
     * @params header {Array} andsontable需要渲染的头部
     * @params merges {Array} andsontable合并单元格
     * @params height {string} andsontable的高度
     */
  props: ['tableId', 'handsontableOptions', 'body', 'header', 'merges', 'height'],
  data () {
    return {
      tId: this.tableId || new Date().getTime(),
      hot: ''
    }
  },
  watch: {
    height (val) {
      this.hot.updateSettings({
        height: val
      })
    },
    handsontableOptions () {
      console.log(this.handsontableOptions)
      this.hot.updateSettings({
        data: this.body,
        colHeaders: this.header,
        ...this.handsontableOptions
      })
    }
  },
  created () {
    this.init()
  },
  mounted () {
    // 页面dom稳定后调用
    this.$nextTick(() => {
      let merges = this.merges || []
      let container = document.getElementById(this.tId)
      // 是否需要自定义表头
      let data = {}
      console.log(this.tId)
      // 是否需要自定义表头
      // 初始化 Handsontable
      let hot = new Handsontable(container, {
        data: this.body,
        //          data: this.data.xlsxArr,
        height: this.height, // 表格高度
        readOnly: true, // 是否只读
        rowHeights: 30, // 行高 宽度/数组
        //            colWidths: '',//指定列宽 宽度/数组
        // rowHeaderWidth:120,//头部宽度
        className: 'htCenter htMiddle', // 单元格样式， 宽度居中 ， 高度居中
        rowHeaders: true, // 显示列头
        colHeaders: this.header, // 显示表头

        autoRowSize: {syncLimit: 200}, // 保持单元格的尺寸，200个单元格同步计算，剩下的异步计算
        contextMenu: false, // 开启菜单
        fillHandle: false, // 可水平或者垂直拖动，创建新行 // possible values: true, false, "horizontal", "vertical"
        //            fillHandle: {
        //              direction: 'horizontal', //拖动方向 horizontal 水平，vertical 垂直
        //              autoInsertRow: false,  //是否创建新航
        //            },
        mergeCells: merges, // 合并单元格
        wordWrap: true, // 自动换行
        fixedRowsTop: 0, // 固定表头
        fixedColumnsLeft: 0, // 固定左侧
        manualColumnMove: false, // 可拖动列
        manualRowMove: false, // 可拖动行

        stretchH: 'all', // 延伸列的宽度 last/all/none //last:延伸最后一列,all:延伸所有列,none默认不延伸。
        ...data,
        ...this.handsontableOptions
      })
      this.hot = hot
      // 把当前创建的实例返回出去
      this.$emit('hot', hot)
      //        widths
    }
    )
  },

  beforeDestroy () {
    this.hot.destroy()
  },
  methods: {
    // 初始化请求列表数据
    init () {

    }

  }
}
</script>
