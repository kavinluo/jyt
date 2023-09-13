<template>
  <div>
    <div class="remove">
      {{ text||operateMess.title }}
    </div>

    <el-row>
      <el-col
        :span="22"
        align="right"
      >
        <load-btn
          class="blueBtn"
          :btn-data="loadBtn"
          @operateCallback="operateCallback"
        />
        <el-button
          class="but-col cancelBtn"
          type="danger"
          @click="cancel"
        >
          取消
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
let Util
import _ from 'lodash'
let todoType = {
  'remove': '删除',
  'save': '保存',
  'relieve': '解除角色',
  'enable': '启用',
  'disEnable': '禁用',
  'publish': '发布',
  'unpublish': '取消发布',
  'revocation': '撤销',
  'reported': '上报',
  'noReported': '取消上报',
  'reject': '驳回',
  'pass': '通过',
  'join': '参加',
  'abolish': '取消',
  'pay': '支付',
  'noGrant': '不发放',
  'grant': '发放',
  'modifyStateIssued': '下发',
  'cancelIssued': '取消下发',
  'recover': '恢复',
  'pause': '暂停',
  'planAdmit': '拟录取',
  'noAdmit': '不拟录取',
  'giveUp': '放弃录取',
  'noEnroll': '不录取',
  'enroll': '正式录取',
  'affirm': '确认',
  'classicCase': '设置为经典病例',
  'convertToYjs': '转为研究生',
  'noRotation': '无需安排轮转',
  'terminate': '终止活动',
  'activate': '激活'
}
export default {
  name: 'Operate',
  props: [
    'operailityData',
    'postData',
    'operateUrl',
    'type',
    'messTitle',
    'methods',
    'operateData',
    'title',
    'text', 'replaceId', 'modelName',
    'jsonString'],
  data () {
    let method = ''
    let messTitle = ''
    // 未传方法会进行简单的判断
    if (!this.methods) {
      if (this.type === 'remove' || !this.type || this.type === 'relieve') {
        method = 'delete'
      } else {
        method = 'put'
      }
    } else {
      method = this.methods
    }
    // messTitle 传过来的提示信息
    if (!this.messTitle) {
      messTitle = {
        title: `确定要${this.title || todoType[this.type]}吗？`,
        access: `${this.title || todoType[this.type]}成功`,
        error: `${this.title || todoType[this.type]}失败`
      }
    } else {
      messTitle = this.messTitle
    }
    return {
      // 保存数据
      addUrl: '/role/add',
      loadBtn: {title: '确定', callParEvent: 'operateCallback'},
      countDate: 0,
      method: method,
      operateMess: messTitle,
      isSecurity: false // 是否需要sm加密
    }
  },
  created () {
    console.log(this.type)
    Util = this.$util
  },
  methods: {
    cancel () {
      this.$emit('cancel', this.modelName || '' + this.type || 'remove')
    },
    // eslint-disable-next-line complexity
    operateCallback (isLoadingFun) {
      let that = this
      let myUrl = []
      isLoadingFun(true)

      // this.operailityData  需要操作的对象
      if (this.operailityData) {
        if (typeof this.operailityData.length !== 'undefined') { // 如果是数组
          for (let i = 0; i < this.operailityData.length; i++) {
            myUrl.push(this.operailityData[i][this.replaceId || 'id'])
          }
        } else {// 或者对象
          myUrl.push(this.operailityData[this.replaceId || 'id'])
        }

      }
      // 根据this.operateUrl来拼接url
      let tempMyUrl = ''
      if(myUrl.length && this.operateUrl && this.operateUrl.substr(this.operateUrl.length - 1, 1) === '/') {
        tempMyUrl = this.operateUrl + (typeof myUrl.join === 'function' && myUrl.join(',') || '')
      }else if(myUrl.length) {
        tempMyUrl = this.operateUrl + '/' + (typeof myUrl.join === 'function' && myUrl.join(',') || '')
      }else {
        tempMyUrl = this.operateUrl
      }
      console.log(tempMyUrl)
      let options = {
        url: tempMyUrl,
        method: this.method,
        jsonString: this.jsonString,
        params: {}
      }
      if (this.postData) { // 提交的数据
        options[['put', 'post'].includes(this.method) ? 'data' : 'params'] = this.postData
      }
      //  this.operateData传入 ajax的数据，并拼接url,如果存在会覆盖以字符串形式单个传入的
      if (this.operateData) {
        options = this.handleOperateData(myUrl, options)
      }
      console.log(options)
      // return
      // 处理服务数据  ajax请求
      let myPromise = Util.queryData(options)()
      myPromise.then(function (res) {
        if(res.data.data && that.isSecurity) {
          const key = 'b86f561d86e0fad896e0028c1b7d64eb' // sm4加密key
          const sm4 = require('sm-crypto').sm4
          res.data = JSON.parse(sm4.decrypt(res.data.data, key))
        }

        let responseData = res.data
        if (_.isObject(responseData) && responseData.code === 0) {
          that.$emit('operate', that.modelName || that.type, that.operateMess.access)
        } else {
          isLoadingFun(false)
          // let flag = Util.handleAjaxError(that, responseData.code, responseData.msg)
          /* if (!flag) {
              that.errorMess(errorTitle);
            }*/
        }
      }).catch(function (error) {
        if (error.response) {
          isLoadingFun(false)
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          Util.handleAjaxError(that, error.response.status + '')
        } else if (error.request) {
          isLoadingFun(false)
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          that.errorMess(error.request)
        } else {
          isLoadingFun(false)
          // Something happened in setting up the request that triggered an Error
          that.errorMess(error.message)
        }
      })
    },

    // 如果有operateData则合并
    handleOperateData (myUrl, options) {
      let operateData = Util._.defaultsDeep({}, this.operateData)
      operateData.url && (operateData.url = operateData.url + '/' + (typeof myUrl.join === 'function' && myUrl.join(',') || ''))
      return Object.assign({}, options, operateData)
    }
  }

}
</script>
