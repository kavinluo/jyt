// 路由导航守卫
import { utils } from './libs/util'
import router from './router'
// import { Message } from 'element-ui'
import store from './store'
import iView from 'iview'
// 全局路由前置守卫
router.beforeEach((to,from,next) => {
  utils.setAjaxPostToken()
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (to.fullPath === '/login') {
      next()
    } else if (utils.getCookie('Token')) { // 通过vuex state获取当前的token是否存在
      next({
        path: from.query.redirect || to.query.redirect
      })
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    store.dispatch('onLoading',true)
    iView.LoadingBar.start()
    next()
  }
})
// 这里为了让效果明显一些加了延时
router.afterEach((to,from) => {
  store.dispatch('onLoading',false)
  iView.LoadingBar.finish()
})
