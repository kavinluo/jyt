import axios from 'axios'
import config from '../../config/config'
import _ from 'lodash'
import browerCache from '../browserCache'

const sm3 = require('sm-crypto').sm3
const sm4 = require('sm-crypto').sm4
const {ajaxconfig} = config
const key = 'b86f561d86e0fad896e0028c1b7d64eb' // sm4加密key

let instance = axios.create(ajaxconfig)
const util = {}
const kAppKey = 'AmBuf_product_zykh' // url签名 固定死的

// 请求前改变请求头源参数
util.setAjaxQuestHeader = function (key,v,config) {
  const isFormData = config
  ajaxconfig.headers[key] = v
  if (!isFormData) {
    instance = axios.create(ajaxconfig)
  } else { // 添加formData类型请求headers
    const {headers: {Token},baseURL,timeout} = ajaxconfig
    const options = Object.assign({},config,{
      timeout,
      baseURL,
      headers: {'Token': Token}
    })
    instance = axios.create(options)
  }
  return
}

function formatParam (paramsStr) {
  let newStr = ''
  if (paramsStr.length > 0 && paramsStr.substring(0,1) !== '&') {
    paramsStr = '&' + paramsStr
  }
  let splitStr = paramsStr.split('&')
  for (let i = 0; i < splitStr.length; i++) {
    let t = splitStr[i].split('=')
    if ((t.length > 1 && t[1] !== '') || t[1] === null) {
      newStr += '&' + t[0] + '=' + t[1]
    }
  }
  if (newStr.length > 1) {
    newStr = newStr.substring(1)
  }
  return newStr
}

function paramsStrSort (paramsStr,urls) {
  let token = browerCache.getCookie('Token')
  if (!token) {
    token = ''
  }
  if (urls.indexOf('?') > -1) {
    urls = urls.substring(0,urls.indexOf('?'))
  }
  paramsStr = formatParam(paramsStr)
  let url = paramsStr + '&token=' + token
  let orderParamsStr = url.split('&').sort().join('&')
  let newUrl = '/api' + (urls.substr(0,1) === '/' ? '' : '/') + urls +
    orderParamsStr + '&appKey=' + kAppKey
  console.log(newUrl)
  return sm3(newUrl).toString()
  // return newUrl.toString()
}

// 验证token是否合法
function isLegalToken (resonse) {
  let flag = false
  if (ajaxconfig.headers.Token !== '') {
    flag = true
  }
  return flag
}

function setParams (options) {
  let obj = {}
  let paramsStrss = options.url.split('?')[1]
  paramsStrss.split('&').forEach(function (v,k) {
    let key = v.split('=')[0] || k
    let val = v.split('=')[1] || undefined
    obj[key] = val
  })
  return obj
}

// JSON序列化传入参数形式
util.serializeParams = function (params,type) {
  if (!params) {return}
  let obj = {}
  if (type === 'JSON') {
    if (!_.isString(params)) {return}
    if (params.indexOf('&') > -1) {
      let splits = params.split('&')
      splits.forEach(function (v,k) {
        let key = v.split('=')[0] || k
        let val = v.split('=')[1] || undefined
        obj[key] = val
      })
      return obj
    }
  } else {
    if (!_.isObject(params)) {
      if (!_.isObject(JSON.parse(params))) {
        return
      } else {
        params = JSON.parse(params)
      }
    }
    obj = []
    _.forEach(params,function (v,k) {
      v = !v && v !== null ? '' : v // 值为null需要参与签名
      let val = k + '=' + v
      obj.push(val)
    })
    return obj.join('&')
  }
}

// 登录后存储cookie: token
util.setAjaxPostToken = function ($vue) {
  let token = ''
  if (browerCache.getCookie('Token')) {
    token = browerCache.getCookie('Token')
  }
  util.setAjaxQuestHeader('Token',token)
  instance = axios.create(ajaxconfig)
}

