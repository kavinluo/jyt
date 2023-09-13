// 访问前缀
let thisFile = '/passport'
let api = {
  listPage: {
    path: thisFile + '/tenant/page',
    method: 'get'
  },
  remove: thisFile + '/tenant/delete?id=',
  addList: {
    path: thisFile + '/tenant/create'
  },
  getList: {
    path: thisFile + '/tenant/get?id=',
    method: 'get'
  },
  updateList: {
    path: thisFile + '/tenant/update',
    method: 'put'
  }
}

export default api
