const changguizhishiku = { // 用户
  path: 'changguizhishiku',
  name: 'changguizhishiku',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/zhishiku/changguizhishiku/changguizhishiku_list'))
    },'changguizhishiku')
  }
}
const yingyongguanli = { // 注册用户
  path: 'yingyongguanli',
  name: 'yingyongguanli',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve=> {
    require.ensure([],() => {
      resolve(require('_c/zhishiku/yingyongguanli/yingyongguanli_list'))
    },'yingyongguanli')
  }
}
const zhishikuxitongweihu = { // 注册用户
  path: 'zhishikuxitongweihu',
  name: 'zhishikuxitongweihu',
  meta: {
    requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
  },
  children: [{
    path: 'templateBank',
    name: 'templateBank',
    meta: {requireAuth: false},
    // 也不使用懒加载，先在文件头部提前引入
    component: ()=> import ('_c/knowledgeManger/templateBank/templateBankList')
  },{
    path: 'keyWords',
    name: 'keyWords',
    meta: {requireAuth: false},
    // 也不使用懒加载，先在文件头部提前引入
    component: ()=> import('_c/knowledgeManger/templateBank/templateBankList')
  }]
}
export {
  changguizhishiku,
  yingyongguanli,
  zhishikuxitongweihu
}

