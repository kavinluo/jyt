import { utils as util } from '../util'
import _components from './componentsForMix'
import { _ajax,_funs,_table } from './medthods'

export default {
  install (Vue) {
    Vue.prototype.$util = util
    Vue.mixin({
      data () {
        return {
          structureIndex: {},
          // 时间
          starTimes: '', // 开始时间
          starTimesEnd: '', // 开始时间终止日期
          endTimes: '', // 结束时间
          endTimesEnd: '', // 结束时间终止日期
          pickerOptions0: {
            // 选择开始时间后设置结束日期的限制
            disabledDate: (time) => {
              // if (this.endTimes != "") {
              //   if (this.endTimesEnd != "") {
              //     return time.getTime() >= this.endTimes || time.getTime() <= this.endTimesEnd;
              //   } else {
              //     return time.getTime() >= this.endTimes;
              //   }
              // } else {
              //   return time.getTime() <= this.endTimesEnd || time.getTime() >= this.starTimesEnd;
              // }
              let end = this.endTimes ? time.getTime() >= this.endTimes : false
              end = this.endTimesEnd ? end || time.getTime() <= this.endTimesEnd : end
              let start = this.starTimes ? time.getTime() <= this.starTimes : false
              start = this.starTimesEnd ? start || time.getTime() >= this.starTimesEnd : start
              return (this.endTimesEnd ? start : false) || end
            }
          },
          pickerOptions1: {
            // 选择结束时间后设置开始日期的限制
            disabledDate: (time) => {
              // if (this.starTimes != "") {
              //   if (this.starTimesEnd != "") {
              //     return time.getTime() <= this.starTimes || time.getTime() >= this.starTimesEnd;
              //   } else {
              //     return time.getTime() <= this.starTimes;
              //   }
              // } else {
              //   return time.getTime() >= this.starTimesEnd || time.getTime() <= this.endTimesEnd;
              // }
              let end = this.starTimes ? time.getTime() <= this.starTimes : false
              end = this.starTimesEnd ? end || time.getTime() >= this.starTimesEnd : end
              let start = this.endTimes ? time.getTime() >= this.endTimes : false
              start = this.endTimesEnd ? start || time.getTime() <= this.endTimesEnd : start
              return (this.starTimesEnd ? start : false) || end
            }
          },
          value1: '',
          value2: '',
          myPages: '',
          // 弹窗
          addModal: false, // 添加模态窗体
          editModal: false, // 修改模态窗体
          showModal: false, // 显示模态窗体
          removeModal: false, // 删除模态窗体
          auditModal: false, // 审核模态窗体
          allotPersonModal: false, // 分配人员
          allotJurisdictionModal: false, // 分配权限
          isShowMoreSearch: false, // 是否显示高级查询项
          selectUserModal: false, // 选择人员
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          // tree
          filterText: '',
          // 总页数
          listTotal: 0

        }
      },
      methods: {
        ..._ajax,
        ..._funs,
        ..._table
      },

      beforeDestroy () {
        this.$util.events.removeHandler(window,'resize',this.getContentHeight || this.setTableDynHeight)
      },

      components: {
        ..._components
      }
    })
  }

}
