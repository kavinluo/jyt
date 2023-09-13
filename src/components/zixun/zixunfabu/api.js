// 访问前缀
let thisFile = '/cms'
let api = {
  listPage: {
    path: thisFile + '/cmsContent/listPage',
    method: 'get'
  },
  modify: {
    path: thisFile + '/cmsContent/modify/',
    method: 'put'
  },
  addList: {
    path: thisFile + '/cmsContent/add',
    method: 'post'
  },
  getList: {
    path: thisFile + '/app/cmsContent/get/',
    method: 'get'
  },
  releaseList: {
    path: thisFile + '/cmsContent/publish/',
    method: 'put'
  },
  unReleaseList: {
    path: thisFile + '/cmsContent/unPublish/',
    method: 'put'
  },
  removeList: {
    path: thisFile + '/cmsContent/remove/',
    method: 'delete'
  },
  likesPage: {
    path: thisFile + '/admin/cmsContentLikes/listPage',
    method: 'get'
  }
}

export default api
