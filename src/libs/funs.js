import browerCache from './browserCache'
import _ from 'lodash'

export default {
// 转换数据格式   应用场景:当后台数据格式发生变化时可
  foramteData (options) {
    let type = options.type || 'list'
    let data = options.data
    switch (type) {
    case 'list':
      break
    case 'user':
      break
    case 'leftmenus':
      break
    default:

    }
    return data
  },

  // 跳转登录页面
  gotoLoginPage (router) {
    // location.href= location.hostname+"/index";
  },

  // 反格式化日期
  deformatterDate (d) {
    return new Date(d).getTime() - 1000 * 60 * 60 * 24
  },

  // 检测元素是否存在该事件
  detectEventSupport (eventName) {
    var tempElement = document.createElement('div')
    var isSupported
    eventName = 'on' + eventName
    isSupported = (eventName in tempElement) // 使用第一种方式
    // 如果第一种方式行不通，那就来看看它是不是已知事件类型
    if (!isSupported) {
      tempElement.setAttribute(eventName,'xxx')
      isSupported = typeof tempElement[eventName] === 'function'
    }
    // 清除掉动态创建的元素，以便内存回收
    tempElement = null
    // 返回检测结果
    return isSupported
  },

  // 判断object 是否为空
  isEmptyObject (e) {
    // var t;
    for (const t in e) {return !1}
    return !0
  },

  // 验证是否登录
  isLogin (ckObj) {
    return browerCache.getCookie('Token')
  },
  // goTo = '/login',
  loginOut ($vue,goTo = '/',post = '/passport/auth/logout') {
    let gotos = '/'
    if ($vue.$cookie.get('Token') == null) {
      // $vue.$router.push(goTo);
      location.href = gotos
      return
    }
    $vue.$cookie.delete('Token')

    let loginOutTitle = {
      ajaxSuccess: (res) => {
        $vue.successMess('退出成功!')
        $vue.$store.commit('setToken')
        // $vue.$router.push(goTo);
        location.href = gotos
      },
      ajaxParams: {
        url: post,
        method: 'post'
      }
    }

    $vue.ajax(loginOutTitle)
  },

  /**
   * [getFormData 处理提交数据 对象合并]
   * @param  {...Object} objs [需合并的对象，（单个或多个对象）]
   * @return {Object}         [去重合并之后的对象]
   */
  getFormData (...objs) {
    return _.defaultsDeep({},...objs)
  }

}
