
const trainMgt = {
  path: 'trainMgt',
  name: 'trainMgt',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/train-mgt/class/index.vue'))
    },'trainMgt')
  }
}

const bannerMgt = {
  path: 'bannerMgt',
  name: 'bannerMgt',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/train-mgt/banner/index.vue'))
    },'bannerMgt')
  }
}
// courseMgt
const commentMgt = {
  path: 'commentMgt',
  name: 'commentMgt',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/train-mgt/comment/index.vue'))
    },'commentMgt')
  }
}
const trainConfig = {
  path: 'trainConfig',
  name: 'trainConfig',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/train-mgt/config/index.vue'))
    },'trainConfig')
  }
}
export {
  trainMgt,
  bannerMgt,
  commentMgt,
  trainConfig
}

