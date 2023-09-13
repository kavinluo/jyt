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
  // modifyExamTree: {
  //   path: thisFile + '/examTree/modify/',
  //   method: 'put'
  // },
  // addTree: {
  //   path: thisFile + '/examTree/add',
  //   method: 'post'
  // },
  listPage: {
    path: thisFile + '/examPaperInfoArrange/listPage',
    method: 'get'
  },
  release: {
    path: thisFile + '/examPaperInfoArrange/release/',
    method: 'put'
  }
}

export default api
