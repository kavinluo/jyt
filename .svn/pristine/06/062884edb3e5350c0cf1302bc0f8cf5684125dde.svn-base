import { utils as util } from '../../util'
import _ from 'lodash'

const sm4 = require('sm-crypto').sm4
const key = 'b86f561d86e0fad896e0028c1b7d64eb' // sm4加密key
const isSecurity = false // 是否需要解密
let queCount = 0
export default {
  /* ajax(Promise)函数*/
  // 通过传递发送的url信息和data，调用封装的axios （需要接受什么参数，请查看util.queryData方法）返回promise
  Promise (options) {
    // eslint-disable-next-line no-unused-vars
    let that = this
    let myPromise = this.$util.queryData(options)()
    return myPromise
  },

  /* ajax成功的消息,默认成功事件（ajaxSuccess）（可自定义成功事件） (obj,obj,fun)=>false
   *@param responseData obj|array  当前行索引
   *@param messTitle     obj       传到ajax函数的数据（自定义数据）
   *@param [isLoadingFun]  function  如果是 自定义按钮组件 点击提交事件 则会传回操作按钮是否显示loading函数,已在conductSuccess函数处理，可做扩展用
   */
  ajaxSuccess (responseData,messTitle,isLoadingFun) {
    this.$emit(messTitle.type,messTitle.type,messTitle.successTitle)
  },
  /* 判断返回数据是否成功  obj=>boolean
   * @param response     obj      成功返回的信息，包含data，status
   * */

  verifyAjaxResponse (response) {
    let flag = false
    let responseData = response.data
    if (_.isObject(responseData) && responseData.code === 0) {
      flag = true
    }
    return flag
  },

  /* 对传入ajax成功函数进行处理 (obj,fun)=>fun
   * @param messTitle     obj       传到ajax函数的数据（自定义数据）
   * @param isLoadingFun  function  如果是 自定义按钮组件 点击提交事件 则会传回操作按钮是否显示loading函数（true取消loading）
   * */
  conductSuccess (messTitle,ajaxLoading,isLoadingFun) {
    if (!isLoadingFun) {
      isLoadingFun = function () {
      }
    }
    let ajaxSuccess = messTitle.ajaxSuccess || 'ajaxSuccess'
    let error = messTitle.error
    let ajaxCall = messTitle.ajaxCall || false
    let errorTitle = messTitle.errorTitle || '数据请求异常!'
    if (messTitle.allowError === undefined) {
      messTitle.allowError = true
    }
    // eslint-disable-next-line complexity
    return (res) => {
      if (typeof res.data === 'string' && isSecurity) {
        res.data = JSON.parse(sm4.decrypt(res.data.data,key))
      }
      if (ajaxCall) { // ajaxCall拦截自定义的ajax处理
        if (ajaxLoading) {
          queCount--
          if (!queCount) {
            this.ajaxCreateLoading(false)
          }
        }
        if (typeof ajaxCall === 'function') {
          isLoadingFun(false)
          ajaxCall(res.data)
        } else {
          this[ajaxCall].call(this,res.data,messTitle,isLoadingFun)
        }
        return
      }
      let isSuccess = this.verifyAjaxResponse(res)
      let responseData = res.data
      if (isSuccess) {
        if (typeof ajaxSuccess === 'function') {
          ajaxSuccess(res.data)
        } else {

          this[ajaxSuccess].call(this,responseData,messTitle,isLoadingFun)
        }
      } else {
        let flag = messTitle.allowError ? util.handleAjaxError(this,responseData.code,responseData.msg) : messTitle.allowError
        if (!flag) {
          if (error) {
            if (typeof error === 'function') {
              error(responseData,ajaxLoading,isLoadingFun)
            } else {
              this[error].call(this,responseData,messTitle,isLoadingFun)
            }
          } else {
            this.errorMess(errorTitle)
          }
        }
      }

      isLoadingFun(false)
      if (ajaxLoading) {
        queCount--
        if (!queCount) {
          this.ajaxCreateLoading(false)
        }
      }
    }
  },

  /* ajax失败的消息（发送的信息有误）,默认失败事件（ajaxError）fun=>fun
   *
   * */
  ajaxError (res,ajaxLoading,isLoadingFun) {
    if (!isLoadingFun) {
      isLoadingFun = function () {
      }
    }
    return (error) => {
      if (error.response) {
        isLoadingFun(false)
        if (ajaxLoading) {
          queCount--
          if (!queCount) {
            this.ajaxCreateLoading(false)
          }
        }
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        util.handleAjaxError(this,error.response.status + '')

      } else if (error.request) {
        isLoadingFun(false)
        if (ajaxLoading) {
          queCount--
          if (!queCount) {
            this.ajaxCreateLoading(false)
          }
        }
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // this.errorMess(error.request);
      } else {
        isLoadingFun(false)
        if (ajaxLoading) {
          queCount--
          if (!queCount) {
            this.ajaxCreateLoading(false)
          }
        }
        // Something happened in setting up the request that triggered an Error
        // this.errorMess(error.message);
      }
      // this.errorMess(error.config);

      /* if (response instanceof Error) {
        isLoadingFun(false)
        queCount--;
        console.log("----",response.data);
        if(!queCount){
          this.ajaxCreateLoading(false);
        }
        this.errorMess(response.message+"6666");
      } else {
        isLoadingFun(false)
        queCount--;
        if(!queCount){
          this.ajaxCreateLoading(false);
        }
        this.errorMess(response.status + "错误7777!");
      }*/
    }
  },

  /* 核心ajax处理事件 (fun,fun)=>obj
   * @params params obj    自定义数据包含一些自定义信息 如{paramsData:'listUrl',ajaxSuccess:'updateListData',ajaxParams:{url:'/role/list?name=&identify=&type=',}}
   *  @param isLoadingFun  function  如果是 自定义按钮组件 点击提交事件 则会传回操作按钮是否显示loading函数（true取消loading）
   * */
  ajax (params,isLoadingFun) {
    params = this.getParams(params)
    if (params.ajaxLoading) {
      if (queCount === 0) {
        this.ajaxCreateLoading(true)
      }
      queCount++
    }
    let {ajaxParams,messTitle,ajaxError,ajaxLoading} = params
    let that = this
    let myPromise = that.Promise(ajaxParams)
      .then(that.conductSuccess(messTitle,ajaxLoading,isLoadingFun))
      .catch(ajaxError({},ajaxLoading,isLoadingFun))
    return myPromise
  },

  // 处理将要发送的ajax数据和可变数据
  getParams (messTitle) {
    return {
      allowError: messTitle.allowError !== undefined
        ? messTitle.allowError
        : false, // 是否允许错误（调用页面处理）（默认不允许）
      ajaxLoading: messTitle.ajaxLoading !== undefined
        ? messTitle.ajaxLoading
        : true, // 是否显示ajax加载动画
      ajaxParams: messTitle.ajaxParams,
      messTitle: messTitle,
      ajaxError: messTitle.ajaxError && this[messTitle.ajaxError] ||
        this.ajaxError || (() => {
      }),
      ajaxCall: messTitle.ajaxCall !== undefined ? messTitle.ajaxCall : false // 拦截ajax的请求后的回调进行自己处理
    }
  },

  // 为ajax异步请求加载添加loading
  ajaxCreateLoading (flag) {
    this.$store.dispatch('onLoading',flag)
    if (flag) {
      this.$Loading.start()
    } else {
      this.$Loading.finish()
    }
  }
}
