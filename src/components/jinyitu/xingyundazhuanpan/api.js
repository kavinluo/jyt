// 访问前缀
let thisFile = '/passport/admin/luckyWheel/'
let api = {
  listPage: {
    path: thisFile + 'listPage',
    method: 'get'
  },
  listEveryDayPage: {
    path: thisFile + 'listEveryDayPage',
    method: 'get'
  },
  getConfig: {
    path: thisFile + 'getConfig',
    method: 'get'
  },
  setLucky: {
    path: thisFile + 'setLuckyWheelConfig',
    method: 'put'
  },
  modifyRemark: {
    path: thisFile + 'modifyRemark',
    method: 'put'
  },
  modifyLottery: {
    path: thisFile + 'modifyLottery',
    method: 'put'
  }
}

export default api
