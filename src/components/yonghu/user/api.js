// 访问前缀
let thisFile = '/passport'
let api = {
  listPage: {
    path: thisFile + '/user/page',
    method: 'get'
  },
  deleteList: thisFile + '/user/delete?id=',
  add: {
    path: thisFile + '/user/create',
    method: 'post'
  },
  configVip: {
    path: thisFile + '/passport/vip/configVipStatus',
    method: 'post'
  },
  cancelVip: {
    path: thisFile + '/passport/vip/cancelVipStatus',
    method: 'post'
  },
  importOpenTree: {
    path:  '/knowledge/knowledgeTree/importOpenTree',
    method: 'post'
  },
  listTree: {
    path:  '/knowledge/knowledgeTree/listTree',
    method: 'get'
  }
}

export default api
