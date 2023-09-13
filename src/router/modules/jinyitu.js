const shujushouye = { // 试题库
  path: 'shujushouye',
  name: 'shujushouye',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/jinyitu/shujushouye/shujushouye_list'))
    },'shujushouye')
  }
}
const menu = { // 试题库
  path: 'menu',
  name: 'menu',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/jinyitu/menu/menu_list'))
    },'menu')
  }
}
const huodong = { // 活动
  path: 'huodong',
  name: 'huodong',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/jinyitu/huodong/management'))
    },'huodong')
  }
}
const xingyundazhuanpan = { // 咨询
  path: 'xingyundazhuanpan',
  name: 'xingyundazhuanpan',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/jinyitu/xingyundazhuanpan/turntable'))
    },'xingyundazhuanpan')
  }
}

const luckyDraw = { // 咨询
  path: 'luckyDraw',
  name: 'luckyDraw',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/jinyitu/xingyundazhuanpan/luckyDraw'))
    },'luckyDraw')
  }
}
const aboutus = { // 咨询
  path: 'aboutus',
  name: 'aboutus',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/jinyitu/aboutus/aboutus_list'))
    },'aboutus')
  }
}
const appversionmanage = { // app版本管理
  path: 'appversionmanage',
  name: 'appversionmanage',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/jinyitu/appversionmanage/appversionmanage_list'))
    },'appversionmanage')
  }
}
const yindaotu = { // 咨询
  path: 'yindaotu',
  name: 'yindaotu',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/jinyitu/yindaotu/yindaotu_list'))
    },'yindaotu')
  }
}
const banner = { // 咨询
  path: 'banner',
  name: 'banner',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/jinyitu/banner/banner_list'))
    },'banner')
  }
}
export {
  shujushouye,
  menu,
  huodong,
  xingyundazhuanpan,
  luckyDraw,
  aboutus,
  appversionmanage,
  yindaotu,
  banner
}
