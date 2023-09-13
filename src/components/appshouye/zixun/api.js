// 访问前缀
let thisFile = '/cms'
let api = {
  listAll: {
    path: thisFile + '/cmsCategory/listAll',
    method: 'get'
  },
  getByLink: {
    path: thisFile + '/cms/cmsContent/getByLinkCategoryId/',
    method: 'get'
  }
}

export default api
