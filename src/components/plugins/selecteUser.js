/**
 * 选择用户弹窗搜索处理相关函数
 */

/**
 * 根据props获取ajax基础配置
 * @param propsUrlObj
 */
function getConfigByProps (propsUrlObj) {
  let ajaxParams = {
    url: '/passport/pc/user/search/list', // 获取用户列表List(只查询账户状态为启用的账户)
    method: 'get'
  }
  if (propsUrlObj && propsUrlObj instanceof Object) {
    // eslint-disable-next-line no-return-assign
    Object.keys(propsUrlObj).map(key => ajaxParams[key] = propsUrlObj[key])
  }
  return ajaxParams
}

/**
 * 根据输入值智能判断属于那种类型
 * @param val
 * @returns {{name: string, mobile: string, email: string}}
 */
function getSearchParamsVal (val) {
  let params = {
    name: '', // 	按照姓名模糊查询
    mobile: '', // 手机号
    email: '' // 邮箱
  }
  if (!isNaN(val)) {
    params.mobile = val
  } else if (/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val)) {
    params.email = val
  } else {
    params.name = val
  }
  return params
}

export {
  getConfigByProps,getSearchParamsVal
}
