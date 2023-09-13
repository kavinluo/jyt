<template>
  <div>
    <div class="remove">
      {{ title }}
    </div>
    <el-row>
      <el-col
        :span="10"
        :offset="14"
      >
        <el-button
          type="primary"
          class="blueBtn"
          @click="success"
        >
          确定
        </el-button>
        <el-button
          class="blueBtn"
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
export default {
  name: 'AjaxDerive',
  props: ['type', 'url', 'messTitle', 'deriveParams', 'params', 'fileName', 'modelName'],
  data () {
    return {}
  },
  created () {
    Util = this.$util
    // let messTitle
    let todoType = {
      word: '导出到Word',
      excel: '导出到excel',
      student: '导出考生时间表',
      teacher: '导出监考老师时间表',
      sp: '导出sp时间表'
    }
    if (!this.messTitle) {
      this.title = `确定要${todoType[this.type]}吗？`
    } else {
      this.title = this.messTitle
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel', this.modelName || this.type || 'derive')
    },

    success () {
      // 当前组件提交(add)数据时,ajax处理的 基础信息设置
      let messTitle = {
        ajaxSuccess: (res) => {
          const blob = res.data
          const fileName = this.fileName || res.headers['content-disposition'] &&
            decodeURIComponent(res.headers['content-disposition'].split(
              '=')[1]) || '暂无数据.xls'
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
          this.cancel()
        },
        ajaxError: 'ajaxError',
        ajaxParams: {
          url: this.url,
          method: 'get',
          params: this.params,
          baseConfing: {
            responseType: 'blob' // 表明返回服务器返回的数据类型
          }
        }
      }
      if (this.deriveParams) {
        Object.assign(messTitle.ajaxParams, this.deriveParams)
      }
      let that = this
      this.ajaxCreateLoading(true)
      // 处理服务数据
      let myPromise = this.$util.queryData(messTitle.ajaxParams)()
      myPromise.then((res) => {
        this.ajaxCreateLoading(false)
        const blob = res.data
        console.log(res)
        if (!res.data) {
          this.errorMess('未获取到导出数据')
          return
        }

        if (!blob.type || blob.type === 'application/json') {
          const key = 'b86f561d86e0fad896e0028c1b7d64eb' // sm4加密key
          const sm4 = require('sm-crypto').sm4
          if (typeof FileReader !== 'undefined') {
            let reader = new FileReader()
            reader.readAsText(blob)
            reader.onload = (env) => {// 读取文件成功
              let data = JSON.parse(env.currentTarget.result)
              let responseData = JSON.parse(sm4.decrypt(data.data, key))
              this.$util.handleAjaxError(this, responseData.status.code, responseData.status.msg)
            }
            return
          } else {
            this.errorMess('系统异常，请刷新后重试')
            return
          }
        }
        messTitle.ajaxSuccess.call(this, res, messTitle)
      }).catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          Util.handleAjaxError(that, error.response.status + '')
          this.ajaxCreateLoading(false)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          that.errorMess(error.request)
          this.ajaxCreateLoading(false)
        } else {
          // Something happened in setting up the request that triggered an Error
          that.errorMess(error.message)
          this.ajaxCreateLoading(false)
        }
      })
    },

    /* 对传入ajax成功函数进行处理 (obj,fun)=>fun
     * @param messTitle     obj       传到ajax函数的数据（自定义数据）
     * @param isLoadingFun  function  如果是 自定义按钮组件 点击提交事件 则会传回操作按钮是否显示loading函数（true取消loading）
     * */
    conductSuccess (messTitle, isLoadingFun = () => {}) {
      let ajaxSuccess = messTitle.ajaxSuccess || 'ajaxSuccess'
      let error = messTitle.error
      let errorTitle = messTitle.errorTitle || '数据请求异常!'
      return (res) => {
        console.log('数据获取成功')
        isLoadingFun(false)
        //          window.queCount--
        //          if (!window.queCount) {
        //            this.ajaxCreateLoading(false);
        //          }
        console.log(window.queCount)
        const blob = new Blob([res.data])
        if (!blob.type) {
          if (typeof FileReader !== 'undefined') {
            let reader = new FileReader()
            reader.readAsText(blob)
            reader.onload = (env) => {// 读取文件成功
              let responseData = JSON.parse(env.currentTarget.result)
              let flag = this.$util.handleAjaxError(this, responseData.status.code,
                responseData.status.msg)
              if (!flag) {
                if (error) {
                  if (typeof ajaxSuccess === 'function') {
                    error(res.data)
                  } else {
                    this[error].call(this, responseData, messTitle, isLoadingFun)
                  }
                } else {
                  this.errorMess(errorTitle)
                }
              }
            }
            return
          } else {
            this.errorMess('系统异常，请刷新后重试')
            return
          }
        }
        ajaxSuccess.call(this, blob, messTitle, isLoadingFun)
      }
    }
  }
}

</script>

