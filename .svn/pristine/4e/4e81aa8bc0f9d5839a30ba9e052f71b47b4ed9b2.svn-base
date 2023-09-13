import { iview } from 'iview'
import _ from 'lodash'
import { _axios } from './_axios'
import config from '../config/config'
import browserCache from './browserCache'
import funs from './funs'

const util = {}

// 添加一个请求拦截器
// const myInterceptor = axios.interceptors.request.use(function (config) {
//   //在请求发送之前做一些事
//   return config;
// }, function (error) {
//   //当出现请求错误是做一些事
//   return Promise.reject(error);
// });

// 设置UI组件
util.iview = iview

// 设置默认分页参数
util.pageInitPrams = config.pageInitPrams

util._ = _
// 添加监听事件
util.events = {
  addHandler: function (oElement,sEvent,fnHandler) {
    oElement.addEventListener ? oElement.addEventListener(sEvent,fnHandler,false) : oElement.attachEvent('on' + sEvent,fnHandler)
  },
  removeHandler: function (oElement,sEvent,fnHandler) {
    oElement.removeEventListener ? oElement.removeEventListener(sEvent,fnHandler,false) : oElement.detachEvent('on' + sEvent,fnHandler)
  }
}

export let utils = Object.assign(util,{..._axios,...browserCache,...funs})
