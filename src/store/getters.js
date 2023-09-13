export default {
  isCollapse: state => state.app.isCollapse,
  layout: state => state.app.layout,
  tagsList: state => state.tagsView.tagsList,
  userInfo:state => state.loginFun.userInfo
/*  routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  isAddRouters: state => state.permission.isAddRouters
  */
}
