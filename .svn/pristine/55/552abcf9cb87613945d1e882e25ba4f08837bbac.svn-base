const user = { // 用户
  path: 'user',
  name: 'user',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/yonghu/user/user_list'))
    },'user')
  }
}
const yonghuguanli = { // 注册用户
  path: 'yonghuguanli',
  name: 'yonghuguanli',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/yonghu/yonghuguanli/yonghuguanli_list'))
    },'yonghuguanli')
  }
}
const jigouyonghu = { // 机构用户
  path: 'jigouyonghu',
  name: 'jigouyonghu',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/yonghu/jigouyonghu/jigouyonghu_list'))
    },'jigouyonghu')
  }
}
const jueseguanli = { // 角色管理
  path: 'jueseguanli',
  name: 'jueseguanli',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/yonghu/jueseguanli/jueseguanli_list'))
    },'jueseguanli')
  }
}
export {
  user,
  yonghuguanli,
  jigouyonghu,
  jueseguanli
}

