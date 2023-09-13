const springBootAdmin = { // Java监控
  path: 'springbootadmin',
  name: 'springbootadmin',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/sheshi/springbootadmin/springBootAdmin_list'))
    },'springbootadmin')
  }
}
const config = { // 配置管理
  path: 'config',
  name: 'config',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/sheshi/config/config_list'))
    },'config')
  }
}
const druid = { // MySQL监控
  path: 'druid',
  name: 'druid',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/sheshi/druid/druid_list'))
    },'druid')
  }
}
const job = { // 定时任务
  path: 'job',
  name: 'job',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/sheshi/job/job_list'))
    },'job')
  }
}
const redis = { // Redis监控
  path: 'redis',
  name: 'redis',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/sheshi/redis/redis_list'))
    },'redis')
  }
}
const loginLog = { // Redis监控
  path: 'login-log',
  name: 'login-log',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/sheshi/login-log/loginLog_list'))
    },'login-log')
  }
}
const skywalking = { // Redis监控
  path: 'skywalking',
  name: 'skywalking',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/sheshi/skywalking/skywalking_list'))
    },'skywalking')
  }
}
export {
  springBootAdmin,
  job,
  config,
  druid,
  redis,
  loginLog,
  skywalking
}