// eslint-disable-next-line complexity
util.queryData = function (options,fun) {
  util.setAjaxQuestHeader('sign','')
  // 必须基本设置请求参数
  let url = options.url || ''

  // 进行url签名
  let evn = {}
  if (browerCache.getCookie('evn')) {
    // eslint-disable-next-line no-unused-vars
    evn = JSON.parse(browerCache.getCookie('evn'))
  }
  let isSecurity = false //   是否需要开启url签名
  let ServerLongTime = browerCache.getCookie('ServerLongTime')
  ServerLongTime = !ServerLongTime ? 0 : ServerLongTime
  var timeStamp = new Date().getTime() - ServerLongTime // 时间戳
  var sign = ''
  const method = options.method || ajaxconfig.method // "get" "post"  "put" ，默认请求get

  const isParseStringJSON = options.jsonString
  let isFormData = options.isFormData // 添加dormData参数类型
  // 扩展基本配置项
  const myConfig = options.baseConfing || {} // {}

  const config = _.defaultsDeep({},myConfig)
  config.method = method
  // 获取服务端数据
  if (method === 'post' || method === 'put' || method === 'patch') {

    // POST提交数据时必选参数
    let potsData = options.data || {} // {firstName: 'Fred',lastName: 'FlintStone'}
    if (url.indexOf('?') > -1) { // 证明url上面拼接的有参数
      url = url.substring(0,url.indexOf('?'))
      let paramsObj = setParams(options)
      potsData = Object.assign(potsData,paramsObj)
    }
    if (_.isObject(potsData)) {
      if (typeof isParseStringJSON !== 'undefined') {
        util.setAjaxQuestHeader('Content-Type','application/json')
        if (isSecurity) {
          let signJsonStr = '&timeStamp=' + timeStamp
          console.log(signJsonStr)
          sign = paramsStrSort(signJsonStr,url)
        }
        if(isSecurity) {
          potsData = JSON.stringify(
            {data: sm4.encrypt(JSON.stringify(potsData),key)})
        }else {
          potsData = JSON.stringify(potsData)
        }

      } else if (typeof isFormData !== 'undefined') {
        util.setAjaxQuestHeader('Content-Type','multipart/form-data',{})
        const formData = new FormData()
        options.data.map((item,index) => {
          formData.append('file',item)
        })
        potsData = formData
      } else {
        util.setAjaxQuestHeader('Content-Type','application/x-www-form-urlencoded')
        if (isSecurity) {
          let potsData = util.serializeParams(
            _.defaultsDeep({},options.data || {}))
          potsData = potsData + '&timeStamp=' + timeStamp
          console.log(potsData,url)
          sign = paramsStrSort(potsData,url)
        }
        if(isSecurity) {
          potsData = sm4.encrypt(JSON.stringify(potsData),key)
        }else {
          potsData = util.serializeParams(potsData)
        }
      }
    }
    util.setAjaxQuestHeader('timeStamp',timeStamp)
    if (sign) {
      util.setAjaxQuestHeader('sign',sign)
      util.setAjaxQuestHeader('cryptoRequestResponseVersion','1.0')
    }
    if (typeof isParseStringJSON !== 'undefined' || !isSecurity) {
      return instance[method].bind(instance,url,potsData,config)
    } else {
      let encryptionurl = url + '?data=' + potsData
      return instance[method].bind(instance,encryptionurl,'',config)
    }
  } else {
    // get请求方式下  设置formData类型请求头
    if (typeof isParseStringJSON === 'undefined' && typeof isFormData === 'undefined') {
      util.setAjaxQuestHeader('Content-Type','application/x-www-form-urlencoded')
    }
    // GET提交数据时必选参数
    let myParams = options.params || {} // {params: {ID: 12345}} || '/user?ID=12345'
    if(isSecurity) {
      if (url.indexOf('?') > -1) { // 证明url上面拼接的有参数
        url = url.substring(0,url.indexOf('?'))
        let paramsObj = setParams(options)
        myParams = Object.assign(myParams,paramsObj)
      }
      let potsParams = sm4.encrypt(JSON.stringify(myParams),key)
      config.params = {data: potsParams}
    }else {
      myParams = Object.assign({},myParams,{mathRand: Math.random() * 100000000000000000})
      config.params = myParams
    }
    if (isSecurity) {
      let paramsStrs = util.serializeParams(myParams) + '&timeStamp=' + timeStamp

      sign = paramsStrSort(paramsStrs,url) // url签名
      util.setAjaxQuestHeader('sign',sign)
      util.setAjaxQuestHeader('timeStamp',timeStamp)
      util.setAjaxQuestHeader('cryptoRequestResponseVersion','1.0')
    }
    return instance[method].bind(instance,url,config)
  }

}
// ajax请求的错误信息处理
// eslint-disable-next-line complexity
util.handleAjaxError = function ($vue,status,mess) {
  let flag = false
  switch (status) {
  case 1:
    flag = true
    $vue.errorMess(mess + '!')
    break
  case 2:
    flag = true
    $vue.errorMess(mess + '!')
    break
  case 17:
    flag = true
    $vue.errorMess(mess + '!')
    break
  case 19:
    flag = true
    $vue.errorMess(mess + '!')
    break
  case 1002000000:
    flag = true
    $vue.errorMess(mess + '!')
    break
  case -1: //  证明系统未授权  或授权到期
    flag = true
    // 系统未授权  返回到登录页  重新注册
    sessionStorage.setItem('unauthorized',JSON.stringify(true))
    $vue.$router.push('/login')
    break
  case 4:
    // token验证失败
    flag = true
    if (isLegalToken()) {
      $vue.errorMess('登录超时!')
    } else {
      $vue.errorMess('非法登录!')
    }
    $vue.$cookie.delete('Token')
    $vue.$store.commit('setIndexUrl','')
    $vue.$router.push('/login')
    break
  case 404:
    flag = true
    $vue.errorMess('未找到页面')
    break
  case 401:
    flag = true
    $vue.errorMess(mess + '!')
    $vue.$cookie.delete('Token')
    $vue.$store.commit('setIndexUrl','')
    $vue.$router.push('/login')
    break
  case 500:
    flag = true
    $vue.errorMess('服务器异常')
    break
  case 504:
    flag = true
    $vue.errorMess('服务器网络异常(网关超时）!')
    break
  case 11006:
    flag = false
    $vue.errorMess(mess + '!')
    break
  case -10002:
    flag = false
    $vue.errorMess(mess + '!')
    // 签名不合法，退出登录
    $vue.$cookie.delete('Token')
    $vue.$store.commit('setIndexUrl','')
    $vue.$router.push('/login')
    break
  default:
    if (mess !== '') {
      flag = true
      $vue.errorMess(mess + '!')
    }
  }
  return flag
}

export let _axios = util
