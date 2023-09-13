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
  deptList: {
    path: thisFile + '/dept/list',
    method: 'get'
  },
  configVip: {
    path: thisFile + '/vip/configVipStatus',
    method: 'post'
  },
  cancelVip: {
    path: thisFile + '/vip/cancelVipStatus',
    method: 'post'
  },
  getMobile: {
    path: thisFile + '/user/getByMobile',
    method: 'get'
  }
}

export default api
