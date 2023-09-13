export default {
  // 显示更多查询项
  showMoreSearch () {
    this.isShowMoreSearch = !this.isShowMoreSearch
    setTimeout(() => {
      this.setTableDynHeight()
    },0)
  },

  // 改变页码
  changePageSize (n) {
    let pageSize = this.queryQptions.params && (this.queryQptions.params.pageSize = n) || (this.queryQptions.pageSize = n)
    // eslint-disable-next-line no-unused-vars
    pageSize = n
    this.setTableData()
  },
  changePage (n) {
    // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
    // eslint-disable-next-line no-unused-vars
    let pageNo = (this.queryQptions.params &&
      (this.queryQptions.params.pageNo = n) ||
      (this.queryQptions.pageNo = n))
    this.setTableData()
  },

  // 列表页添加序号 arr=>arr  依赖:页数,页条数
  addIndex (data) {
    let arr = []
    for (let i = 0,length = data.length; i < length; i++) {
      data[i].index = ((this.queryQptions.pageNo || this.queryQptions.params.pageNo) - 1) * (this.queryQptions.pageSize || this.queryQptions.params.pageSize) + i + 1
      arr.push(data[i])
    }
    return arr
  },
  /**
   *使用表格搜索组件时，点击查询函数,如果对查询参数不做处理 用公用方法，如果有处理，在本页面请求
   * param {} from的dom对象
   */
  searchProcedure (fromObj = this.$refs.searchForm,formatOptions = this.formOptions.forms) {
    let obj = {}
    formatOptions.map(item=>{
      if(item.prop) {
        obj[item.prop] = item.value
      }
    })
    fromObj.fetchHandler(obj)
  },
  // 使用表格搜索组件时，对返回结果不做其他处理，用公用方法，如果有处理，在本页面处理
  getListSuccess (res) {
    let data = []
    if(res.data || res.data === []) {
      data = res.data
    }else {
      data = []
    }
    this.$refs.searchForm.getListSuccess(data)
  },
  showSearchMore () {
    // this.searchMore = !this.searchMore;
    this.$nextTick(function () {
      this.setTableDynHeight()
    })
  },
  // list页面公共回调函数
  subCallback (target,title,updata) {
    this.cancel(target)
    if(title) {
      this.successMess(title)
    }
    if(!updata || updata === undefined) {
      this.$refs.searchForm.fetchHandler()
    }
  },
  isSelected (isOnly) {
    let len = this.multipleSelection.length
    let flag = true
    if (len === 0) {
      this.showMess('请选择数据!')
      flag = false
    }
    if (len > 1 && isOnly) {
      this.showMess('只能选择一条数据!')
      flag = false
    }
    return flag
  },
  /*
* 打开指定的模态窗体
* @param options string 当前指定的模态:"add"、"edit"
* */
  openModel (options) {
    this[options + 'Modal'] = true
  },
  // 取消
  cancel (targer) {
    this[targer + 'Modal'] = false
  }
}
