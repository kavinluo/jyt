import axios from 'axios'
import config from '../config/config'
import { iview } from 'iview'

const ajaxconfig = config.ajaxconfig;
let util = {};

//添加一个请求拦截器
const myInterceptor  = axios.interceptors.request.use(function(config){
  //在请求发送之前做一些事
  return config;
},function(error){
  //当出现请求错误是做一些事
  return Promise.reject(error);
});


//设置UI组件
util.iview = iview;

//设置默认分页参数
util.pageInitPrams = config.pageInitPrams;

//请求列表数据
util.getList = function(url,param,config) {
  ajaxconfig.params = param;
  let myConfig = config || {};
  config = Object.assign(ajaxconfig, config);
  return axios.get(url,config);
}
util.queryData = function(options){
  //设置请求参数
  let params = options.params;
  let url = options.url;

  //获取服务端数据
  let response = util.getList(url, params);

  return response;
}
//转换数据格式   应用场景:当后台数据格式发生变化时可
util.foramteData =  function(options) {
  let type = options.type || "list";
  let data = options.data;
  switch (type){
    case "list":
      break;
    case "user":
      break;
    case "leftmenus":
      break;
    default:

  }
  return data;
}
//ajax请求的错误信息处理
util.handleAjaxError = function(status){
  switch (status){
    case 100:
      alert("请求中")
      break;
    case 404:
      alert("未找到页面")
      break;
    case 500:
      alert("服务器异常")
      break;
    default:
      //status 200
      alert("请求成功")
      break;
  }
}

/* _axios 请求方式
 _axios.request(config)

 _axios.get(url[, config])

 _axios.delete(url[, config])

 _axios.head(url[, config])

 _axios.post(url[, data[, config]])

 _axios.put(url[, data[, config]])

 _axios.patch(url[, data[, config]])
 */

export default {
  install(Vue){
    Vue.prototype.$util = util;
  }
};
