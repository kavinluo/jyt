// 访问前缀
let thisFile = '/cms/cmsContent/'
let api = {
  listPage: {
    path: thisFile + 'listPage',
    method: 'get'
  },
  weightPut: {
    path: thisFile + 'weight/',
    method: 'put'
  },
  remove: {
    path: thisFile + 'remove/',
    method: 'delete'
  },
  auditPut: {
    path: thisFile + 'audit/',
    method: 'put'
  },
  getList: {
    path: thisFile + 'get/',
    method: 'get'
  }
}

export default api
