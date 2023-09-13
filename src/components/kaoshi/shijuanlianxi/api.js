// 访问前缀
let thisFile = '/paper'
let api = {
  addList: {
    path: thisFile + '/examPaperInfoArrange/add',
    method: 'post'
  },
  modifyExamList: {
    path: thisFile + '/examPaperInfoArrange/modify/',
    method: 'put'
  },
  removeList: thisFile + '/examPaperInfoArrange/remove/',
  getList: {
    path: thisFile + '/examPaperInfoArrange/get/',
    method: 'get'
  },
  listPage: {
    path: thisFile + '/examPaperInfoArrange/listPage',
    method: 'get'
  },
  releaseList: {
    path: thisFile + '/examPaperInfoArrange/release/',
    method: 'put'
  }
}

export default api
