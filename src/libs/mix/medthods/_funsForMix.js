import { formatDate,parseDate } from '../../date'
import _ from 'lodash'
// 消息提示,用element-ui
function success (mes) {
  this.$message({
    message: mes,
    type: 'success'
  })
}
function error (mes) {
  this.$message.error(mes)
}
function info (mes) {
  this.$message(mes)
}

export default {
  // 时间
  deformatterDate (d) {
    return new Date(d).getTime() - 1000 * 60 * 60 * 24
  },
  handleStartTime (d) {
    this.starTimes = this.deformatterDate(d)
  },
  handleEndTime (d) {
    this.endTimes = this.deformatterDate(d)
  },
  initStartEndTime (end,start) {
    this.endTimesEnd = end && this.deformatterDate(end) || ''
    this.starTimesEnd = start && (new Date(start).getTime()) || ''
  },

  // 消息提示
  successMess: success,
  errorMess: error,
  showMess: info,

  /*
   * 对表单数据的时间进行转换
   * @params  data    obj|array  需要转换的数据源
   * @parans fn        fun||string  操作的方法或字符串模板，yyyy-mm
   * @parans targer   array  需要操作的对象的名
   * */
  formDate (data,targer,fn) {
    let length = targer.length
    let that = this
    let isObject = this.valDataType(data,'Object')
    if (isObject) {
      for (let i = 0; i < length; i++) {
        if (typeof fn === 'string') {
          data[targer[i]] = this.conductDate(data[targer[i]],fn)
        } else {
          fn = fn || this.yearMonthData || function () {
          }
          data[targer[i]] = fn(data[targer[i]])
        }
      }
      return data
    }
    this.$util._.forEach(data,function (value) {
      for (let i = 0; i < length; i++) {
        if (typeof fn === 'string') {
          value[targer[i]] = that.conductDate(value[targer[i]],fn)
        } else {
          fn = fn || that.yearMonthData || function () {
          }
          value[targer[i]] = fn(value[targer[i]])
        }
      }
    })
    return data
  },
  setHttpSrc (fileName) {
    let http = this.$store.getters.getEnvPath.http
    let randomNum = Math.random()
    return http + 'static/template/' + fileName + '?randomNum = ' + randomNum
  },
  /*
  * 将字符串时间转换为时间戳
  * @param date  {String}  例如:201-08-01
  * */
  parseTimestamp (date) {
    let timestamp
    if (navigator.userAgent.indexOf('Firefox') > 0) { // 解决火狐兼容性问题
      date && (date = date + 'T09:00:00')
      timestamp = date ? Date.parse(date) : new Date().getTime()
    } else {
      timestamp = date ? new Date(date).getTime() : new Date().getTime()
    }
    return timestamp
  },

  /* //如果传过来的为字符串模板，则使用此函数处理
  * @params    date    obj||string
  * @params    format    string        yyyy-MM-dd HH:mm:ss.SSS
  *
  *
  * */
  parseDate (date,format) {

    return parseDate(date,format)
  },
  conductDate (date,format) {

    // if(typeof date =='string'){
    //   date =  parseDate(date,format)
    // }else {
    date = formatDate(date,format)
    // }
    return date
  },
  computeDate (date) {
    if (typeof date !== 'object') {return date}

    let datetime = new Date(date)
    let year = datetime.getFullYear()
    let month = datetime.getMonth() + 1
    let D = date.getDate() + ''
    if (month < 10) {
      month = '0' + month
    }
    if (D < 10) {
      D = '0' + D
    }
    return year + '年' + month + '月' + D + '日'
  },
  /*
   * 对表单数据的时间进行转换
   * @parans date   string|obj  操作的方法
   * @return 199-02-12格式的时间
   * */
  yearMonthData (date) {
    if (typeof date !== 'object') {return date}

    let datetime = new Date(date)
    let year = datetime.getFullYear()
    let month = datetime.getMonth() + 1
    let D = date.getDate() + ''
    if (month < 10) {
      month = '0' + month
    }
    if (D < 10) {
      D = '0' + D
    }
    return year + '-' + month + '-' + D
  },

  /*
   * 对表单数据的时间进行转换
   * @parans date   string|obj  操作的方法
   * @return 19902格式的时间
   * */
  yearMonth (date) {
    if (!date) {return ''}
    if (typeof date !== 'object') {
      if (typeof date === 'number') {
        date = date + ''
        let year = date.substring(0,4)
        let month = date.substring(date.length - 2,date.length)
        date = year + '-' + month
      } else {
        date = date.split('-')
        date = date[0] + date[1]
      }
      return date
    } else {
      let datetime = new Date(date)
      let year = datetime.getFullYear()
      let month = datetime.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      return +(year + '' + month)
    }
  },

  /*
   * 判断数据类型
   * @param obj  {}||[]  各种数据类型
   * @param type string  例如: Object String Array等数据类型
   * @return flag boolean 是否为要验证的数据类型
   * */
  // eslint-disable-next-line complexity
  valDataType (obj,type) {
    let flag = false
    switch (type) {
    case 'String':
      obj.constructor === String ? flag = true : flag = false
      break
    case 'Array':
      obj.constructor === Array ? flag = true : flag = false
      break
    case 'Boolean':
      obj.constructor === Boolean ? flag = true : flag = false
      break
    case 'Date':
      obj.constructor === Date ? flag = true : flag = false
      break
    case 'Object':
      obj.constructor === Object ? flag = true : flag = false
      break
    default:
      alert(type + ':不支持的数据类型验证')
      break
    }
    return flag
  },

  // 从获取的Res中挑选出需要的名值对
  getFormValidate (data,res) {
    let length = arguments.length
    var arr = Array.prototype.slice.call(arguments,2)

    if (length < 2) {return data}
    var obj = {}
    this.$util._.forEach(data,function (val,key) {
      obj[key] = res[key]
    })

    if (length >= 3) {obj = this.getFormValidate.apply(this,[].concat(obj,arr))}
    return obj

  },

  // 导入验证
  //  validate = {
  //   no: [{validate: this.require, message: "房间号必填"}, {validate: this.integer, message: "房间号"}],
  //   sex: [{validate: this.require, message: "房间类别必填"}, {validate: this.roomSex, message: "房间性别只能输入男和女"}],
  //   bedNum: [{validate: this.require, message: "床位数必填"}, {validate: this.integer, message: "床位数"}],
  // };

  /**
   * 验证对象所有的值是否为空
   * @param obj {}  需要验证的对象
   * @param arr []  需要过滤的值
   * @return boolean
   * */
  objValIsEmpty (obj,arr) {
    let flag = false
    let count = 0
    let isObject = this.valDataType(obj,'Object')
    let len = arr.length
    if (isObject) {
      for (let i = 0; i < len; i++) {
        if (obj[arr[i]] === '' || typeof obj[arr[i]] === 'undefined') {
          count++
        }
      }
    }
    if (arr.length === count) {
      flag = true
    }
    return flag
  },

  /**
   * 导入验证
   * @param {Array} data 源数据
   * @param {object} validate 验证规则
   * */
  _Gvalidate: function (data,validate) {

    let errorData = []
    let flag = false
    for (let i = 0; i < data.length; i++) {
      let item = data[i] // 一行数据
      let errObj = {seq: i,errorMsgList: []}
      for (let key in validate) { // 获取对象的每一项数据
        if (!validate[key]) {continue} // 没有进行验证则下一项
        let isValid = true // 当前验证是否通过
        for (let l = 0; l < validate[key].length; l++) {
          if (!isValid) {break}
          let valid = validate[key][l] // 每一项验证
          valid.validate(item[key],(mes) => {
            if (mes) {
              flag = true
              isValid = false
              errObj.errorMsgList.push(mes)
            }
          },valid.message) // 进项验证
        }
      }
      if (errObj.errorMsgList !== 0) {
        errorData.push(errObj)
      }
    }
    if (flag) {
      return errorData
    } else {
      return []
    }
  },

  /**
   * 导入验证  大医考 导入考生 考官身份验证用
   * @param {Array} data 源数据
   * @param {object} validate 验证规则
   * */
  _spcsGvalidate: function (data,validate) {
    let validates = validate
    let errorData = []
    let flag = false
    for (let i = 0; i < data.length; i++) {
      let item = data[i] // 一行数据
      let errObj = {
        seq: i,
        errorMsgList: []
      }
      for (let key in validates) { // 获取对象的每一项数据
        if (!validates[key]) {continue} // 没有进行验证则下一项
        let isValid = true // 当前验证是否通过
        for (let l = 0; l < validates[key].length; l++) {
          if (!isValid) {break}
          let valid = validates[key][l] // 每一项验证
          valid.validate(item[key],(mes) => {
            if (mes) {
              flag = true
              isValid = false
              // 大医考  导入考生   只对证件类型是身份证的 做身份证校验
              if(mes === '身份证号不合法') {
                if(item.documentType === '居民身份证' || item.documentType === '身份证') {
                  errObj.errorMsgList.push(mes)
                }
              }else {
                errObj.errorMsgList.push(mes)
              }
            }
          },valid.message) // 进项验证
        }
      }
      if (errObj.errorMsgList !== 0) {
        errorData.push(errObj)
      }
    }
    if (flag) {
      return errorData
    } else {
      return []
    }
  },

  /**
   * 平常js数组验证
   * @param {Array} data 源数据
   * @param {object} validate 验证规则
   * @return {boolean | null}
   * */
  _ArrayValidate: function (data,validate) {
    let flag = false
    for (let i = 0; i < data.length; i++) {
      if (flag) {
        return false
      }// 验证是否通过 。不通过则返回
      let item = data[i] // 一行数据
      for (let key in validate) { // 获取对象的每一项数据
        if (flag) {
          return false
        }// 验证是否通过 。不通过则返回
        if (!validate[key]) {continue} // 没有进行验证则下一项
        for (let l = 0; l < validate[key].length; l++) {
          if (flag) {
            return false
          }// 验证是否通过 。不通过则返回
          let valid = validate[key][l] // 每一项验证
          valid.validate(item[key],(mes) => {
            if (mes) {
              flag = true
              this.errorMess(`第${i + 1}行：${mes}`)
            }
          },valid.message) // 进项验证
        }
      }
    }
    if (flag) {
      return false
    }// 验证是否通过 。不通过则返回
    return true
  },

  /**
   * 平常js对象验证
   * @param {object} data 源数据
   * @param {object} validate 验证规则
   * @return {boolean | null}
   * */
  _objValidate: function (data,validate) {
    let flag = false
    if (flag) {
      return false
    }// 验证是否通过 。不通过则返回
    let item = data // 一行数据
    for (let key in validate) { // 获取对象的每一项数据
      if (flag) {
        return false
      }// 验证是否通过 。不通过则返回
      if (!validate[key]) {continue} // 没有进行验证则下一项
      for (let l = 0; l < validate[key].length; l++) {
        if (flag) {
          return false
        }// 验证是否通过 。不通过则返回
        let valid = validate[key][l] // 每一项验证
        valid.validate(item[key],(mes) => {
          if (mes) {
            flag = true
            this.errorMess(`${mes}`)
          }
        },valid.message) // 进项验证
      }
    }
    if (flag) {
      return false
    }// 验证是否通过 。不通过则返回
    return true
  },

  /*
   * 将对象的所有值或指定key设置为空
   * @param obj {}  需要设置的对象
   * @param arr []  需要清空的对象中的key值
   * @return obj
   * */
  setObjValEmpty (obj,arr) {
    let isObject = this.valDataType(obj,'Object')
    if (isObject) {
      if (arr) {
        if (!this.valDataType(obj,'Array')) {return}
        for (var i = 0; i < arr.length; i++) {
          obj[arr[i]] = ''
        }
      } else {
        _.forEach(obj,function (v,key) {
          obj[key] = ''
        })
      }
    }
    return obj
  },
  setStructureIndex (data,parIdx) {
    console.log(data,parIdx)
    if (data.length === 0) {
      return
    }
    data.map((Item,Index) =>{
      this.structureIndex[Item.path] = {index: Index + parIdx,parIdx: parIdx}
      if(Item.children && Item.children.length) {
        this.setStructureIndex(Item.children,Index)
      }
    })
  },
  addRouter (data,flag) {
    // 全部菜单
    console.log(data,flag)
    console.log(this.$router)
    /* let routerArr = []
    // 目前创建了第一个大菜单下的文件
    for(let q = 0;q < data.length;q++) {
      for (let i = 0; i < data[q].children.length; i++) {
        let item = data[q]
        let ite = data[q].children[i]
        let routerObj = {
          path: 'manage/' + ite.path,
          name: ite.path,
          meta: {requiresAuth: true},
          component: resolve => require([`_c/${item.path}/${ite.path}/${ite.path}_list`], resolve)
        }
        routerArr.push(routerObj)
      }
    }
    // component: ()=> import(`_c/${item.code}/${ite.code}/${ite.code}_list`)
     this.$router.addRoute({
      path: '/',
      component: () => import('_c/Index'),
      name: 'Manage',
      meta: { title: '一级路由'},
      children: routerArr
    })*/
    // 把路由存在store中
    let routers = this.$router.getRoutes()
    this.$store.commit('setRouters',routers)
    let currentRoute = this.$route.path
    // 如果是登录之后 请求菜单接口 需要跳转到第一个路由
    let index = ''
    if(flag) {
      if (data[0] && !data[0].children) {
        index = `/manage/${data[0].path}`
      } else if (data[0] && data[0].children && data[0].children.length) {
        index = `/manage/${data[0].children[0].path}`
      }
    }else { // 否则跳转到当前路由
      index = currentRoute
    }
    sessionStorage.setItem('currentRouter',JSON.stringify(index))
    this.$router.push({path: index},() => {})
  }
}
