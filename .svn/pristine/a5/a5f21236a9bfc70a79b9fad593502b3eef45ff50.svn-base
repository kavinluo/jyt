
const zixun = { // 咨询
  path: 'zixun',
  name: 'zixun',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/appshouye/zixun/zixun_list'))
    },'zixun')
  }
}

export {
  zixun
}
